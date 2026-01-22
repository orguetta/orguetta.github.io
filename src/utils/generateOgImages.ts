import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Convert a Node Buffer/Uint8Array to a standalone ArrayBuffer
function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

function svgToPngBlob(svg: string): Blob {
  const resvg = new Resvg(svg);
  const pngData = resvg.render().asPng(); // Uint8Array/Buffer
  // Use ArrayBuffer to satisfy DOM typings for Blob parts
  const ab = toArrayBuffer(new Uint8Array(pngData));
  return new Blob([ab], { type: "image/png" });
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgToPngBlob(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgToPngBlob(svg);
}
