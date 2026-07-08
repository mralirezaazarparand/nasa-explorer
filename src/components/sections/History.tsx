"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { MILESTONES } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
};

function History() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="history" className="bg-[#030712]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-16 md:mb-20"
        >
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
            Timeline
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 tracking-tight">
            A Legacy of
            <br />
            <span className="text-white/40">Discovery</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-blue-500/50 via-blue-400/20 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative space-y-16 md:space-y-24"
          >
            {MILESTONES.slice(0, 5).map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start gap-6 md:gap-12",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "flex-1",
                      isLeft ? "md:text-right" : "md:text-left"
                    )}
                  >
                    <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/10 select-none block leading-none mb-2">
                      {milestone.year}
                    </span>
                  </div>

                  <div className="relative flex-shrink-0 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#030712] shadow-lg shadow-blue-500/25"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: easing,
                      }}
                    />
                  </div>

                  <div className="flex-1 pb-8">
                    <span className="text-sm font-medium text-blue-400/80">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed max-w-md">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group"
          >
            View full timeline
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

export { History };
