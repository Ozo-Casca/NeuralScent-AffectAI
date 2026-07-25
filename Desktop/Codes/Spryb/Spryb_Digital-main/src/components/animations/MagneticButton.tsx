import { motion, useAnimation } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";

export function MagneticButton({
  children,
  href,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      controls.start({ x: x * 0.4, y: y * 0.4, transition: { type: "spring", stiffness: 150, damping: 10 } });
    },
    [controls],
  );

  const handleLeave = useCallback(() => {
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } });
  }, [controls]);

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={controls}
      className="inline-block"
    >
      <Tag href={href} onClick={onClick} className={className} data-cursor>
        {children}
      </Tag>
    </motion.div>
  );
}
