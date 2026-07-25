import { useState, useEffect } from "react";
import { useMotionValue } from "framer-motion";

export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const handleMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-cursor]"));
    };

    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseover", handleHover);
    };
  }, [x, y]);

  return { x, y, isHovering };
}
