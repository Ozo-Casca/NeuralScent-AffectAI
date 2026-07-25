import { motion } from "framer-motion";
import { hero } from "../data/content";
import { MagneticButton } from "./animations/MagneticButton";
import heroVideo from "../assets/2b473ba8fa5e4657bcc75485e18b25b0.mp4";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 60, rotateX: -30, scale: 0.8, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 80, damping: 12, mass: 0.8 },
  },
};

const accentWords = ["Smart,", "Strategic", "Scalable"];

const gradientPositions = [
  "20% 30%",
  "80% 60%",
  "40% 80%",
  "20% 30%",
];

export default function Hero() {
  return (
    <section className="min-h-dvh flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(600px circle at 20% 30%, rgba(88,243,107,0.08), transparent 80%)",
        }}
        animate={{
          backgroundPosition: gradientPositions.map((p) => p),
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] font-medium tracking-[-0.03em] mb-6 max-w-5xl"
        >
          {hero.title.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  variants={wordItem}
                  className="inline-block mr-[0.15em]"
                >
                  <span className={accentWords.some(w => word.startsWith(w)) ? "italic text-lime-accent drop-shadow-[0_0_12px_rgba(88,243,107,0.6)]" : ""}>{word}</span>
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <p
          className="text-text-muted text-lg md:text-xl max-w-2xl mb-6 leading-relaxed"
        >
          {hero.subtitle.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
            >{word}</motion.span>
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-wrap gap-4 items-center mb-4 md:mb-8"
        >
          <MagneticButton href="#contact" className="px-6 py-3.5 bg-lime-accent text-bg-primary rounded-full font-medium text-sm hover:bg-lime-accent/90 transition-colors min-h-[44px] flex items-center">
            {hero.cta.primary}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
