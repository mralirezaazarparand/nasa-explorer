"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const stats = [
  { label: "Founded", value: "1958" },
  { label: "Moon Landings", value: "6" },
  { label: "Mars Rovers", value: "5" },
  { label: "Space Telescopes", value: "15+" },
];

function About() {
  return (
    <Section id="about" className="bg-[#0B1220]/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
              About NASA
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-6 tracking-tight">
              Humanity&apos;s
              <br />
              <span className="text-white/40">Greatest Journey</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Founded in 1958, the National Aeronautics and Space
                Administration (NASA) stands as humanity&apos;s premier
                institution for space exploration and aerospace innovation.
              </p>
              <p>
                From the historic Apollo Moon landings to the groundbreaking
                exploration of Mars, from the iconic Hubble Space Telescope to
                the revolutionary James Webb Space Telescope, NASA continues to
                push the boundaries of what is possible.
              </p>
              <p>
                Today, NASA leads the Artemis program to return humans to the
                Moon, develops technologies for deep space exploration, and
                conducts cutting-edge research in aeronautics, Earth science,
                and astrophysics.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.08] bg-black/40 p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export { About };
