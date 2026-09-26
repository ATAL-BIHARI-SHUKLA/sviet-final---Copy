import "dotenv/config";
import { createSign } from "node:crypto";

const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
const rawKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY;

if (!clientEmail || !rawKey) {
  console.error("Missing GOOGLE_DRIVE_CLIENT_EMAIL or GOOGLE_DRIVE_PRIVATE_KEY in .env");
  process.exit(1);
}

const privateKey = rawKey.replace(/\\n/g, "\n");

function makeJwt() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  const sig = signer.sign(privateKey, "base64url");
  return `${header}.${payload}.${sig}`;
}

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: makeJwt(),
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Token error: " + JSON.stringify(data));
  return data.access_token;
}

async function createFolder(name, accessToken) {
  const res = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,webViewLink", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, mimeType: "application/vnd.google-apps.folder" }),
  });
  const data = await res.json();
  if (!data.id) throw new Error("Create folder error: " + JSON.stringify(data));
  return data;
}

async function shareFolder(folderId, accessToken) {
  await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: "reader", type: "anyone" }),
  });
}

const token = await getAccessToken();
const folder = await createFolder("sviet_web", token);
await shareFolder(folder.id, token);

console.log("✅ Folder created successfully!");
console.log("   Name       : sviet_web");
console.log("   Folder ID  :", folder.id);
console.log("   Link       :", `https://drive.google.com/drive/folders/${folder.id}`);
console.log("\nAdd this to your .env:");
console.log(`GOOGLE_DRIVE_FOLDER_ID=${folder.id}`);
