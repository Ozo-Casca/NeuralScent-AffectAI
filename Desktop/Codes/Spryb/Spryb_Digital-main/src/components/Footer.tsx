import { motion } from "framer-motion";
import { useState } from "react";
import { footer } from "../data/content";
import { logo } from "../assets/images";

const linkHover = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const MARQUEE_COUNT = 12;

const marqueeItems = Array.from({ length: MARQUEE_COUNT }).map((_, i) => i);

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border/50"
    >
      {/* Marquee Banner */}
      <div className="overflow-hidden py-8 border-b border-border/30 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {marqueeItems.map((i) => (
            <h4
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{ fontFamily: "Inter, sans-serif" }}
              className={`text-4xl md:text-6xl font-bold mx-8 select-none whitespace-nowrap transition-all duration-200 ${
                activeIndex === i ? "marquee-glow-active" : "text-text-muted/20"
              }`}
            >
              Spryb Digital
            </h4>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_0.5fr] gap-10">
          {/* Column 1: Logo */}
          <div>
            <img src={logo} alt="Spryb Digital" loading="lazy" className="h-16 w-auto mb-4" />
          </div>

          {/* Column 2: Office Info */}
          <div>
            <h4 className="text-sm text-text-muted tracking-wider uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {footer.offices.title}
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <a href={`mailto:${footer.offices.email}`} className="hover:text-lime-accent transition-colors">
                  {footer.offices.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.offices.phone}`} className="hover:text-lime-accent transition-colors">
                  {footer.offices.phone}
                </a>
              </li>
            </ul>
            <div className="mt-4 space-y-3 text-base text-text-muted leading-relaxed">
              {footer.offices.addresses.map((office) => (
                <p key={office.label} className="group">
                  <span className="text-text-primary font-medium">{office.label}</span>:{" "}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-lime-accent transition-colors relative inline-block"
                  >
                    {office.address}
                    <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-lime-accent align-middle">
                      [map]
                    </span>
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm text-text-muted tracking-wider uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {footer.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {footer.quickLinks.links.map((link) => (
                <motion.li
                  key={link.label}
                  initial="rest"
                  whileHover="hover"
                  className="text-base"
                >
                  <a
                    href={link.href}
                    className="hover:text-lime-accent transition-colors inline-block"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <motion.span variants={linkHover}>
                      {link.label}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 4: Empty */}
          <div />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-8 border-t border-border/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">{footer.copyright}</p>
          <div className="flex gap-4 sm:gap-6 text-base">
            {footer.social.filter((s) => s.label !== "LinkedIn").map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-lime-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
