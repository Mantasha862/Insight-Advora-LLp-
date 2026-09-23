import "server-only";

// Supabase Storage via REST using the service-role key. Server only — never import from client code.
export const BUCKETS = ["team", "services", "knowledge", "general"] as const;
export type Bucket = (typeof BUCKETS)[number];

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "application/pdf"]);
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase Storage is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  return { url, key };
}

export function validateUpload(file: File): string | null {
  if (!ALLOWED.has(file.type)) return "Only PNG, JPEG, WebP, GIF, SVG or PDF files are allowed.";
  if (file.size > MAX_UPLOAD_BYTES) return "Files must be 10 MB or smaller.";
  return null;
}

export async function uploadObject(bucket: Bucket, path: string, file: File) {
  const { url, key } = config();
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${encodeURI(path)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": file.type, "x-upsert": "false", "cache-control": "31536000" },
    body: Buffer.from(await file.arrayBuffer()),
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status}): ${await res.text()}`);
  return `${url}/storage/v1/object/public/${bucket}/${encodeURI(path)}`;
}

export async function deleteObject(bucket: Bucket, path: string) {
  const { url, key } = config();
  const res = await fetch(`${url}/storage/v1/object/${bucket}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ prefixes: [path] }),
  });
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
}
