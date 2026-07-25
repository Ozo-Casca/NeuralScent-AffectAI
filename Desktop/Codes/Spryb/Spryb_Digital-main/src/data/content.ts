import { teamImages } from "../assets/images";
import testimonialImage from "../assets/images/40b674d4-5571-45bc-99ec-40750262f6bf.webp";

export const hero = {
  title: ["We build Smart,", "Strategic &", "Digitally Scalable solutions."],
  subtitle:
    "We're not a run-of-the-mill agency. From an idea's inception to building distinctive brands, expanding their reach, and protecting their reputation, we create strategies that drive growth beyond campaigns.",
  cta: { primary: "Start a project →" },
};

export const team = {
  label: "",
  title: ["Our Aces"],
  desc: "Sip. Sketch. Strategize. Shine. We're a team that questions more, creates more, and celebrates more.",
  members: [
    { id: "01", name: "Palash Goorha", role: "Founder & CEO", initials: "PG", image: teamImages.palash.image, portrait: teamImages.palash.portrait },
    { id: "02", name: "Akash Awasthi", role: "Manager", initials: "AA", image: teamImages.akash.image, portrait: teamImages.akash.portrait },
    { id: "03", name: "Honey Kumar", role: "SEO Manager", initials: "HK", image: teamImages.honey.image, portrait: teamImages.honey.portrait },
    { id: "04", name: "Archit Tripathi", role: "Sr Social Media Executive", initials: "AT", image: teamImages.archit.image, portrait: teamImages.archit.portrait },
    { id: "05", name: "Rishabh Mishra", role: "Sr Social Media Executive", initials: "RM", image: teamImages.rishabh.image, portrait: teamImages.rishabh.portrait },
    { id: "06", name: "Pratik Singh", role: "Consultant — Corporate Communication & PR", initials: "PS", image: teamImages.pratik.image, portrait: teamImages.pratik.portrait },
    { id: "07", name: "Jaya Prasad", role: "Consultant — Advertising & Marketing Communication", initials: "JP", image: teamImages.jaya.image, portrait: teamImages.jaya.portrait },
    { id: "08", name: "Chanpreet Kaur", role: "Social Media Executive", initials: "CK", image: teamImages.chanpreet.image, portrait: teamImages.chanpreet.portrait },
    { id: "09", name: "Chhavi Maurya", role: "Intern, Founder's Office", initials: "CM", image: teamImages.chhavi.image, portrait: teamImages.chhavi.portrait },
    { id: "10", name: "Priyanshi Saxena", role: "Social Media Executive", initials: "PS", image: teamImages.priyanshi.image, portrait: teamImages.priyanshi.portrait },
  ],
};

export const features = {
  label: "Our Work",
  title: ["Trusted by", "innovative brands."],
  testimonials: [
    { initials: "GS", quote: "Working with Spryb Digital has been an outstanding experience. Their team developed a modern, user-friendly website and created a strong brand identity that perfectly reflects our vision. Their professionalism, creativity, and attention to detail make them a trusted partner for website development and branding solutions.", name: "Dr. Gunjan M. Sharma", role: "Professor and Senior Associate Dean, Muladhara", image: testimonialImage },
  ],
};


export const linkedinSection = {
  title: "Let's Connect on LinkedIn",
  description: "Follow us for the latest updates, insights, and behind-the-scenes looks.",
  url: "https://www.linkedin.com/company/spryb-digital",
  cta: "Follow us →",
};

export const contact = {
  label: "Contact",
  email: "hello@sprybdigital.com",
  phone: "+1 646 4664347",
  location: "New York, USA",
  availability: "Reply within 24h · Q3/Q4 available",
};

export const footer = {
  brand: "Spryb Digital",
  offices: {
    title: "Office",
    email: "hello@sprybdigital.com",
    phone: "+1 646 4664347",
    addresses: [
      { label: "USA Office", address: "14715 Northern 4J Flushing, NY 11354", mapUrl: "https://www.google.com/maps/search/?api=1&query=14715+Northern+4J+Flushing+NY+11354" },
      { label: "Gurgaon Office", address: "Plot no. 744, Phase-5, Udyog Vihar, Sec 19, Gurugram, Haryana - 122016", mapUrl: "https://www.google.com/maps/search/?api=1&query=Plot+no+744+Phase-5+Udyog+Vihar+Sec+19+Gurugram+Haryana+122016" },
      { label: "Lucknow Office", address: "C 401 Sahara Plaza, Patrakarpuram, Gomti Nagar, Lucknow", mapUrl: "https://www.google.com/maps/search/?api=1&query=C+401+Sahara+Plaza+Patrakarpuram+Gomti+Nagar+Lucknow" },
    ],
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Spryb in News", href: "https://indiaeducationdiary.in/entrepreneurs-gain-valuable-insights-at-ideate-labs-scaling-strategies-workshop/" },
      { label: "Privacy Policy", href: "/en" },
    ],
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/SprybDigital/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/spryb-digital" },
  ],
  copyright: "© 2026 Spryb Digital. All rights reserved",
};

export const portfolioPage = {
  title: ["What we've", "built."],
  subtitle: "Selected cases from 2024–2025. Every project with a clear goal, measured results, and a signature.",
  meta: [
    { label: "Projects", value: "6" },
    { label: "Disciplines", value: "Web · Branding · Software · Mobile" },
    { label: "Period", value: "2023 — 2026" },
    { label: "Location", value: "New York · Remote" },
  ],
  items: [
    { num: "01", title: "Die Lackier-Werkstatt", tags: ["Webseite", "Branding"], year: "2025" },
    { num: "02", title: "UnfallFix24", tags: ["Webseite", "Software"], year: "2025" },
    { num: "03", title: "Mousa Export", tags: ["Webseite"], year: "2025" },
    { num: "04", title: "Steak Club", tags: ["Webseite", "Branding"], year: "2024" },
    { num: "05", title: "Josh Jabs", tags: ["Webseite", "Branding"], year: "2024" },
    { num: "06", title: "Umzugsservice", tags: ["Webseite", "SEO"], year: "2024" },
  ],
};
