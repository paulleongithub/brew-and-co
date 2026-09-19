#!/usr/bin/env node
// Downloads an image from a URL, resizes it, and re-encodes it as WebP.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

function parseArgs(argv) {
  const options = { width: null, quality: 80, dir: "public/images" };
  const positional = [];

  for (const arg of argv) {
    if (arg.startsWith("--width=")) options.width = Number(arg.slice("--width=".length));
    else if (arg.startsWith("--quality=")) options.quality = Number(arg.slice("--quality=".length));
    else if (arg.startsWith("--dir=")) options.dir = arg.slice("--dir=".length);
    else positional.push(arg);
  }

  const [url, name] = positional;
  return { url, name, ...options };
}

function fail(message) {
  console.error(message);
  console.error(
    "\nUsage: node optimize-image.mjs <image-url> <output-name> [--width=1600] [--quality=80] [--dir=public/images]"
  );
  process.exit(1);
}

async function main() {
  const { url, name, width, quality, dir } = parseArgs(process.argv.slice(2));

  if (!url || !name) fail("Missing required arguments: <image-url> and <output-name>.");

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return fail(`Not a valid URL: ${url}`);
  }
  if (parsedUrl.protocol !== "https:") {
    return fail("Only https:// URLs are supported.");
  }
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    return fail("--quality must be a number between 1 and 100.");
  }
  if (width !== null && (!Number.isFinite(width) || width < 1)) {
    return fail("--width must be a positive number.");
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
    return fail("<output-name> may only contain letters, numbers, dots, dashes, and underscores.");
  }

  console.log(`Downloading ${parsedUrl.href} ...`);
  const response = await fetch(parsedUrl);
  if (!response.ok) {
    return fail(`Download failed: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    return fail(`URL did not return an image (content-type: ${contentType || "unknown"}).`);
  }
  const inputBuffer = Buffer.from(await response.arrayBuffer());

  const outputName = name.replace(/\.[a-zA-Z0-9]+$/, "") + ".webp";
  const outputDir = path.resolve(process.cwd(), dir);
  const outputPath = path.join(outputDir, outputName);

  await mkdir(outputDir, { recursive: true });

  // .rotate() with no args auto-orients using EXIF before sharp strips it.
  let pipeline = sharp(inputBuffer).rotate();
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }
  const outputBuffer = await pipeline.webp({ quality }).toBuffer();

  await writeFile(outputPath, outputBuffer);

  const meta = await sharp(outputBuffer).metadata();
  const kb = (outputBuffer.length / 1024).toFixed(1);
  const publicRelative = path.relative(path.resolve(process.cwd(), "public"), outputPath);
  const webPath = "/" + publicRelative.split(path.sep).join("/");

  console.log(`Saved ${outputPath} (${meta.width}x${meta.height}px, ${kb} KB)`);
  console.log(`Reference it in code as: ${webPath}`);
}

main().catch((error) => {
  console.error(error?.stack ?? error);
  process.exit(1);
});
