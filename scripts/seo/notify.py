"""Email the SEO report: short plain-text message + branded PDF attached. Never fails the job."""
import json
import os
import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

E = os.environ.get
SITE = E("SITE_NAME") or E("GITHUB_REPOSITORY", "Website")
DATE = E("REPORT_DATE", "")
MODE = E("MODE", "report")
RESULT = E("PUSH_RESULT", "")
LINK = E("LINK_URL", "")
RUN_URL = E("RUN_URL", "")

STATUS_TEXT = {
    "live": "Website improvements are LIVE (tested before going live).",
    "pr": "Website improvements are ready for review on GitHub.",
    "build_failed": "Website improvements were NOT published: the test build failed. Please check.",
    "report_only": "No website changes were needed this month.",
    "none": "No website changes were needed this month.",
}


def status_line():
    if MODE != "fix":
        return "Weekly report – no website changes this week."
    return STATUS_TEXT.get(RESULT, "Monthly improvement run finished.")


def numbered(items):
    return "\n".join(f"{i}. {x}" for i, x in enumerate([x for x in (items or []) if x][:3], 1))


def email_text(data, ins):
    t = data["current"]["totals"]
    kind = "monthly" if MODE == "fix" else "weekly"
    period = f"{data['current']['start']} to {data['current']['end']}"
    lines = [
        "Hello,",
        "",
        f"Please find attached the {kind} SEO report for {SITE} ({period}).",
        "",
        f"Visits from Google: {t['clicks']}",
        f"Shown on Google: {t['impressions']} times",
    ]
    if MODE == "fix":
        lines += ["", status_line()]
    if LINK:
        lines += [f"Changes: {LINK}"]
    lines += ["", "Regards,", E("AGENCY_NAME") or "SparkSkylytics"]
    return "\n".join(lines)


def send_email(subject, text, pdf_path=None):
    user, pwd, to = E("EMAIL_USER"), E("EMAIL_APP_PASSWORD"), E("EMAIL_TO")
    if not (user and pwd and to):
        print("Email secrets missing, not sending.")
        return
    msg = MIMEMultipart()
    msg["Subject"], msg["From"], msg["To"] = subject, user, to
    msg.attach(MIMEText(text, "plain", "utf-8"))
    if pdf_path and Path(pdf_path).exists():
        part = MIMEApplication(Path(pdf_path).read_bytes(), _subtype="pdf")
        safe = "".join(ch if ch.isalnum() else "-" for ch in SITE).strip("-")
        part.add_header("Content-Disposition", "attachment", filename=f"SEO-Report-{safe}-{DATE}.pdf")
        msg.attach(part)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as s:
        s.login(user, pwd)
        s.sendmail(user, [a.strip() for a in to.split(",")], msg.as_string())
    print("Email: sent")


def main():
    data, ins = None, {}
    try:
        data = json.loads(Path("seo-reports/data/latest.json").read_text(encoding="utf-8"))
        p = Path(f"seo-reports/insights-{DATE}.json")
        ins = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    except Exception as e:
        print("Could not read data:", e)

    ok = E("JOB_STATUS", "success") == "success" and data is not None
    pdf_path = None
    if ok:
        try:
            os.environ["STATUS_TEXT"] = status_line()
            import make_pdf
            pdf_path = make_pdf.build(data, ins, Path(f"seo-reports/{DATE}.pdf"))
            print("PDF created:", pdf_path)
        except Exception as e:
            print("PDF failed:", e)
        tag = {"live": " (changes live)", "pr": " (review needed)", "build_failed": " (BUILD FAILED)"}.get(RESULT, "")
        subject = f"SEO {'monthly' if MODE == 'fix' else 'weekly'} report – {SITE} – {DATE}{tag}"
        text = email_text(data, ins)
    else:
        subject = f"SEO job FAILED – {SITE} – {DATE}"
        text = f"The SEO job for {SITE} did not finish.\nDetails: {RUN_URL}"

    try:
        send_email(subject, text, pdf_path)
    except Exception as e:
        print("Email failed:", e)


if __name__ == "__main__":
    main()
