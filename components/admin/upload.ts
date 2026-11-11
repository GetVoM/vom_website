import { createUploadUrl } from "@/app/(admin)/admin/actions";

const MAX_WIDTH = 1600;

/**
 * Resizes an image in the browser (at most 1600 px wide), converts it to WebP,
 * asks the server for a short-lived upload address, and sends the file straight
 * to the media bucket. Returns the public URL and the stored size.
 */
export async function uploadImage(file: File): Promise<{ url: string; width: number; height: number }> {
  if (!file.type.startsWith("image/")) throw new Error("اختر ملف صورة.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
  if (!blob || blob.type !== "image/webp") throw new Error("هذا المتصفح لا يحوّل الصور إلى WebP.");

  const signed = await createUploadUrl(file.name);
  if (!signed.ok) throw new Error(signed.message);
  const response = await fetch(signed.uploadUrl, { method: "PUT", headers: { "Content-Type": "image/webp" }, body: blob });
  if (!response.ok) throw new Error(`تعذّر رفع الصورة (${response.status}).`);
  return { url: signed.publicUrl, width, height };
}
