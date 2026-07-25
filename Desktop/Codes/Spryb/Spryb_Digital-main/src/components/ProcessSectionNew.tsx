import { useRef, useState, useEffect, useContext, useCallback, memo } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import processData from "../data/processData";
import { LenisContext } from "../hooks/useLenis";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

const N = processData.length;
const DESKTOP_CARD_HEIGHT = 600;
const MOBILE_CARD_HEIGHT = 420;
const OVERLAP_RATIO = 0.98;
const ENTRY_START = 0.06;
const ENTRY_END = 0.92;
const entrySlice = (ENTRY_END - ENTRY_START) / (N - 1);
const HIDE_START = 0.92;
const HIDE_END = 1.0;

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || reduced) {
      if (reduced) setValue(target);
      return;
    }
    let start = 0;
    let raf: number;
    const duration = 400;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setValue(start);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced]);
  return value;
}

const DotItem = memo(function DotItem({
  scrollYProgress,
  index,
  reduced,
  onDotClick,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  reduced: boolean;
  onDotClick: (index: number) => void;
}) {
  let activeInputs: number[], activeOutputs: number[], doneInputs: number[], doneOutputs: number[];

  if (index === 0) {
    activeInputs = [ENTRY_START - 0.02, ENTRY_START, ENTRY_START + entrySlice - 0.02, ENTRY_START + entrySlice];
    activeOutputs = [0, 1, 1, 0];
    doneInputs = [ENTRY_START + entrySlice - 0.01, ENTRY_START + entrySlice];
    doneOutputs = [0, 1];
  } else if (index === N - 1) {
    const s = ENTRY_START + index * entrySlice;
    activeInputs = [s - 0.02, s, 1];
    activeOutputs = [0, 1, 1];
    doneInputs = [0.99, 1];
    doneOutputs = [0, 1];
  } else {
    const s = ENTRY_START + index * entrySlice;
    const e = s + entrySlice;
    activeInputs = [s - 0.02, s, e - 0.02, e];
    activeOutputs = [0, 1, 1, 0];
    doneInputs = [e - 0.01, e];
    doneOutputs = [0, 1];
  }

  const active = useTransform(scrollYProgress, activeInputs, activeOutputs);
  const done = useTransform(scrollYProgress, doneInputs, doneOutputs);

  return (
    <motion.button
      onClick={() => onDotClick(index)}
      className="relative flex items-center justify-center bg-transparent border-none outline-none w-[44px] h-[44px] cursor-pointer"
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={`Go to step ${index + 1}`}
    >
      <motion.div
        className="w-3 h-3 rounded-full absolute"
        style={{ backgroundColor: "#58F36B", opacity: done }}
      />
      {!reduced && (
        <motion.div
          className="w-3 h-3 rounded-full absolute"
          style={{ backgroundColor: "#58F36B", scale: active }}
        />
      )}
      <motion.div
        className="w-3 h-3 rounded-full absolute"
        style={{ border: "1.5px solid", borderColor: active, backgroundColor: "transparent" }}
      />
    </motion.button>
  );
});

const ProgressDots = memo(function ProgressDots({
  scrollYProgress,
  reduced,
  onDotClick,
}: {
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {processData.map((_, i) => (
        <DotItem key={i} scrollYProgress={scrollYProgress} index={i} reduced={reduced} onDotClick={onDotClick} />
      ))}
    </div>
  );
});

const ProcessCardInline = memo(function ProcessCardInline({
  card,
  index,
  isActive,
  reduced,
}: {
  card: (typeof processData)[0];
  index: number;
  isActive: MotionValue<number>;
  reduced: boolean;
}) {
  const [activeCard, setActiveCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const counterValue = useCountUp(index + 1, activeCard, reduced);

  useEffect(() => {
    setActiveCard(isActive.get() > 0.5);
    return isActive.on("change", (v) => setActiveCard(v > 0.5));
  }, [isActive]);

  const numberStr = `0${counterValue}/04`;

  return (
    <div
      ref={cardRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        style={{
          backgroundColor: "#04101f",
          borderRadius: 24,
          border: activeCard && !reduced
            ? "1.5px solid transparent"
            : "1px solid rgba(255,255,255,0.08)",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        className="p-5 md:p-10"
      >
        {activeCard && !reduced && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none process-gradient-border"
            style={{ zIndex: 0 }}
          />
        )}

        <div className="relative z-10">
          <motion.span
            className="text-xs md:text-sm font-mono tracking-wider block"
            style={{
              color: activeCard ? "#58F36B" : "#737373",
            }}
          >
            {numberStr}
          </motion.span>

          <div className="overflow-hidden mt-2 md:mt-3">
            <motion.h3
              className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight"
              initial={reduced ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              animate={
                activeCard
                  ? { clipPath: "inset(0 0% 0 0)" }
                  : reduced
                    ? { clipPath: "inset(0 0% 0 0)" }
                    : { clipPath: "inset(0 100% 0 0)" }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {card.title}
            </motion.h3>
          </div>

          <p className="text-neutral-400 leading-7 md:leading-8 mt-3 md:mt-[18px] max-w-lg text-sm md:text-lg italic">
            {card.description}
          </p>

          <ul className="mt-5 md:mt-7 space-y-2 md:space-y-3">
            {card.items.map((item, j) => (
              <motion.li
                key={item}
                className="text-neutral-200 flex items-center gap-2 md:gap-3 text-sm md:text-base"
                initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                animate={
                  activeCard
                    ? { opacity: 1, x: 0 }
                    : reduced
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -10 }
                }
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: j * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <span className="w-1 h-1 rounded-full bg-neutral-500 shrink-0" />
                <span className="font-semibold text-white">{item.split(": ")[0]}:</span>
                {item.includes(": ") && " " + item.split(": ").slice(1).join(": ")}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
});

const ImageContainer = memo(function ImageContainer({
  card,
  index,
  scrollYProgress,
  reduced,
}: {
  card: (typeof processData)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  let opacityInputs: number[], opacityOutputs: number[];

  if (index === 0) {
    opacityInputs = [0, ENTRY_START, ENTRY_START + entrySlice];
    opacityOutputs = [1, 1, 0];
  } else if (index === N - 1) {
    const s = ENTRY_START + (index - 1) * entrySlice;
    opacityInputs = [s, s + entrySlice];
    opacityOutputs = [0, 1];
  } else {
    const s = ENTRY_START + (index - 1) * entrySlice;
    const m = s + entrySlice;
    opacityInputs = [s, m, m, m + entrySlice];
    opacityOutputs = [0, 1, 1, 0];
  }

  const imageOpacity = useTransform(scrollYProgress, opacityInputs, opacityOutputs);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity: imageOpacity,
        y: reduced ? 0 : imageY,
      }}
    >
      <img src={card.image} alt={card.title} loading="lazy" width={600} height={600} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
    </motion.div>
  );
});

const CardContainer = memo(function CardContainer({
  card,
  index,
  scrollYProgress,
  CARD_HEIGHT,
  SLIVER,
  slideDistance,
  reduced,
}: {
  card: (typeof processData)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  CARD_HEIGHT: number;
  SLIVER: number;
  slideDistance: number;
  reduced: boolean;
}) {
  const rangeStart = ENTRY_START + (index - 1) * entrySlice;
  const rangeEnd = rangeStart + entrySlice;

  let cardYInputs: number[], cardYOutputs: number[];
  let cardZInputs: number[], cardZOutputs: number[];
  let cardScaleInputs: number[], cardScaleOutputs: number[];
  let cardOpacityInputs: number[], cardOpacityOutputs: number[];
  let isActiveInputs: number[], isActiveOutputs: number[];

  if (index === 0) {
    cardYInputs = [HIDE_START, HIDE_END]; cardYOutputs = [0, slideDistance];
    cardZInputs = [HIDE_START, HIDE_START + 0.001]; cardZOutputs = [0, -1];
    cardScaleInputs = [0, HIDE_START, HIDE_END]; cardScaleOutputs = [1, 0.88, 0.85];
    cardOpacityInputs = [HIDE_START, HIDE_END]; cardOpacityOutputs = [1, 0.5];
    isActiveInputs = [0, ENTRY_START, ENTRY_START + entrySlice * 0.5]; isActiveOutputs = [1, 1, 0];
  } else if (index === N - 1) {
    cardYInputs = [rangeStart, rangeEnd]; cardYOutputs = [slideDistance, 0];
    cardZInputs = [0, 1]; cardZOutputs = [100, 100];
    cardScaleInputs = [rangeStart, rangeEnd]; cardScaleOutputs = [1, 1];
    cardOpacityInputs = [rangeStart, rangeEnd]; cardOpacityOutputs = [0.7, 1];
    isActiveInputs = [rangeStart, rangeEnd]; isActiveOutputs = [0, 1];
  } else {
    cardYInputs = [rangeStart, rangeEnd, HIDE_START, HIDE_END]; cardYOutputs = [slideDistance, 0, 0, slideDistance];
    cardZInputs = [HIDE_START, HIDE_START + 0.001]; cardZOutputs = [index, -1];
    cardScaleInputs = [rangeStart, rangeEnd, HIDE_START, HIDE_END]; cardScaleOutputs = [1, 1, 0.88, 0.85];
    cardOpacityInputs = [rangeStart, rangeEnd, HIDE_START, HIDE_END]; cardOpacityOutputs = [0.7, 1, 1, 0.5];
    isActiveInputs = [rangeStart, rangeEnd, rangeEnd, rangeStart + 2 * entrySlice]; isActiveOutputs = [0, 1, 1, 0];
  }

  const cardY = useTransform(scrollYProgress, cardYInputs, cardYOutputs);
  const cardZ = useTransform(scrollYProgress, cardZInputs, cardZOutputs);
  const cardScale = useTransform(scrollYProgress, cardScaleInputs, cardScaleOutputs);
  const cardOpacity = useTransform(scrollYProgress, cardOpacityInputs, cardOpacityOutputs);
  const isActive = useTransform(scrollYProgress, isActiveInputs, isActiveOutputs);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: index * SLIVER,
        y: cardY,
        opacity: cardOpacity,
        zIndex: cardZ,
        height: CARD_HEIGHT,
        width: "100%",
        scale: reduced ? 1 : cardScale,
      }}
      transition={
        reduced ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18 }
      }
    >
      <ProcessCardInline card={card} index={index} isActive={isActive} reduced={reduced} />
    </motion.div>
  );
});

export default function ProcessSectionNew() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { lenis } = useContext(LenisContext);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const CARD_HEIGHT = isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT;
  const SLIVER = CARD_HEIGHT * (1 - OVERLAP_RATIO);
  const STACK_HEIGHT = CARD_HEIGHT + SLIVER * (N - 1);
  const slideDistance = isMobile ? 440 : 620;

  const handleDotClick = useCallback(
    (index: number) => {
      if (!ref.current) return;
      const sectionTop = ref.current.offsetTop;
      const sectionHeight = ref.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;
      const targetScroll = sectionTop + (index / (N - 1)) * scrollableHeight;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [lenis],
  );

  return (
    <section id="marketing" ref={ref} className="relative h-[600vh] bg-[#04101f]">
      <div className="sticky top-0 h-dvh overflow-hidden" style={{ willChange: "transform" }}>
        {processData.map((card, i) => (
          <ImageContainer key={card.id} card={card} index={i} scrollYProgress={scrollYProgress} reduced={reduced} />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center h-full">
          <div className="sticky top-20 md:top-32 self-start text-center md:text-left">
            <h2 className="text-3xl md:text-6xl font-semibold leading-tight text-white">
              Attention, Engagement, Revenue.
            </h2>
          </div>

          <div
            style={{
              height: STACK_HEIGHT,
              position: "relative",
              overflow: "hidden",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ProgressDots
              scrollYProgress={scrollYProgress}
              reduced={reduced}
              onDotClick={handleDotClick}
            />

            <div
              style={{ position: "relative", width: "100%", height: CARD_HEIGHT }}
            >
              {processData.map((card, i) => (
                <CardContainer
                  key={card.id}
                  card={card}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  CARD_HEIGHT={CARD_HEIGHT}
                  SLIVER={SLIVER}
                  slideDistance={slideDistance}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
