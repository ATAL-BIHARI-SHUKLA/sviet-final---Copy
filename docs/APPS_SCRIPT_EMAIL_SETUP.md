# Careers email notifications — Apps Script setup

Career applications submitted at `/careers` are saved to the database and the
resume is uploaded to Drive. They are **also emailed** to `career@sviet.ac.in`
so the HR team gets an instant notification.

The email is sent through the **same Google Apps Script webhook** already used
for Drive uploads (`GOOGLE_APPS_SCRIPT_URL`). The Next.js side is done
([`lib/mail/send.ts`](../lib/mail/send.ts), called from
[`app/api/leads/career/route.ts`](../app/api/leads/career/route.ts)). It POSTs:

```json
{
  "secret": "…",
  "action": "sendEmail",
  "to": "career@sviet.ac.in",
  "subject": "New Career Application: <position> — <name>",
  "htmlBody": "<html summary of the application>",
  "replyTo": "<applicant email>"
}
```

## One-time step: update the deployed Apps Script

Add a `sendEmail` branch to your `doPost`, then **re-deploy** the web app so the
change goes live. This is backward-compatible — file uploads still work.

Insert the `sendEmail` branch right after the secret check, before the Drive
upload code:

```javascript
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const SECRET = "SUPER_SECRET_KEY"; // = GOOGLE_APPS_SCRIPT_SECRET

    if (body.secret !== SECRET) {
      return jsonResponse({ success: false, message: "Unauthorized" });
    }

    // --- Email notifications (career applications) ---
    if (body.action === "sendEmail") {
      MailApp.sendEmail({
        to: body.to,
        subject: body.subject,
        htmlBody: body.htmlBody,
        // Plain-text fallback for clients that don't render HTML.
        body: body.htmlBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        replyTo: body.replyTo || undefined,
        name: "SVGOI Careers"
      });
      return jsonResponse({ success: true });
    }

    // --- Existing Drive-upload handling stays exactly as-is below ---
    // ... your current file-upload code ...

  } catch (error) {
    return jsonResponse({ success: false, message: error.toString() });
  }
}
```

After pasting, **Deploy → Manage deployments → edit the active deployment →
Deploy** so the new version goes live (editing code alone does not update the
web-app URL).

Notes:

- `MailApp.sendEmail` sends **from the Google account that owns the script**.
  Make sure that account is allowed to email `career@sviet.ac.in` (same
  Workspace org is fine).
- Daily send quota: 100/day (consumer) or 1,500/day (Workspace) — ample here.
- To send to a different address without touching code, set
  `CAREER_APPLICATION_RECIPIENT` in the environment; it defaults to
  `career@sviet.ac.in`.

Until the Apps Script is re-deployed with the branch above, submissions still
succeed and are saved — the email step just logs a warning and is skipped
(it is best-effort by design).
