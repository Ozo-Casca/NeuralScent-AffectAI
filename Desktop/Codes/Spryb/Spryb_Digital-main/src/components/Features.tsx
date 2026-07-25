import { motion } from "framer-motion";
import { features } from "../data/content";

const card = features.testimonials[0];

export default function Features() {
  return (
    <section id="our-work" className="py-4 md:py-12 bg-bg-secondary/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 mt-8 mb-4"
      >
        <h3 className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-medium tracking-[-0.02em]">
          {features.title.map((word, i) =>
            i === 1 ? (
              <span key={i} className="italic text-lime-accent">{word}</span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h3>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-row rounded-2xl border border-border bg-bg-primary w-full max-w-[600px] h-[160px] md:h-[220px] overflow-hidden"
          >
            <div className="w-[60px] md:w-[180px] flex-shrink-0 bg-bg-secondary/50 border-r border-border flex items-center justify-center overflow-hidden">
              {card.image ? (
                <img src={card.image} alt={card.name} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl md:text-4xl font-bold text-lime-accent font-mono tracking-wider">
                  {card.initials}
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between p-2 md:p-3">
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                {card.quote}
              </p>
              <div className="pt-2 border-t border-border">
                <p className="text-xs md:text-sm font-medium text-text-primary">
                  {card.name}
                </p>
                <p className="text-[11px] md:text-xs text-text-muted">{card.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
