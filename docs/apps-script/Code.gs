/**
 * SVGOI webhook — single Apps Script endpoint used by the Next.js app for:
 *   1. "sendEmail" action  -> career-application notification emails (MailApp)
 *   2. default action      -> résumé/file uploads to Google Drive (DriveApp)
 *
 * Contracts (must match the app):
 *   Email  (lib/mail/send.ts):   { secret, action:"sendEmail", to, subject, htmlBody, replyTo? }
 *                                 -> { success:true } | { success:false, message }
 *   Upload (lib/drive/upload.ts): { secret, folderId, fileName, mimeType, fileBase64 }
 *                                 -> { success:true, fileId } | { success:false, message }
 *
 * After editing: Save -> run `authorize` once to grant Mail + Drive permissions
 * -> Deploy > Manage deployments > edit active > Version: New version > Deploy.
 */

// Must equal GOOGLE_APPS_SCRIPT_SECRET in your .env / Vercel env.
const SECRET = "PASTE_GOOGLE_APPS_SCRIPT_SECRET_HERE";

/** JSON response helper (web apps 302 to googleusercontent; client follows it). */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Simple health check: open the /exec URL in a browser to confirm it's live. */
function doGet() {
  return jsonResponse({ success: true, status: "ok" });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, message: "No request body." });
    }

    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SECRET) {
      return jsonResponse({ success: false, message: "Unauthorized" });
    }

    // --- 1. Email notifications (career applications) ---
    if (body.action === "sendEmail") {
      if (!body.to || !body.subject || !body.htmlBody) {
        return jsonResponse({ success: false, message: "Missing to/subject/htmlBody." });
      }

      const options = {
        to: body.to,
        subject: body.subject,
        htmlBody: body.htmlBody,
        // Plain-text fallback for clients that don't render HTML.
        body: String(body.htmlBody).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        name: "SVGOI Careers"
      };
      if (body.replyTo) options.replyTo = body.replyTo;

      MailApp.sendEmail(options);
      return jsonResponse({ success: true });
    }

    // --- 2. Default action: upload a file to Drive ---
    if (!body.fileBase64 || !body.fileName) {
      return jsonResponse({ success: false, message: "Missing fileBase64/fileName." });
    }

    const bytes = Utilities.base64Decode(body.fileBase64);
    const blob = Utilities.newBlob(bytes, body.mimeType || "application/octet-stream", body.fileName);

    const folder = body.folderId
      ? DriveApp.getFolderById(body.folderId)
      : DriveApp.getRootFolder();

    const file = folder.createFile(blob);

    return jsonResponse({ success: true, fileId: file.getId() });

  } catch (error) {
    return jsonResponse({ success: false, message: String(error) });
  }
}

/**
 * Run this ONCE from the editor to trigger the permission prompts for BOTH
 * MailApp (send_mail) and DriveApp (drive). Approve them, then redeploy.
 */
function authorize() {
  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: "SVGOI Apps Script authorized",
    htmlBody: "<p>Mail + Drive permissions granted successfully.</p>"
  });
  DriveApp.getRootFolder(); // forces the Drive scope prompt
}
