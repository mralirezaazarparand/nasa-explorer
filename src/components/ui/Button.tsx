"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  href?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      onClick,
      disabled,
      type = "button",
      title,
      href,
      children,
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]";

    const variants = {
      primary:
        "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25",
      secondary:
        "border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm",
      ghost: "text-white/80 hover:text-white",
      outline:
        "border border-blue-500/30 text-blue-400 hover:bg-blue-500/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-6 py-3 text-base gap-2.5",
      lg: "px-8 py-4 text-lg gap-3",
    };

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    };

    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
          )}
          title={title}
        >
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        title={title}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...motionProps}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
