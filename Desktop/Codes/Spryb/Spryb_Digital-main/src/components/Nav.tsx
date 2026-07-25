import { useContext, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { logo } from "../assets/images";
import { LenisContext } from "../hooks/useLenis";

const navLinks = [
  { label: "Our Work", href: "#marketing" },
  { label: "Team", href: "#team" },
  { label: "Connect", href: "#lets-connect" },
];

const PADDING = 80;

export default function Nav() {
  const { scrollY } = useScroll();
  const { lenis } = useContext(LenisContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.95]);
  const backdropBlur = useTransform(scrollY, (v) => `blur(${Math.min(v / 10, 12)}px)`);
  const backgroundColor = useTransform(bgOpacity, (v) => `rgba(4,16,31,${v})`);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const targetScroll =
      rect.height > vh
        ? window.scrollY + rect.top - PADDING
        : window.scrollY + rect.top - (vh - PADDING * 2 - rect.height) / 2;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [lenis]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <motion.a
          href="/#/en"
          initial={{ opacity: 0, y: -30, scale: 0.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 80, damping: 12, mass: 0.8 }}
        >
          <motion.img
            src={logo}
            alt="Spryb Digital"
            className="h-14 md:h-18 w-auto"
            initial={{ filter: "drop-shadow(0 0 20px rgba(88,243,107,0.8))" }}
            animate={{ filter: "drop-shadow(0 0 0px rgba(88,243,107,0))" }}
            transition={{ duration: 2.0, delay: 0.5, ease: "easeOut" }}
          />
        </motion.a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-text-muted hover:text-lime-accent transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative w-11 h-11 flex items-center justify-center"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <motion.span
              className="block h-0.5 bg-text-primary origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 bg-text-primary"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-0.5 bg-text-primary origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-border/30"
            style={{ backgroundColor: "rgba(4,16,31,0.97)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="text-left text-base text-text-muted hover:text-lime-accent transition-colors duration-200 cursor-pointer py-3 min-h-[44px] flex items-center"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
