// Gera o favicon "TH" (T tinta + H terracota, Young Serif) como PNG estático.
// Uso: node scripts/generate-icons.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const h = React.createElement;
const root = process.cwd();
const serif = await readFile(path.join(root, "lib/fonts/young-serif-latin-400-normal.woff"));

async function makeIcon(px, file) {
  const svg = await satori(
    h(
      "div",
      {
        style: {
          width: px,
          height: px,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6EFE4",
          borderRadius: Math.round(px * 0.22),
          fontFamily: "Young Serif",
          fontSize: Math.round(px * 0.52),
          letterSpacing: -Math.round(px * 0.03),
        },
      },
      h("span", { style: { color: "#1F1A16" } }, "T"),
      h("span", { style: { color: "#B8481F" } }, "H")
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Young Serif", data: serif, weight: 400, style: "normal" }],
    }
  );
  const png = new Resvg(svg).render().asPng();
  await writeFile(path.join(root, "app", file), png);
  console.log(`${file}: ${png.length} bytes`);
}

await makeIcon(128, "icon.png");
await makeIcon(180, "apple-icon.png");
