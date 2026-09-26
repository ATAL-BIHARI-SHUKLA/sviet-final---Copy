import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

const sa = JSON.parse(readFileSync(new URL("../sviet-496910-97144dd6691d.json", import.meta.url)));
const clientEmail = sa.client_email;
const privateKey = sa.private_key;

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

const token = await getAccessToken();

const res = await fetch(
  "https://www.googleapis.com/drive/v3/files?q=mimeType%3D%27application%2Fvnd.google-apps.folder%27&fields=files(id,name,createdTime,webViewLink)&pageSize=50",
  { headers: { Authorization: `Bearer ${token}` } }
);
const data = await res.json();

if (!data.files?.length) {
  console.log("No folders found for this service account.");
} else {
  console.log(`Found ${data.files.length} folder(s):\n`);
  for (const f of data.files) {
    console.log(`Name    : ${f.name}`);
    console.log(`ID      : ${f.id}`);
    console.log(`Created : ${f.createdTime}`);
    console.log(`Link    : ${f.webViewLink}`);
    console.log(`\nAdd to .env:\nGOOGLE_DRIVE_FOLDER_ID=${f.id}\n`);
    console.log("─".repeat(50));
  }
}
