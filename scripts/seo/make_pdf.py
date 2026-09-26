"""Build the branded, client-friendly SEO report PDF.

Numbers and tables come straight from Search Console data (seo-reports/data/latest.json).
Claude only writes short plain-English insights (seo-reports/insights.json).

Env (optional): REPORT_DATE, SITE_NAME, MODE, STATUS_TEXT,
  AGENCY_NAME (default SparkSkylytics), AGENCY_WEBSITE, AGENCY_PHONE, AGENCY_EMAIL, BRAND_COLOR
Logo: scripts/seo/brand/logo.png
"""
import datetime as dt
import html
import json
import os
from pathlib import Path
from urllib.parse import urlparse

from weasyprint import HTML

E = os.environ.get
HERE = Path(__file__).resolve().parent
BRAND = HERE / "brand"


def find_logo():
    """Accept logo.png / Logo.PNG / logo.jpg / any single image in the brand folder."""
    if not BRAND.exists():
        return None
    imgs = [p for p in BRAND.iterdir() if p.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp", ".svg")]
    named = [p for p in imgs if p.stem.lower().startswith("logo")]
    return (named or imgs or [None])[0]


LOGO = find_logo()
esc = html.escape


def cfg():
    return {
        "date": E("REPORT_DATE") or dt.date.today().isoformat(),
        "site": E("SITE_NAME") or E("GITHUB_REPOSITORY", "Website"),
        "agency": E("AGENCY_NAME") or "SparkSkylytics",
        "color": E("BRAND_COLOR") or "#1F4E79",
        "mode": E("MODE", "report"),
        "status": E("STATUS_TEXT", ""),
        "contact": " · ".join(x for x in (E("AGENCY_WEBSITE"), E("AGENCY_PHONE"), E("AGENCY_EMAIL")) if x),
    }


# ---------- helpers ----------
def nice_date(s):
    try:
        return dt.date.fromisoformat(s).strftime("%d %b %Y")
    except Exception:
        return s


def page_name(url):
    path = urlparse(url).path.strip("/")
    if not path:
        return "Home page"
    last = path.split("/")[-1].replace("-", " ")
    prefix = "Doctor: " if path.startswith("doctors/") else ""
    return prefix + last[:1].upper() + last[1:]


def badge(pos):
    if pos is None:
        return ""
    if pos <= 3:
        return '<span class="b b-top">Top 3</span>'
    if pos <= 10:
        return '<span class="b b-p1">Page 1</span>'
    if pos <= 20:
        return '<span class="b b-p2">Page 2</span>'
    return '<span class="b b-p3">Page 3+</span>'


def change_pos(cur, prev):
    """Position change: lower is better."""
    if prev is None:
        return '<span class="new">new</span>'
    d = prev - cur
    if abs(d) < 0.5:
        return '<span class="flat">same</span>'
    return f'<span class="up">▲ {d:.1f}</span>' if d > 0 else f'<span class="down">▼ {abs(d):.1f}</span>'


def change_num(cur, prev, pct=False, lower_better=False):
    if not prev:
        return '<span class="new">new baseline</span>'
    d = cur - prev
    if abs(d) < (0.05 if pct else 0.5 if lower_better else 1):
        return '<span class="flat">no change</span>'
    good = (d < 0) if lower_better else (d > 0)
    cls = "up" if good else "down"
    arrow = "▲" if d > 0 else "▼"
    if lower_better:
        txt = f"{arrow} {abs(d):.1f}"
    elif pct:
        txt = f"{arrow} {abs(d):.1f} pts"
    else:
        rel = f" ({abs(d) / prev * 100:.0f}%)" if prev else ""
        txt = f"{arrow} {abs(d):,.0f}{rel}"
    return f'<span class="{cls}">{txt}</span>'


def li(items):
    items = [i for i in (items or []) if str(i).strip()]
    return "<ul>" + "".join(f"<li>{esc(str(i))}</li>" for i in items) + "</ul>" if items else "<p class='muted'>Nothing this time.</p>"


def daily_chart(daily, color):
    if not daily:
        return ""
    daily = sorted(daily, key=lambda r: r["date"])
    W, H, pad = 640, 150, 24
    n = len(daily)
    mx = max(r["impressions"] for r in daily) or 1
    bw = (W - pad * 2) / n
    bars, labels = [], []
    for i, r in enumerate(daily):
        h = (r["impressions"] / mx) * (H - 40)
        x = pad + i * bw
        bars.append(f'<rect x="{x + bw * 0.15:.1f}" y="{H - 20 - h:.1f}" width="{bw * 0.7:.1f}" height="{h:.1f}" rx="2" fill="{color}" opacity="0.8"/>')
        if r["clicks"]:
            bars.append(f'<circle cx="{x + bw / 2:.1f}" cy="{H - 26 - h:.1f}" r="3.2" fill="#E8833A"/>')
        if i % max(1, n // 6) == 0:
            d = dt.date.fromisoformat(r["date"]).strftime("%d %b")
            labels.append(f'<text x="{x + bw / 2:.1f}" y="{H - 5}" font-size="9" text-anchor="middle" fill="#888">{d}</text>')
    return (f'<svg viewBox="0 0 {W} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">'
            f'<line x1="{pad}" y1="{H - 20}" x2="{W - pad}" y2="{H - 20}" stroke="#ddd"/>'
            + "".join(bars) + "".join(labels) + "</svg>"
            f'<div class="legend"><span class="sq" style="background:{color}"></span> Impressions per day '
            f'&nbsp;&nbsp;<span class="dot"></span> Day with a click (max {mx} impressions/day)</div>')


def pie(parts, size=150):
    """parts: list of (label, value, color). Donut chart as SVG + legend."""
    import math
    total = sum(v for _, v, _ in parts) or 1
    cx = cy = size / 2
    r, ri = size / 2 - 4, size / 2 - 30
    a0, paths = -math.pi / 2, []
    for label, v, col in parts:
        if v <= 0:
            continue
        a1 = a0 + 2 * math.pi * v / total
        if v == total:
            a1 = a0 + 2 * math.pi - 0.0001
        large = 1 if a1 - a0 > math.pi else 0
        x0, y0, x1, y1 = cx + r * math.cos(a0), cy + r * math.sin(a0), cx + r * math.cos(a1), cy + r * math.sin(a1)
        xi0, yi0, xi1, yi1 = cx + ri * math.cos(a1), cy + ri * math.sin(a1), cx + ri * math.cos(a0), cy + ri * math.sin(a0)
        paths.append(f'<path d="M{x0:.1f},{y0:.1f} A{r},{r} 0 {large} 1 {x1:.1f},{y1:.1f} L{xi0:.1f},{yi0:.1f} '
                     f'A{ri},{ri} 0 {large} 0 {xi1:.1f},{yi1:.1f} Z" fill="{col}"/>')
        a0 = a1
    legend = "".join(f'<div class="lg"><span class="sw" style="background:{col}"></span>{esc(label)} '
                     f'<b>{v}</b> <span class="muted">({v / total * 100:.0f}%)</span></div>' for label, v, col in parts)
    return (f'<div class="pie"><svg viewBox="0 0 {size} {size}" width="{size * 0.75}pt" height="{size * 0.75}pt" '
            f'xmlns="http://www.w3.org/2000/svg">{"".join(paths)}</svg><div class="pl">{legend}</div></div>')


def explain(items):
    items = [i for i in items if i]
    return '<ul class="ex">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>" if items else ""


# ---------- main builder ----------
def build(data, insights, out: Path):
    c = cfg()
    cur, prev = data["current"], data["previous"]
    t, pt = cur["totals"], prev["totals"]
    prev_q = {r["query"]: r for r in prev.get("queries", [])}
    color = c["color"]
    ins = insights or {}
    queries = cur.get("queries", [])

    def card(label, value, chg, hint):
        return (f'<div class="kpi"><div class="kl">{label}</div><div class="kv">{value}</div>'
                f'<div class="kc">{chg}</div><div class="kh">{hint}</div></div>')

    kpis = "".join([
        card("Visits from Google", f"{t['clicks']:,}", change_num(t["clicks"], pt.get("clicks")), "people clicked"),
        card("Shown on Google", f"{t['impressions']:,}", change_num(t["impressions"], pt.get("impressions")), "times"),
        card("Avg. position", f"{t['position']:.1f}" if t.get("position") else "–",
             change_num(t["position"], pt.get("position"), lower_better=True) if t.get("position") else "", "1 = top of Google"),
        card("Search terms", f"{len(queries)}" if queries else "–", "", "different searches" if queries else "not shared by Google yet"),
    ])

    # pie 1: where the site appears
    buckets = [("Top 3", sum(1 for r in queries if r["position"] <= 3), "#1E8E5A"),
               ("Page 1 (4-10)", sum(1 for r in queries if 3 < r["position"] <= 10), color),
               ("Page 2", sum(1 for r in queries if 10 < r["position"] <= 20), "#E0A800"),
               ("Page 3+", sum(1 for r in queries if r["position"] > 20), "#C2413A")]
    # pie 2: devices
    dev = {d.get("device", "").lower(): d.get("impressions", 0) for d in cur.get("devices", [])}
    devices = [("Mobile", dev.get("mobile", 0), color), ("Desktop", dev.get("desktop", 0), "#8FB3D9"),
               ("Tablet", dev.get("tablet", 0), "#C9D6E3")]
    devices = [d for d in devices if d[1] > 0] or [("No data", 1, "#ddd")]

    top_q = sorted(queries, key=lambda r: -r["impressions"])[:10]
    q_rows = "".join(
        f"<tr><td>{esc(r['query'])}</td><td class='n'>{r['impressions']}</td><td class='n'>{r['position']:.1f}</td>"
        f"<td>{badge(r['position'])}</td><td>{change_pos(r['position'], prev_q[r['query']]['position'] if r['query'] in prev_q else None)}</td></tr>"
        for r in top_q)
    pages = sorted(cur.get("pages", []), key=lambda r: -r["impressions"])[:6]
    mxp = max((r["impressions"] for r in pages), default=1) or 1
    page_bars = "".join(
        f'<div class="hb"><div class="hbl">{esc(page_name(r["page"]))}</div>'
        f'<div class="hbt"><div class="hbf" style="width:{r["impressions"] / mxp * 100:.0f}%"></div></div>'
        f'<div class="hbv">{r["impressions"]} <span class="muted">· {r["clicks"]} visits</span></div></div>' for r in pages)

    changes = [x for x in (ins.get("changes_made") or []) if x and x.get("page")]
    if not changes and E("CHANGED_FILES"):
        # fallback: Claude did not describe its changes, list the updated files in plain words
        for f in [f for f in E("CHANGED_FILES").split(",") if f.strip()]:
            name = Path(f).stem.replace("-", " ").replace("_", " ")
            label = {"index": "Main page settings (index.html)", "robots": "robots.txt (tells Google what to read)",
                     "sitemap": "Sitemap (list of pages for Google)", "vercel": "Page links setup (vercel.json)"}.get(Path(f).stem.lower(), name[:1].upper() + name[1:])
            changes.append({"page": label, "change": f"Updated file: {f}", "keywords": []})
    change_block = ""
    if changes:
        rows = "".join(
            f"<tr><td><b>{esc(x.get('page', ''))}</b></td><td>{esc(x.get('change', ''))}</td>"
            f"<td>{''.join(f'<span class=kw>{esc(k)}</span>' for k in (x.get('keywords') or []))}</td></tr>" for x in changes)
        change_block = ('<h2>🛠 What we updated on the website</h2>'
                        '<table><tr><th style="width:26%">Page</th><th>What we changed</th><th style="width:34%">Target searches</th></tr>'
                        f'{rows}</table>')
    earlier = [x for x in (ins.get("earlier_fixes") or []) if x and x.get("page")]
    if earlier:
        lab = {"kept": "✅ Working – kept", "waiting": "⏳ Waiting for Google", "restored": "↩ Didn't help – undone"}
        rows = "".join(f"<tr><td>{esc(x.get('page', ''))}</td><td>{lab.get(x.get('result'), esc(x.get('result', '')))}</td>"
                       f"<td>{esc(x.get('note', ''))}</td></tr>" for x in earlier)
        change_block += ('<h2>Results of earlier updates</h2><table><tr><th>Page</th><th>Result</th><th>Note</th></tr>'
                         f'{rows}</table>')

    # ---- plain-language explanation points (computed from the data) ----
    nq = len(queries) or 1
    top3 = [r for r in queries if r["position"] <= 3]
    p1 = [r for r in queries if r["position"] <= 10]
    p2 = sorted([r for r in queries if 10 < r["position"] <= 20], key=lambda r: -r["impressions"])
    top3_names = ", ".join(f"'{esc(r['query'])}'" for r in sorted(top3, key=lambda r: -r["impressions"])[:2])
    no_q = len(queries) == 0
    ex_where = explain(["Google has not shared search terms yet – the site gets too few searches. This fills in as visibility grows."]) if no_q else explain([
        f"You show on <b>page 1</b> for <b>{len(p1)} of {len(queries)}</b> searches ({len(p1) / nq * 100:.0f}%).",
        f"<b>Top 3</b> for {top3_names}." if top3_names else "",
        f"<b>{len(p2)}</b> searches are on page 2 – close to page 1." if p2 else "",
    ])
    tot_dev = sum(v for _, v, _ in devices) or 1
    mob_share = dev.get("mobile", 0) / tot_dev * 100
    ex_dev = explain([
        f"<b>{mob_share:.0f}%</b> of people search on a <b>phone</b>." if dev.get("mobile") else "",
        "So the website must be fast and easy on mobile." if mob_share >= 50 else "",
    ])
    daily = [r for r in cur.get("daily", []) if r["impressions"] > 0]
    ex_daily = []
    if daily:
        best = max(daily, key=lambda r: r["impressions"])
        ex_daily.append(f"Best day: <b>{nice_date(best['date'])}</b> ({best['impressions']} times shown).")
        click_days = sum(1 for r in daily if r["clicks"])
        ex_daily.append(f"People visited the site on <b>{click_days}</b> days.")
        if len(daily) >= 10:
            last, first = daily[-7:], daily[:-7]
            a, b = sum(r["impressions"] for r in last) / 7, sum(r["impressions"] for r in first) / len(first)
            if b:
                trend = "going up ▲" if a > b * 1.1 else "going down ▼" if a < b * 0.9 else "steady"
                ex_daily.append(f"Last 7 days: about <b>{a:.0f}</b> per day – {trend}.")
    ex_daily = explain(ex_daily)
    allp = cur.get("pages", [])
    tot_pi = sum(r["impressions"] for r in allp) or 1
    ex_pages = []
    if pages:
        ex_pages.append(f"<b>{esc(page_name(pages[0]['page']))}</b> gets {pages[0]['impressions'] / tot_pi * 100:.0f}% of all views.")
        others = [r for r in pages[1:] if r["clicks"] == 0]
        if others:
            ex_pages.append(f"{len(others)} pages are seen but not clicked yet – better titles can help.")
    ex_pages = explain(ex_pages)
    most = top_q[0] if top_q else None
    ex_top = explain([
        f"Most searched: <b>'{esc(most['query'])}'</b> ({most['impressions']} times)." if most else "",
        f"Next to push to page 1: <b>'{esc(p2[0]['query'])}'</b> (position {p2[0]['position']:.0f})." if p2 else "",
        "<span class=muted>Position = where you appear on Google (1 = first result).</span>",
    ])

    verdict = {"good": ("Good progress", "#1E8E5A"), "okay": ("Steady", "#C98A00"), "needs_attention": ("Needs attention", "#C2413A")}
    vtxt, vcol = verdict.get(ins.get("verdict", "okay"), verdict["okay"])
    logo = (f'<img class="logo" src="{LOGO.as_uri()}">' if LOGO is not None
            else f'<div class="logo-text">{esc(c["agency"])}</div>')
    wm_logo = f'<img class="wm-logo" src="{LOGO.as_uri()}">' if LOGO is not None else ""
    period = f"{nice_date(cur['start'])} – {nice_date(cur['end'])}"
    title = "Monthly SEO Report" if c["mode"] == "fix" else "Weekly SEO Report"

    doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 16mm 14mm 16mm 14mm;
  @bottom-left {{ content: "{esc(c['contact']) or esc(c['agency'])}"; font: 8pt Poppins; color: #aaa; }}
  @bottom-right {{ content: "Page " counter(page) " of " counter(pages); font: 8pt Poppins; color: #aaa; }} }}
body {{ font-family: Poppins, "Noto Sans Devanagari", "Noto Sans", sans-serif; font-size: 9.8pt; line-height: 1.45; color: #26303a; }}
.watermark {{ position: fixed; top: 44%; left: -10%; right: -10%; text-align: center; transform: rotate(-32deg);
  font-size: 62pt; font-weight: 700; color: {color}; opacity: 0.06; }}
.wm-logo {{ position: fixed; top: 36%; left: 30%; width: 40%; opacity: 0.05; }}
.top {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid {color}; padding-bottom: 8pt; }}
.logo {{ max-height: 44pt; max-width: 170pt; }}
.logo-text {{ font-size: 18pt; font-weight: 700; color: {color}; }}
.top-r {{ text-align: right; font-size: 8.5pt; color: #6b7785; }}
h1 {{ font-size: 19pt; font-weight: 700; color: {color}; margin: 10pt 0 0; }}
.sub {{ color: #6b7785; margin: 0 0 6pt; font-size: 9pt; }}
.verdict {{ display: inline-block; background: {vcol}; color: #fff; font-size: 8.5pt; font-weight: 600; padding: 2pt 10pt; border-radius: 10pt; }}
.headline {{ font-size: 11.5pt; font-weight: 600; margin: 6pt 0 8pt; }}
.kpis {{ display: flex; gap: 7pt; margin: 6pt 0 10pt; }}
.kpi {{ flex: 1; border-radius: 8pt; padding: 7pt 9pt; background: #f3f6f9; }}
.kl {{ font-size: 7.5pt; color: #6b7785; text-transform: uppercase; letter-spacing: .4pt; }}
.kv {{ font-size: 19pt; font-weight: 700; color: #1b2733; line-height: 1.15; }}
.kc {{ font-size: 8pt; }} .kh {{ font-size: 7.5pt; color: #9aa4ae; }}
h2 {{ font-size: 12pt; font-weight: 600; color: {color}; margin: 12pt 0 5pt; }}
.row {{ display: flex; gap: 10pt; }} .row > div {{ flex: 1; }}
.box {{ border: 1px solid #e3e8ee; border-radius: 8pt; padding: 3pt 11pt 5pt; margin-bottom: 8pt; }}
.box h3 {{ font-size: 10pt; margin: 5pt 0 2pt; }}
.good h3 {{ color: #1E8E5A; }} .bad h3 {{ color: #C2413A; }}
ul {{ margin: 3pt 0; padding-left: 13pt; }} li {{ margin-bottom: 2pt; }}
.pie {{ display: flex; align-items: center; gap: 10pt; }}
.pl {{ font-size: 8.8pt; }} .lg {{ margin: 2pt 0; }}
.sw {{ display: inline-block; width: 9pt; height: 9pt; border-radius: 2pt; vertical-align: middle; margin-right: 4pt; }}
.chart {{ border: 1px solid #e3e8ee; border-radius: 8pt; padding: 6pt 10pt; }}
.chart h3 {{ font-size: 10pt; margin: 0 0 4pt; }}
.hb {{ display: flex; align-items: center; gap: 6pt; margin: 4pt 0; font-size: 8.8pt; }}
.hbl {{ width: 34%; }} .hbt {{ flex: 1; background: #eef2f6; border-radius: 4pt; height: 9pt; }}
.hbf {{ background: {color}; height: 9pt; border-radius: 4pt; }} .hbv {{ width: 22%; text-align: right; }}
table {{ border-collapse: collapse; width: 100%; font-size: 8.8pt; }}
th {{ background: {color}; color: #fff; text-align: left; padding: 4pt 6pt; font-weight: 600; }}
td {{ border-bottom: 1px solid #edf0f3; padding: 3.5pt 6pt; }}
tr:nth-child(even) td {{ background: #f8fafb; }} .n {{ text-align: right; }}
.b {{ font-size: 7.5pt; padding: 1pt 6pt; border-radius: 8pt; font-weight: 600; white-space: nowrap; }}
.b-top {{ background: #d9f2e5; color: #1E6E47; }} .b-p1 {{ background: #e3eefa; color: #245a92; }}
.b-p2 {{ background: #fdf0d5; color: #8a5b00; }} .b-p3 {{ background: #f6dddb; color: #9b2c25; }}
.up {{ color: #1E8E5A; font-weight: 600; }} .down {{ color: #C2413A; font-weight: 600; }}
.flat, .new, .muted {{ color: #8a96a3; }}
.legend {{ font-size: 7.8pt; color: #7a8793; }}
.sq {{ display: inline-block; width: 8pt; height: 8pt; vertical-align: middle; }}
.dot {{ display: inline-block; width: 7pt; height: 7pt; border-radius: 50%; background: #E8833A; vertical-align: middle; }}
.pb {{ page-break-before: always; }}
.ex {{ margin: 6pt 0 0; padding-left: 12pt; font-size: 8.6pt; color: #3d4a57; background: #f7f9fb; border-radius: 6pt; padding: 5pt 8pt 5pt 20pt; }}
.ex li {{ margin-bottom: 1pt; }}
.kw {{ display: inline-block; background: #e3eefa; color: #245a92; font-size: 7.8pt; padding: 1pt 6pt; border-radius: 8pt; margin: 1pt 2pt 1pt 0; }}
</style></head><body>
<div class="watermark">{esc(c['agency'])}</div>{wm_logo}

<div class="top">{logo}<div class="top-r"><b>{esc(c['site'])}</b><br>{period}</div></div>
<h1>{title}</h1>
<p class="sub">Prepared by {esc(c['agency'])} · {esc(nice_date(c['date']))}</p>
<span class="verdict">{vtxt}</span>
<p class="headline">{esc(ins.get('headline', ''))}</p>

<div class="kpis">{kpis}</div>

<div class="row">
 <div class="box good"><h3>✔ Going well</h3>{li(ins.get('wins'))}</div>
 <div class="box bad"><h3>⚠ Needs work</h3>{li(ins.get('problems'))}</div>
</div>
<div class="row">
 <div class="box"><h3>💡 Our suggestions (we will do)</h3>{li(ins.get('next_actions_agency'))}</div>
 <div class="box"><h3>💡 Suggestions for {esc(c["site"])}</h3>{li(ins.get('next_actions_owner'))}</div>
</div>

<h2>Charts</h2>
<div class="row">
 <div class="chart"><h3>Where you appear on Google</h3>{"" if no_q else pie(buckets)}{ex_where}</div>
 <div class="chart"><h3>Phone vs computer</h3>{pie(devices)}{ex_dev}</div>
</div>
<div class="chart pb" style="margin-top:10pt"><h3>Shown on Google, day by day</h3>{daily_chart(cur.get('daily'), color)}{ex_daily}</div>
<div class="chart" style="margin-top:10pt"><h3>Most visible pages</h3>{page_bars}{ex_pages}</div>

<h2>Top 10 searches</h2>
{"<p class='muted'>No search terms from Google yet.</p>" if no_q else "<table><tr><th>Search</th><th class='n'>Shown</th><th class='n'>Position</th><th>Where</th><th>Change</th></tr>" + q_rows + "</table>" + ex_top}
{change_block}
</body></html>"""
    out.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=doc, base_url=str(HERE)).write_pdf(out)
    return out


def load(date):
    data = json.loads(Path("seo-reports/data/latest.json").read_text(encoding="utf-8"))
    p = Path(f"seo-reports/insights-{date}.json")
    insights = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    return data, insights


if __name__ == "__main__":
    d = cfg()["date"]
    data, ins = load(d)
    print(build(data, ins, Path(f"seo-reports/{d}.pdf")))
