import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { portfolioPage } from "../data/content";
import { MagneticButton } from "../components/animations/MagneticButton";
import { Reveal } from "../components/animations/Reveal";

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio — Spryb Digital</title>
        <meta name="description" content="Selected work from 2024–2025. Every project with a clear goal, measured results, and a signature." />
        <meta property="og:title" content="Portfolio — Spryb Digital" />
        <meta name="twitter:title" content="Portfolio — Spryb Digital" />
      </Helmet>
      <Layout mainClass="pt-24 px-6">
        <section className="max-w-7xl mx-auto py-16 md:py-24">
          <Reveal>
            <span className="text-xs text-text-muted tracking-[0.2em] uppercase mb-4 block">
              [P] Portfolio · Selected Work
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-medium tracking-[-0.03em] mb-6">
              {portfolioPage.title.map((word, i) =>
                i === 1 ? (
                  <span key={i} className="italic text-lime-accent">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-text-muted text-sm max-w-xl mb-10 leading-relaxed">
              {portfolioPage.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-6 mb-16">
              {portfolioPage.meta.map((m) => (
                <div key={m.label}>
                  <span className="text-2xl font-medium">{m.value}</span>
                  <span className="text-text-muted text-xs ml-2 block">{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="space-y-3">
            {portfolioPage.items.map((item, i) => (
              <motion.a
                key={item.num}
                href="#"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center justify-between py-4 px-6 rounded-2xl border border-border/0 hover:border-border/60 hover:bg-bg-secondary/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="text-text-muted text-sm w-8">{item.num}</span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase">
                    <span className="group-hover:text-lime-accent transition-colors duration-300">
                      {item.title}
                    </span>
                  </h3>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-text-muted border border-border rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-text-muted text-sm">{item.year}</span>
                  <span className="text-lime-accent opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                    ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-24 text-center">
              <h2 className="text-[clamp(1.5rem,4vw,3rem)] leading-[1.1] font-medium mb-4">
                Ready for <span className="italic text-lime-accent">your own project?</span>
              </h2>
              <p className="text-text-muted text-sm mb-6">
                We take four projects per quarter. Write us briefly — we'll reply within 24 hours.
              </p>
              <MagneticButton href="/#/en#contact" className="inline-block px-6 py-3.5 bg-lime-accent text-bg-primary rounded-full font-medium text-sm hover:bg-lime-accent/90 transition-all min-h-[44px]">
                Start a project →
              </MagneticButton>
            </div>
          </Reveal>
        </section>
      </Layout>
    </>
  );
}
