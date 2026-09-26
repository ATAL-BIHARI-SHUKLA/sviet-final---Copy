/**
 * Returns true for image sources that must skip Next.js optimisation —
 * external CDNs that don't support the optimiser, data URIs, and our own
 * Drive proxy route (which already serves the final bytes).
 */
export function shouldBypassOptimization(src: string): boolean {
  return (
    src.includes(".ufs.sh/") ||
    src.includes("utfs.io") ||
    src.includes("drive.google.com") ||
    src.includes("/api/v1/drive/") ||
    src.startsWith("data:image/")
  );
}
