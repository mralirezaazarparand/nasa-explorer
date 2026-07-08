"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animated?: boolean;
}

function Section({ children, className, id, animated = true }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.3]
  );
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [40, 0, 0, -40]);

  if (!animated) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-24 md:py-32", className)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("relative py-24 md:py-32", className)}
      style={{ opacity, y }}
    >
      {children}
    </motion.section>
  );
}

export { Section };
