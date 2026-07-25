import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback, memo } from "react";
import { team } from "../data/content";
import { Reveal } from "./animations/Reveal";
import { useIsMobile } from "../hooks/useIsMobile";

const AVATAR_BASE_DESKTOP = 60;
const AVATAR_MAX_SCALE = 1.45;
const GAUSSIAN_SIGMA = 45;
const TOOLTIP_WIDTH = 340;
const TOOLTIP_HEIGHT = 380;
const TOOLTIP_GAP = 12;
const TOOLTIP_MARGIN = 12;

function getScale(mouseX: number, itemCenterX: number) {
  const dist = Math.abs(mouseX - itemCenterX);
  return 1 + (AVATAR_MAX_SCALE - 1) * Math.exp(-(dist * dist) / (2 * GAUSSIAN_SIGMA * GAUSSIAN_SIGMA));
}

interface TooltipPos { top: number; left: number }

function calcFixedPos(el: HTMLElement): TooltipPos {
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const vw = window.innerWidth;
  const tooltipWidth = Math.min(TOOLTIP_WIDTH, vw - TOOLTIP_MARGIN * 2);

  const rawLeft = centerX - tooltipWidth / 2;
  const left = Math.max(TOOLTIP_MARGIN, Math.min(rawLeft, vw - tooltipWidth - TOOLTIP_MARGIN));

  // Always show above the avatar, clamped so it never goes off the top edge
  const top = Math.max(TOOLTIP_MARGIN, rect.top - TOOLTIP_HEIGHT - TOOLTIP_GAP);

  return { top, left };
}

const MOBILE_AVATAR_SIZE = 44;
const DOCK_ITEM_WIDTH = 54;

function MobileScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const totalMembers = team.members.length;
  const dockTravel = (totalMembers - 1) * DOCK_ITEM_WIDTH;
  const dockX = useTransform(scrollYProgress, [0, 1], [0, -dockTravel]);

  const activeIndexRaw = useTransform(scrollYProgress, [0, 1], [0, totalMembers - 0.01]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(activeIndexRaw, "change", (v) => {
    setActiveIndex(Math.min(team.members.length - 1, Math.max(0, Math.round(v))));
  });

  const activeMember = team.members[activeIndex];
  const bgImage = activeMember.portrait || activeMember.image;

  return (
    <>
      <div className="px-5 pt-6 pb-4 text-center">
        <h2 className="text-[clamp(1.4rem,4vw,2rem)] leading-[1.05] font-medium tracking-[-0.03em] mb-1.5">
          {team.title.map((word, i) =>
            i === 0 ? (
              <span key={i} className="italic text-lime-accent">{word}{" "}</span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <p className="text-text-muted text-xs leading-relaxed max-w-sm mx-auto">
          {team.desc}
        </p>
      </div>

      <div ref={sectionRef} className="relative" style={{ minHeight: "120dvh" }}>
        <div className="sticky top-[14dvh] h-[70dvh] flex flex-col overflow-hidden" style={{ willChange: "transform" }}>
          {bgImage && (
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.4)" }}
            />
          )}

          <div className="relative z-10 px-5 pb-4 text-center mt-auto">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="text-center mb-3"
              >
                <h3 className="text-lg font-medium tracking-[0.06em] uppercase text-white">
                  {activeMember.name}
                </h3>
                <p className="text-xs text-lime-accent/80 tracking-wider mt-0.5">
                  {activeMember.role}
                </p>
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="flex items-center gap-2"
              style={{ x: dockX }}
            >
              {team.members.map((member, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={member.id}
                    className="rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      width: MOBILE_AVATAR_SIZE,
                      height: MOBILE_AVATAR_SIZE,
                      border: isActive ? "2px solid rgba(88,243,107,0.5)" : "1px solid rgba(255,255,255,0.15)",
                      boxShadow: isActive
                        ? "0 0 16px rgba(88,243,107,0.4)"
                        : "0 2px 8px rgba(0,0,0,0.3)",
                      transform: isActive ? "scale(1.25)" : "scale(1)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
                    }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-text-muted font-mono text-xs">
                        {member.initials}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

function AvatarTooltip({ member, pos }: { member: (typeof team.members)[0]; pos: TooltipPos }) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 340;
  const tooltipWidth = Math.min(TOOLTIP_WIDTH, vw - TOOLTIP_MARGIN * 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: tooltipWidth,
        maxWidth: `calc(100vw - ${TOOLTIP_MARGIN * 2}px)`,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative"
        style={{ height: TOOLTIP_HEIGHT }}
      >
        {(member.portrait || member.image) ? (
          <img
            src={member.portrait || member.image}
            alt={member.name}
            loading="eager"
            className={`absolute inset-0 w-full h-full ${member.portrait ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-5xl text-neutral-500 font-mono">
            {member.initials}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-medium tracking-[0.06em] uppercase text-white mb-1">
            {member.name}
          </h3>
          <p className="text-lime-accent/80 text-sm tracking-wider">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const DockAvatar = memo(function DockAvatar({
  member,
  scale,
  isHovered,
  index,
  avatarBase,
  onEnter,
}: {
  member: (typeof team.members)[0];
  scale: number;
  isHovered: boolean;
  index: number;
  avatarBase: number;
  onEnter: (index: number) => void;
}) {
  const size = avatarBase * scale;
  const yLift = (avatarBase * scale - avatarBase) / 2;

  return (
    <motion.div
      onMouseEnter={() => onEnter(index)}
      onFocus={() => onEnter(index)}
      className="relative flex flex-col items-center cursor-pointer"
      animate={{ width: size, height: size, y: -yLift }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-cursor
      tabIndex={0}
      role="button"
    >
      <motion.div
        className="w-full h-full rounded-full overflow-hidden relative"
        animate={{
          boxShadow: isHovered
            ? "0 4px 30px rgba(88,243,107,0.25), 0 0 0 2px rgba(88,243,107,0.3)"
            : "0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.3 }}
        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-neutral-800 flex items-center justify-center text-text-muted font-mono"
            style={{ fontSize: size * 0.25 }}
          >
            {member.initials}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null);
  const [scales, setScales] = useState<number[]>(team.members.map(() => 1));
  const isMobile = useIsMobile();
  const dockRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  const avatarBase = AVATAR_BASE_DESKTOP;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const dock = dockRef.current;
    if (!dock) return;
    if (!itemsRef.current) itemsRef.current = dock.querySelectorAll<HTMLElement>("[data-dock-item]");
    const items = itemsRef.current;
    const newScales = team.members.map((_, i) => {
      const el = items[i];
      if (!el) return 1;
      const rect = el.getBoundingClientRect();
      return getScale(e.clientX, rect.left + rect.width / 2);
    });
    setScales(newScales);
  }, []);

  const handleDesktopEnter = useCallback((index: number) => {
    const dock = dockRef.current;
    if (dock) {
      if (!itemsRef.current) itemsRef.current = dock.querySelectorAll<HTMLElement>("[data-dock-item]");
      const el = itemsRef.current[index];
      if (el) setTooltipPos(calcFixedPos(el));
    }
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    itemsRef.current = null;
    setScales(team.members.map(() => 1));
    setHoveredIndex(null);
    setTooltipPos(null);
  }, []);

  const hoveredMember = hoveredIndex !== null ? team.members[hoveredIndex] : null;

  return (
    <section id="team" className="px-6 py-4 md:py-6">
      <div className="max-w-7xl mx-auto bg-transparent md:bg-[#04101f] rounded-3xl overflow-visible p-4 md:p-5">
        {!isMobile && (
          <>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.03em] mb-2">
                {team.title.map((word, i) =>
                  i === 0 ? (
                    <span key={i} className="italic text-lime-accent">{word}{" "}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-text-muted text-sm md:text-base max-w-md mb-4">
                {team.desc}
              </p>
            </Reveal>
          </>
        )}

        {isMobile ? (
          <MobileScrollSection />
        ) : (
          <div
            ref={dockRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex flex-wrap justify-center items-end gap-[14px] py-2"
          >
            {team.members.map((member, i) => (
              <div key={member.id} data-dock-item>
                <DockAvatar
                  member={member}
                  scale={scales[i]}
                  isHovered={hoveredIndex === i}
                  index={i}
                  avatarBase={avatarBase}
                  onEnter={handleDesktopEnter}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single fixed-position tooltip — outside all containers */}
      <AnimatePresence>
        {hoveredMember && tooltipPos && (
          <AvatarTooltip key={hoveredMember.id} member={hoveredMember} pos={tooltipPos} />
        )}
      </AnimatePresence>
    </section>
  );
}
