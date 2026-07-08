"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

function Card({
  children,
  className,
  variant = "glass",
  hover = true,
  glowOnHover = false,
  onClick,
}: CardProps) {

  const variants = {
    default: "bg-[#0B1220] border-white/[0.06]",
    glass: "bg-black/40 backdrop-blur-xl border-white/[0.08]",
    gradient:
      "bg-gradient-to-b from-white/[0.06] to-black/20 border-white/[0.08]",
  };

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-6 relative overflow-hidden",
        variants[variant],
        hover && "cursor-pointer",
        glowOnHover && "group",
        className
      )}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {glowOnHover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
        </div>
      )}
      {children}
    </motion.div>
  );
}

export { Card };
