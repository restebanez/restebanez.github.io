import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

export async function getLocalOgFonts() {
  const fontsDirectory = resolve(process.cwd(), "public/fonts");
  const [regular, bold] = await Promise.all([
    readFile(resolve(fontsDirectory, "DejaVuSansMono.ttf")),
    readFile(resolve(fontsDirectory, "DejaVuSansMono-Bold.ttf")),
  ]);

  return {
    regular: toArrayBuffer(regular),
    bold: toArrayBuffer(bold),
  };
}
