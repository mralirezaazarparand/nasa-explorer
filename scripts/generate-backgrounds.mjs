import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "../public/backgrounds");

fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(
  path.join(dir, "galaxy-main.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="g1" cx="30%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#1a1a3e"/><stop offset="50%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#030712"/>
    </radialGradient>
    <radialGradient id="g2" cx="70%" cy="60%" r="50%">
      <stop offset="0%" stop-color="rgba(59,130,246,0.08)"/><stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="g3" cx="40%" cy="80%" r="40%">
      <stop offset="0%" stop-color="rgba(147,51,234,0.06)"/><stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#g1)"/>
  <rect width="1920" height="1080" fill="url(#g2)"/>
  <rect width="1920" height="1080" fill="url(#g3)"/>
</svg>`
);

fs.writeFileSync(
  path.join(dir, "nebula.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="n1" cx="50%" cy="40%" r="30%">
      <stop offset="0%" stop-color="rgba(59,130,246,0.12)"/><stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="n2" cx="30%" cy="70%" r="25%">
      <stop offset="0%" stop-color="rgba(168,85,247,0.08)"/><stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="n3" cx="70%" cy="30%" r="20%">
      <stop offset="0%" stop-color="rgba(236,72,153,0.06)"/><stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="#030712"/>
  <rect width="1920" height="1080" fill="url(#n1)"/>
  <rect width="1920" height="1080" fill="url(#n2)"/>
  <rect width="1920" height="1080" fill="url(#n3)"/>
</svg>`
);

const starCount = 400;
let starsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="transparent"/>`;
for (let i = 0; i < starCount; i++) {
  const x = Math.random() * 1920;
  const y = Math.random() * 1080;
  const r = Math.random() * 1.5 + 0.3;
  const o = Math.random() * 0.5 + 0.1;
  starsSvg += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,${o})"/>`;
}
starsSvg += `</svg>`;
fs.writeFileSync(path.join(dir, "stars.svg"), starsSvg);

const dustCount = 200;
let dustSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="transparent"/>`;
for (let i = 0; i < dustCount; i++) {
  const x = Math.random() * 1920;
  const y = Math.random() * 1080;
  const r = Math.random() * 3 + 1;
  const o = Math.random() * 0.08 + 0.02;
  dustSvg += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(147,51,234,${o})"/>`;
}
dustSvg += `</svg>`;
fs.writeFileSync(path.join(dir, "dust.svg"), dustSvg);

console.log("Background SVGs created in public/backgrounds/");
