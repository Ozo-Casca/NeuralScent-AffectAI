import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const { x, y, isHovering } = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isTouchDevice || !mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y, width: 24, height: 24, translateX: -12, translateY: -12 }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-full h-full rounded-full bg-lime-accent" />
    </motion.div>
  );
}
