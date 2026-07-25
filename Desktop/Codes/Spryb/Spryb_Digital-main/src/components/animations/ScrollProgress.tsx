import { motion } from "framer-motion";
import { useScrollProgress } from "../../hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left bg-lime-accent"
      style={{ scaleX: progress }}
    />
  );
}
