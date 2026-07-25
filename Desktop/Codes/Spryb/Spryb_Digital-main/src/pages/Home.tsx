import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ProcessSection from "../components/ProcessSectionNew";
import LogoMarquee from "../components/LogoMarquee";
import TeamSection from "../components/TeamSection";
import Features from "../components/Features";
import Contact from "../components/Contact";
import LetsConnect from "../components/LetsConnect";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ProcessSection />
      <LogoMarquee />
      <TeamSection />
      <Features />
      <Contact />
      <LetsConnect />
    </Layout>
  );
}
