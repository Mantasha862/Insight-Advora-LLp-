"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createSession, destroySession, requireUser } from "@/lib/auth";
import { rateLimit } from "@/lib/ratelimit";
import { deleteRow, saveRow, setRowStatus, ValidationError } from "@/lib/admin/crud";
import { getResourceDef } from "@/lib/admin/resources";
import { BUCKETS, deleteObject, uploadObject, validateUpload, type Bucket } from "@/lib/admin/storage";
import { slugify } from "@/lib/utils";

export type AdminFormState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Record<string, string> };

const s = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
};

function refreshSite() {
  revalidatePath("/", "layout");
}

// ─── Auth ───────────────────────────────────────────────────────────────────

// A valid bcrypt hash of a random string: keeps timing uniform for unknown emails.
const DUMMY_HASH = "$2b$12$hqAvAJq9GC9NQPwE4bVrAuUCwVt4b9JY2t4Z6Ao2Tg0KqAtc9S1PW";

export async function login(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  const email = s(fd, "email").toLowerCase();
  const pw = s(fd, "password");
  if (!email || !pw) return { status: "error", message: "Enter your email and password." };
  if (!(await rateLimit("login", email))) return { status: "error", message: "Too many attempts. Please wait and try again." };
  if (!process.env.AUTH_SECRET || !process.env.DATABASE_URL) return { status: "error", message: "The admin panel is not configured (DATABASE_URL / AUTH_SECRET)." };

  const user = await prisma.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(pw, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !user.active || !ok) return { status: "error", message: "Invalid email or password." };

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createSession({ sub: user.id, email: user.email, role: user.role });
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ─── Generic content CRUD ───────────────────────────────────────────────────

export async function saveResource(key: string, id: string | null, _prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser();
  const def = getResourceDef(key);
  if (!def) return { status: "error", message: "Unknown resource." };
  let savedId: string;
  try {
    savedId = await saveRow(def, id, fd);
  } catch (e) {
    if (e instanceof ValidationError) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: e.fieldErrors };
    console.error(e);
    return { status: "error", message: "Could not save. Please try again." };
  }
  refreshSite();
  if (!id) redirect(`/admin/${key}/${savedId}?saved=1`);
  revalidatePath(`/admin/${key}/${savedId}`);
  return { status: "success", message: "Saved." };
}

export async function changeStatus(key: string, id: string, status: string) {
  await requireUser();
  const def = getResourceDef(key);
  if (!def) return;
  await setRowStatus(def, id, status);
  refreshSite();
  revalidatePath(`/admin/${key}`);
  revalidatePath(`/admin/${key}/${id}`);
}

export async function removeResource(key: string, id: string) {
  await requireUser("admin");
  const def = getResourceDef(key);
  if (!def) return;
  await deleteRow(def, id);
  refreshSite();
  redirect(`/admin/${key}?deleted=1`);
}

// ─── Enquiries (leads) ──────────────────────────────────────────────────────

const LEAD_STATUSES = ["new", "contacted", "in_progress", "closed"] as const;

export async function updateLead(id: string, _prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser("admin");
  const parsed = z
    .object({ status: z.enum(LEAD_STATUSES), internal_notes: z.string().max(10000) })
    .safeParse({ status: s(fd, "status"), internal_notes: s(fd, "internal_notes") });
  if (!parsed.success) return { status: "error", message: "Invalid input." };
  await prisma.lead.update({ where: { id }, data: { status: parsed.data.status, internalNotes: parsed.data.internal_notes || null } });
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  return { status: "success", message: "Enquiry updated." };
}

// ─── Settings & SEO ─────────────────────────────────────────────────────────

const optUrl = z.union([z.literal(""), z.url().max(500)]);
const SETTINGS_KEYS = ["firmName", "tagline", "logo", "email", "phone", "address", "officeHours", "mapEmbedUrl", "linkedin", "footerText", "copyrightYear", "gaId", "gtmId"];

export async function saveSettings(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser("admin");
  const parsed = z
    .object({
      firmName: z.string().min(2).max(160),
      tagline: z.string().max(200),
      logo: z.string().max(500),
      email: z.union([z.literal(""), z.email().max(254)]),
      phone: z.string().max(40),
      address: z.string().max(500),
      officeHours: z.string().max(200),
      mapEmbedUrl: optUrl,
      linkedin: optUrl,
      footerText: z.string().max(600),
      copyrightYear: z.coerce.number().int().min(2020).max(2100),
      gaId: z.string().regex(/^(G-[A-Z0-9]+)?$/i, "GA4 IDs look like G-XXXXXXX"),
      gtmId: z.string().regex(/^(GTM-[A-Z0-9]+)?$/i, "GTM IDs look like GTM-XXXXXX"),
    })
    .safeParse(Object.fromEntries(SETTINGS_KEYS.map((k) => [k, s(fd, k)])));
  if (!parsed.success) {
    const fe: Record<string, string> = {};
    for (const i of parsed.error.issues) fe[String(i.path[0])] = i.message;
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: fe };
  }
  const d = parsed.data;
  const nul = (v: string) => v || null;
  const data = {
    firmName: d.firmName,
    tagline: d.tagline,
    logo: nul(d.logo),
    email: nul(d.email),
    phone: nul(d.phone),
    address: nul(d.address),
    officeHours: nul(d.officeHours),
    mapEmbedUrl: nul(d.mapEmbedUrl),
    linkedin: nul(d.linkedin),
    footerText: nul(d.footerText),
    copyrightYear: d.copyrightYear,
    gaId: nul(d.gaId),
    gtmId: nul(d.gtmId),
    careersActive: fd.get("careersActive") === "on",
  };
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });
  refreshSite();
  return { status: "success", message: "Settings saved." };
}

export async function savePageSeo(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser();
  const path = s(fd, "path");
  if (!/^\/[a-z0-9\-/]*$/.test(path)) return { status: "error", message: "Path must start with / and contain only a–z, 0–9, - and /." };
  const title = s(fd, "title").slice(0, 160) || null;
  const description = s(fd, "description").slice(0, 320) || null;
  const ogImage = s(fd, "ogImage").slice(0, 500) || null;
  const canonical = s(fd, "canonical").slice(0, 500) || null;
  if (canonical && !/^https:\/\//.test(canonical)) return { status: "error", message: "Canonical must be an https:// URL." };
  await prisma.pageSeo.upsert({ where: { path }, update: { title, description, ogImage, canonical }, create: { path, title, description, ogImage, canonical } });
  refreshSite();
  revalidatePath("/admin/seo");
  return { status: "success", message: `SEO saved for ${path}.` };
}

export async function deletePageSeo(id: string) {
  await requireUser();
  await prisma.pageSeo.delete({ where: { id } });
  refreshSite();
  revalidatePath("/admin/seo");
}

// ─── Media library ──────────────────────────────────────────────────────────

export async function uploadMedia(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser();
  const bucket = s(fd, "bucket") as Bucket;
  if (!BUCKETS.includes(bucket)) return { status: "error", message: "Choose a bucket." };
  const file = fd.get("file");
  if (!(file instanceof File) || !file.size) return { status: "error", message: "Choose a file." };
  const invalid = validateUpload(file);
  if (invalid) return { status: "error", message: invalid };
  const ext = (file.name.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5);
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const path = `${new Date().toISOString().slice(0, 10)}/${Date.now().toString(36)}-${base}${ext ? `.${ext}` : ""}`;
  try {
    const url = await uploadObject(bucket, path, file);
    await prisma.media.create({
      data: { bucket, path, url, name: file.name.slice(0, 200), mimeType: file.type, size: file.size, alt: s(fd, "alt").slice(0, 300) || null },
    });
  } catch (e) {
    console.error(e);
    return { status: "error", message: e instanceof Error ? e.message : "Upload failed." };
  }
  revalidatePath("/admin/media");
  return { status: "success", message: "Uploaded." };
}

export async function deleteMedia(id: string) {
  await requireUser("admin");
  const m = await prisma.media.findUnique({ where: { id } });
  if (!m) return;
  await deleteObject(m.bucket as Bucket, m.path);
  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/media");
}

// ─── Users ──────────────────────────────────────────────────────────────────

const password = z.string().min(12, "Use at least 12 characters.").max(200);

export async function createUser(_prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  await requireUser("admin");
  const parsed = z
    .object({ email: z.email().max(254), name: z.string().max(120), role: z.enum(["admin", "editor"]), password })
    .safeParse({ email: s(fd, "email").toLowerCase(), name: s(fd, "name"), role: s(fd, "role"), password: s(fd, "password") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return { status: "error", message: "A user with this email already exists." };
  await prisma.user.create({
    data: { email: parsed.data.email, name: parsed.data.name || null, role: parsed.data.role, passwordHash: await bcrypt.hash(parsed.data.password, 12) },
  });
  revalidatePath("/admin/users");
  return { status: "success", message: "User created." };
}

export async function updateUser(id: string, _prev: AdminFormState, fd: FormData): Promise<AdminFormState> {
  const me = await requireUser("admin");
  const role = s(fd, "role") === "admin" ? "admin" : "editor";
  const active = fd.get("active") === "on";
  if (id === me.id && (role !== "admin" || !active)) return { status: "error", message: "You cannot demote or deactivate yourself." };
  const data: { role: "admin" | "editor"; active: boolean; passwordHash?: string } = { role, active };
  const pw = s(fd, "password");
  if (pw) {
    const p = password.safeParse(pw);
    if (!p.success) return { status: "error", message: p.error.issues[0]?.message };
    data.passwordHash = await bcrypt.hash(pw, 12);
  }
  await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/users");
  return { status: "success", message: "User updated." };
}
