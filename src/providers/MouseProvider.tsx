"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface MouseContextType {
  x: number;
  y: number;
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
}

const MouseContext = createContext<MouseContextType>({
  x: 0,
  y: 0,
  isHovering: false,
  setIsHovering: () => {},
});

function MouseProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(mouseRef.current);
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

  return (
    <MouseContext.Provider
      value={{ x: position.x, y: position.y, isHovering, setIsHovering }}
    >
      {children}
    </MouseContext.Provider>
  );
}

function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error("useMouse must be used within MouseProvider");
  return ctx;
}

export { MouseProvider, useMouse };
