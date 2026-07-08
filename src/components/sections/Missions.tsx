"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MISSIONS } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

function Missions() {
  return (
    <Section id="missions" className="bg-[#0B1220]/50">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-16 md:mb-20"
        >
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
            Featured Missions
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 tracking-tight">
            Pioneering
            <br />
            <span className="text-white/40">the Unknown</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {MISSIONS.map((mission) => (
            <motion.div key={mission.id} variants={cardVariants}>
              <Link href={`/missions/${mission.slug}`} className="block h-full">
                <Card className="h-full group" variant="glass" glowOnHover>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{mission.icon}</span>
                      <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-full border border-white/[0.06]">
                        {mission.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {mission.name}
                    </h3>

                    <p className="text-sm text-white/60 leading-relaxed flex-1">
                      {mission.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/[0.06]">
                      <span className="text-xs text-white/40 flex items-center gap-1.5 group-hover:text-blue-400/80 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                        Learn more
                        <HiArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

export { Missions };
