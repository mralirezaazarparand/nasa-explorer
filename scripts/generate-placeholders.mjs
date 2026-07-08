import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "../public/images");
fs.mkdirSync(dir, { recursive: true });

const placeholders = [
  { name: "mission-apollo.svg", title: "Apollo", hue: "210" },
  { name: "mission-voyager.svg", title: "Voyager", hue: "280" },
  { name: "mission-hubble.svg", title: "Hubble", hue: "200" },
  { name: "mission-curiosity.svg", title: "Curiosity", hue: "10" },
  { name: "mission-perseverance.svg", title: "Perseverance", hue: "30" },
  { name: "mission-webb.svg", title: "Webb", hue: "170" },
  { name: "mission-artemis.svg", title: "Artemis", hue: "250" },
  { name: "gallery-deep-space.svg", title: "Deep Space", hue: "220" },
  { name: "gallery-earth.svg", title: "Earth", hue: "200" },
  { name: "gallery-planets.svg", title: "Planets", hue: "30" },
  { name: "gallery-missions.svg", title: "Missions", hue: "260" },
  { name: "milestone-default.svg", title: "Milestone", hue: "210" },
];

for (const p of placeholders) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="hsl(${p.hue}, 50%, 12%)"/>
      <stop offset="100%" stop-color="#030712"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="400" cy="300" r="80" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
  <circle cx="400" cy="300" r="2" fill="rgba(255,255,255,0.15)"/>
  <text x="400" y="320" text-anchor="middle" fill="rgba(255,255,255,0.08)" font-family="system-ui" font-size="24" letter-spacing="4">${p.title}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, p.name), svg);
}

console.log(`Created ${placeholders.length} placeholder SVGs in public/images/`);
