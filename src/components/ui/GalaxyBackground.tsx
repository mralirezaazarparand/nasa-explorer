"use client";

import { useMemo, useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  duration: number;
  delay: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

function generateStars(rng: () => number, count: number, minSize: number, maxSize: number): StarData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: rng() * (maxSize - minSize) + minSize,
    baseOpacity: rng() * 0.35 + 0.08,
    duration: rng() * 4 + 2,
    delay: rng() * 3,
  }));
}

function generateParticles(rng: () => number, count: number): ParticleData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: rng() * 2.5 + 0.8,
    duration: rng() * 20 + 15,
    delay: rng() * 10,
    drift: (rng() * 12 - 6),
  }));
}

interface GalaxyBackgroundProps {
  starCount?: number;
}

const GalaxyBackground = memo(function GalaxyBackground({
  starCount = 80,
}: GalaxyBackgroundProps) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const rng = useMemo(() => createRng(42), []);

  const starData = useMemo(() => {
    const r = createRng(42);
    return {
      far: generateStars(r, Math.floor(starCount * 0.45), 0.3, 0.7),
      mid: generateStars(r, Math.floor(starCount * 0.35), 0.7, 1.3),
      bright: generateStars(r, Math.floor(starCount * 0.2), 1.3, 2.5),
      particles: generateParticles(r, 4),
    };
  }, [starCount]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMouse({
            x: mouseRef.current.x / window.innerWidth,
            y: mouseRef.current.y / window.innerHeight,
          });
          rafRef.current = null;
        });
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const mouseOffset = useMemo(() => ({
    x: (mouse.x - 0.5) * 12,
    y: (mouse.y - 0.5) * 12,
  }), [mouse.x, mouse.y]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/backgrounds/galaxy-main.webp)",
          scale: 1.08,
        }}
        animate={{
          x: mouseOffset.x * -0.06,
          y: mouseOffset.y * -0.06,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url(/backgrounds/nebula.webp)",
          mixBlendMode: "screen",
          scale: 1.12,
        }}
        animate={{
          x: mouseOffset.x * -0.12,
          y: mouseOffset.y * -0.12,
        }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url(/backgrounds/stars-overlay.webp)",
          mixBlendMode: "screen",
          scale: 1.04,
        }}
        animate={{
          x: mouseOffset.x * -0.03,
          y: mouseOffset.y * -0.03,
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)",
        }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)",
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(96,165,250,0.05), transparent 70%)",
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0">
        {starData.far.map((star) => (
          <motion.div
            key={`far-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.baseOpacity * 0.5, star.baseOpacity, star.baseOpacity * 0.5],
              x: ((star.x - 50) / 50) * mouseOffset.x * -0.08,
              y: ((star.y - 50) / 50) * mouseOffset.y * -0.08,
            }}
            transition={{
              opacity: { duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay },
              x: { duration: 2, ease: "easeOut" },
              y: { duration: 2, ease: "easeOut" },
            }}
          />
        ))}

        {starData.mid.map((star) => (
          <motion.div
            key={`mid-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.baseOpacity * 0.4, star.baseOpacity * 1.3, star.baseOpacity * 0.4],
              scale: [0.9, 1.15, 0.9],
              x: ((star.x - 50) / 50) * mouseOffset.x * -0.18,
              y: ((star.y - 50) / 50) * mouseOffset.y * -0.18,
            }}
            transition={{
              opacity: { duration: star.duration * 0.7, repeat: Infinity, ease: "easeInOut", delay: star.delay },
              scale: { duration: star.duration * 0.7, repeat: Infinity, ease: "easeInOut", delay: star.delay },
              x: { duration: 2, ease: "easeOut" },
              y: { duration: 2, ease: "easeOut" },
            }}
          />
        ))}

        {starData.bright.map((star) => (
          <div key={`bright-${star.id}`}>
            <motion.div
              className="absolute rounded-full"
              style={{
                left: `calc(${star.x}% - ${star.size * 4}px)`,
                top: `calc(${star.y}% - ${star.size * 4}px)`,
                width: star.size * 8,
                height: star.size * 8,
                background: "radial-gradient(circle, rgba(96,165,250,0.08), transparent)",
              }}
              animate={{
                opacity: [0.05, 0.2, 0.05],
                x: ((star.x - 50) / 50) * mouseOffset.x * -0.35,
                y: ((star.y - 50) / 50) * mouseOffset.y * -0.35,
              }}
              transition={{
                opacity: { duration: star.duration * 0.8, repeat: Infinity, ease: "easeInOut", delay: star.delay },
                x: { duration: 2, ease: "easeOut" },
                y: { duration: 2, ease: "easeOut" },
              }}
            />
            <motion.div
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                boxShadow: `0 0 ${star.size * 2}px rgba(96,165,250,0.2)`,
              }}
              animate={{
                opacity: [star.baseOpacity * 0.4, star.baseOpacity * 1.6, star.baseOpacity * 0.4],
                scale: [0.8, 1.4, 0.8],
                x: ((star.x - 50) / 50) * mouseOffset.x * -0.35,
                y: ((star.y - 50) / 50) * mouseOffset.y * -0.35,
              }}
              transition={{
                opacity: { duration: star.duration * 0.6, repeat: Infinity, ease: "easeInOut", delay: star.delay },
                scale: { duration: star.duration * 0.6, repeat: Infinity, ease: "easeInOut", delay: star.delay },
                x: { duration: 2, ease: "easeOut" },
                y: { duration: 2, ease: "easeOut" },
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {starData.particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full bg-blue-400/15 blur-[2px]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, particle.drift, 0],
              opacity: [0, 0.35, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)",
        }}
        animate={{
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
          x: "-50%",
          y: "-50%",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
});

export { GalaxyBackground };
