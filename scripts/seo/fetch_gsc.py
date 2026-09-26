"""Fetch Google Search Console data for the weekly SEO job.

Env:
  GSC_SERVICE_ACCOUNT_JSON  full JSON key of a Google service account (added as a user in Search Console)
  GSC_SITE_URL              property, e.g. "sc-domain:example.com" or "https://www.example.com/"
  REPORT_DATE               YYYY-MM-DD (optional)
Writes seo-reports/data/<date>.json and seo-reports/data/latest.json
"""
import datetime as dt
import json
import os
import sys
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
DATA_DELAY_DAYS = 3  # Search Console data is complete after ~2-3 days
WINDOW = 28


def query(svc, site, start, end, dims, limit=1000):
    body = {"startDate": start.isoformat(), "endDate": end.isoformat(), "rowLimit": limit, "type": "web"}
    if dims:
        body["dimensions"] = dims
    rows = svc.searchanalytics().query(siteUrl=site, body=body).execute().get("rows", [])
    out = []
    for r in rows:
        item = {d: k for d, k in zip(dims, r.get("keys", []))}
        item.update(clicks=r["clicks"], impressions=r["impressions"],
                    ctr=round(r["ctr"], 4), position=round(r["position"], 2))
        out.append(item)
    return out


def period(svc, site, start, end, with_daily=False):
    totals = query(svc, site, start, end, [], 1)
    data = {
        "start": start.isoformat(),
        "end": end.isoformat(),
        "totals": totals[0] if totals else {"clicks": 0, "impressions": 0, "ctr": 0, "position": None},
        "queries": query(svc, site, start, end, ["query"], 500),
        "pages": query(svc, site, start, end, ["page"], 200),
        "query_page": query(svc, site, start, end, ["query", "page"], 1000),
        "devices": query(svc, site, start, end, ["device"], 10),
    }
    if with_daily:
        data["daily"] = query(svc, site, start, end, ["date"], 100)
    return data


def main():
    raw = os.environ.get("GSC_SERVICE_ACCOUNT_JSON")
    site = os.environ.get("GSC_SITE_URL")
    if not raw or not site:
        sys.exit("Missing GSC_SERVICE_ACCOUNT_JSON secret or GSC_SITE_URL variable.")
    creds = service_account.Credentials.from_service_account_info(json.loads(raw), scopes=SCOPES)
    svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

    end = dt.date.today() - dt.timedelta(days=DATA_DELAY_DAYS)
    cur_start = end - dt.timedelta(days=WINDOW - 1)
    prev_end = cur_start - dt.timedelta(days=1)
    prev_start = prev_end - dt.timedelta(days=WINDOW - 1)

    result = {
        "site": site,
        "generated": dt.datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "note": "Queries with 0 clicks can still matter. Clicks by page may exceed clicks by query because Google hides rare queries.",
        "current": period(svc, site, cur_start, end, with_daily=True),
        "previous": period(svc, site, prev_start, prev_end),
    }

    out_dir = Path("seo-reports/data")
    out_dir.mkdir(parents=True, exist_ok=True)
    date = os.environ.get("REPORT_DATE") or dt.date.today().isoformat()
    for name in (f"{date}.json", "latest.json"):
        (out_dir / name).write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")

    t = result["current"]["totals"]
    print(f"Saved GSC data {cur_start}..{end}: {t.get('clicks')} clicks, {t.get('impressions')} impressions")


if __name__ == "__main__":
    main()
