// Gera a imagem de compartilhamento (Open Graph) em JPEG leve: app/opengraph-image.jpg
// Uso: node scripts/generate-og.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const h = React.createElement;
const root = process.cwd();

const [serif, sans, photo] = await Promise.all([
  readFile(path.join(root, "lib/fonts/young-serif-latin-400-normal.woff")),
  readFile(path.join(root, "lib/fonts/hanken-grotesk-latin-700-normal.woff")),
  readFile(path.join(root, "public/fachada.png")),
]);
const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

const pill = (text, bg, color) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        background: bg,
        color,
        fontFamily: "Hanken Grotesk",
        fontWeight: 700,
        fontSize: 26,
        padding: "12px 26px",
        borderRadius: 999,
      },
    },
    text
  );

const tree = h(
  "div",
  { style: { display: "flex", width: "100%", height: "100%", position: "relative", background: "#1F1A16" } },
  h("img", {
    src: photoSrc,
    width: 1200,
    height: 630,
    style: { position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" },
  }),
  h("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 1200,
      height: 630,
      background:
        "linear-gradient(to top, rgba(31,26,22,0.96) 0%, rgba(31,26,22,0.62) 48%, rgba(31,26,22,0.12) 100%)",
    },
  }),
  h(
    "div",
    {
      style: {
        position: "absolute",
        top: 52,
        left: 56,
        right: 56,
        bottom: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
    },
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            background: "#F6EFE4",
            borderRadius: 999,
            padding: "14px 34px",
            fontFamily: "Young Serif",
            fontSize: 44,
          },
        },
        h("span", { style: { color: "#1F1A16" } }, "Thanyu’s\u00A0"),
        h("span", { style: { color: "#B8481F" } }, "Hotel")
      ),
      pill("Portaria 24h", "#B8481F", "#F6EFE4")
    ),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Young Serif",
            fontSize: 72,
            lineHeight: 1.04,
            color: "#F6EFE4",
            maxWidth: 1000,
          },
        },
        "Chegue a qualquer hora. Acorde com mesa farta."
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            marginTop: 22,
            fontFamily: "Hanken Grotesk",
            fontWeight: 700,
            fontSize: 30,
            color: "#EADFCB",
          },
        },
        "Café mineiro feito às 3h30 pelo Sr. Agostinho · Montalvânia, MG"
      ),
      h(
        "div",
        { style: { display: "flex", gap: 16, marginTop: 28 } },
        pill("4,3 no Google Maps", "rgba(246,239,228,0.18)", "#F6EFE4"),
        pill("5,0 em Atendimento no Tripadvisor", "rgba(246,239,228,0.18)", "#F6EFE4")
      )
    )
  )
);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Young Serif", data: serif, weight: 400, style: "normal" },
    { name: "Hanken Grotesk", data: sans, weight: 700, style: "normal" },
  ],
});

const png = new Resvg(svg).render().asPng();
const jpg = await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
const out = path.join(root, "app/opengraph-image.jpg");
await writeFile(out, jpg);
await writeFile(path.join(root, "app/opengraph-image.alt.txt"), "Thanyu’s Hotel - Portaria 24h no centro de Montalvânia, MG", "utf8");
console.log(`OG gerada: ${out} (${Math.round(jpg.length / 1024)} KB)`);
