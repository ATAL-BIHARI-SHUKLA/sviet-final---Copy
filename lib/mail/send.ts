import "server-only";

/**
 * Sends transactional email through the same secret-authenticated Google Apps
 * Script webhook used for Drive uploads (see `lib/drive/upload.ts`). The
 * deployed Apps Script branches on `action: "sendEmail"` and calls
 * `MailApp.sendEmail(...)`. Keeping mail on the existing webhook means no new
 * SMTP credentials or npm dependencies.
 */

/** Default recipient for career-application notifications. */
const CAREER_RECIPIENT =
  process.env.CAREER_APPLICATION_RECIPIENT ?? "career@sviet.ac.in";

type SendEmailParams = {
  to: string;
  subject: string;
  htmlBody: string;
  /** Sets the Reply-To header so replies go to the applicant. */
  replyTo?: string;
};

/** POSTs an email job to the Apps Script webhook. Throws on failure. */
async function sendEmailViaAppsScript(params: SendEmailParams): Promise<void> {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!webhookUrl || !secret) {
    throw new Error("Google Apps Script is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      action: "sendEmail",
      to: params.to,
      subject: params.subject,
      htmlBody: params.htmlBody,
      replyTo: params.replyTo,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email send failed (HTTP ${response.status}).`);
  }

  const result = (await response.json()) as {
    success?: boolean;
    error?: string;
    message?: string;
  };

  if (!result.success) {
    throw new Error(result.error ?? result.message ?? "Email send failed.");
  }
}

/** Escapes a string for safe interpolation into HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type CareerApplicationEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  qualifications: string;
  yearsExperience: number;
  coverLetter?: string;
  resumeFileId?: string;
  resumeFileName?: string;
};

/**
 * Emails a formatted career-application summary to the careers inbox. Reply-To
 * is set to the applicant so the HR team can respond directly.
 */
export async function sendCareerApplicationEmail(
  data: CareerApplicationEmailData,
): Promise<void> {
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  const rows: Array<[string, string]> = [
    ["Full name", fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Position applying for", data.position],
    ["Qualifications", data.qualifications],
    ["Years of experience", String(data.yearsExperience)],
  ];

  if (data.coverLetter) rows.push(["Cover letter", data.coverLetter]);

  if (data.resumeFileId) {
    const label = data.resumeFileName
      ? escapeHtml(data.resumeFileName)
      : "View resume";
    const viewUrl = `https://drive.google.com/file/d/${data.resumeFileId}/view`;
    rows.push([
      "Resume / CV",
      `<a href="${viewUrl}">${label}</a>`,
    ]);
  } else {
    rows.push(["Resume / CV", "Not provided"]);
  }

  const tableRows = rows
    .map(([label, value]) => {
      // Resume value is pre-built HTML (an anchor); everything else is escaped.
      const cell = label === "Resume / CV" ? value : escapeHtml(value);
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;white-space:nowrap;vertical-align:top;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${cell}</td>
        </tr>`;
    })
    .join("");

  const htmlBody = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;max-width:640px;">
      <h2 style="margin:0 0 4px;">New Career Application</h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        A new application was submitted through the SVGOI careers page.
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${tableRows}
      </table>
    </div>`;

  await sendEmailViaAppsScript({
    to: CAREER_RECIPIENT,
    subject: `New Career Application: ${data.position} — ${fullName}`,
    htmlBody,
    replyTo: data.email,
  });
}
