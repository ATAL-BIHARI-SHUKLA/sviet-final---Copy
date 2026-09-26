import "server-only";

export type UploadParams = {
  fileName: string;
  mimeType: string;
  fileBase64: string;
};

export type UploadResult = {
  fileId: string;
  viewUrl: string;
  downloadUrl: string;
};

export async function uploadFileToDrive(params: UploadParams): Promise<UploadResult> {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID ?? "";

  if (!webhookUrl || !secret) throw new Error("Google Apps Script is not configured.");

  const response = await fetch(webhookUrl, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      folderId,
      fileName: params.fileName,
      mimeType: params.mimeType,
      fileBase64: params.fileBase64,
    }),
  });

  if (!response.ok) {
    throw new Error(`Upload failed (HTTP ${response.status}). Please try again.`);
  }

  const result = (await response.json()) as {
    success: boolean;
    fileId?: string;
    error?: string;
    message?: string;
  };

  if (!result.success || !result.fileId) {
    throw new Error(result.error ?? result.message ?? "Upload failed. Please try again.");
  }

  return {
    fileId: result.fileId,
    viewUrl: `/api/v1/drive/${result.fileId}`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${result.fileId}`,
  };
}
