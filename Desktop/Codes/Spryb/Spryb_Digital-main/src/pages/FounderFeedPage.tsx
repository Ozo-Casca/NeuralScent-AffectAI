import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout";
import { Reveal } from "../components/animations/Reveal";

export default function FounderFeedPage() {
  return (
    <>
      <Helmet>
        <title>Founder Feed — Spryb Digital</title>
        <meta name="description" content="Insights and updates from Palash Goorha, Founder of Spryb Digital." />
        <meta property="og:title" content="Founder Feed — Spryb Digital" />
        <meta name="twitter:title" content="Founder Feed — Spryb Digital" />
      </Helmet>
      <Layout mainClass="pt-24 px-6">
        <section className="max-w-4xl mx-auto py-16 md:py-24">
          <Reveal>
            <span className="text-xs text-text-muted tracking-[0.2em] uppercase mb-4 block">
              [F] Founder Feed
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-medium tracking-[-0.03em] mb-8">
              Palash <span className="italic text-lime-accent">Goorha.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="elfsight-app-a73b02d7-4a60-484b-9398-dd7d48540e95" data-elfsight-app-lazy></div>
          </Reveal>
        </section>
      </Layout>
    </>
  );
}
