import { processImages } from "../assets/images";

const processData = [
  {
    id: 1,
    number: "01/04",
    title: "BRANDING",
    description:
      "\u201cBecause people remember brands, not businesses.\u201d",
    image: processImages.branding,
    items: [
      "Visual Identity: Crafting memorable identities that set your brand apart.",
      "Brand Voice: Creating a cohesive presence across every customer touchpoint.",
      "Market Positioning: Defining what makes your brand relevant, unique, and unforgettable.",
      "Brand Recall: Building trust and recall that keep your brand top of mind.",
    ],
  },
  {
    id: 2,
    number: "02/04",
    title: "SOCIAL MEDIA MARKETING",
    description:
      "\u201cYour audience is scrolling. Let's make sure they stop at your brand.\u201d",
    image: processImages.social,
    items: [
      "Creative Content: Eye-catching posts, reels, and campaigns people actually remember.",
      "Smart Targeting: Reach the right audience at the right time with data-driven strategies.",
      "Build Real Connections: Create conversations that turn into loyal customers.",
      "Results You Can Measure: More visibility. More engagement. More leads. More business.",
    ],
  },
  {
    id: 3,
    number: "03/04",
    title: "ONLINE REPUTATION MANAGEMENT",
    description:
      "\u201cYour brand's reputation speaks before you do.\u201d",
    image: processImages.reputation,
    items: [
      "Build Credibility: Showcase real customer experiences and success stories.",
      "Protect Your Image: Monitor reviews, respond strategically, and stay ahead of the conversation.",
      "Convert enquiries to customers: Reach out to the enquiries received on Social Media and convert them into actual business.",
      "Make Every Review Count: Turn detractors into brand advocates through Strategic Reputation Management.",
    ],
  },
  {
    id: 4,
    number: "04/04",
    title: "TECH DEVELOPMENT",
    description:
      "\u201cGreat ideas deserve great technology.\u201d",
    image: processImages.tech,
    items: [
      "Tech stack Agnostic: Choosing technology that fits your vision powered by the right tech stack.",
      "Smart Solutions: Websites and apps built for speed, performance, and seamless user experiences.",
      "Seamless Integrations: Connect CRMs, APIs, automations, and third-party platforms effortlessly.",
      "Built to Scale: Future-ready technology that grows with your business.",
    ],
  },
];

export default processData;
