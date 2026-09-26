import "dotenv/config";
import { createSign } from "node:crypto";

const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
const rawKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY;
const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

const ADD_EMAIL = "admin019@sviet.ac.in";
const REMOVE_EMAIL = "team@godigitify.com";

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
  return `${header}.${payload}.${signer.sign(privateKey, "base64url")}`;
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

const token = await getAccessToken();

// List current permissions to find godigitify permission ID
const listRes = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions?fields=permissions(id,emailAddress)`, {
  headers: { Authorization: `Bearer ${token}` },
});
const { permissions = [] } = await listRes.json();

// Remove godigitify
const toRemove = permissions.find(p => p.emailAddress === REMOVE_EMAIL);
if (toRemove) {
  const delRes = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions/${toRemove.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(delRes.ok ? `🗑️  Removed ${REMOVE_EMAIL}` : `⚠️  Could not remove ${REMOVE_EMAIL}`);
} else {
  console.log(`ℹ️  ${REMOVE_EMAIL} not found in permissions`);
}

// Add sviet admin
const addRes = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}/permissions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ role: "writer", type: "user", emailAddress: ADD_EMAIL }),
});
const addData = await addRes.json();
if (addRes.ok) {
  console.log(`✅ Shared with ${ADD_EMAIL} as writer`);
} else {
  console.error("❌ Failed to add:", JSON.stringify(addData, null, 2));
}
