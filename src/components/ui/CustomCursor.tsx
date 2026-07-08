"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useMouse } from "@/providers/MouseProvider";

function CustomCursor() {
  const { x, y, isHovering } = useMouse();
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0);
    setIsVisible(true);
  }, []);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };

  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  const ringX = useSpring(x, { damping: 30, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(y, { damping: 30, stiffness: 150, mass: 0.8 });

  if (isMobile.current) return null;
  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full border border-white/30"
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering
              ? "rgba(96, 165, 250, 0.6)"
              : "rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}

export { CustomCursor };
