import { memo } from "react";
import ishvedLogo from "../assets/logos/ishved.webp";
import motherhoodLogo from "../assets/logos/motherhood.webp";
import muldharaLogo from "../assets/logos/muldhara.webp";
import nextgenLogo from "../assets/logos/nextgen.webp";
import starlinkLogo from "../assets/logos/starlink.webp";
import wooblyLogo from "../assets/logos/woobly.webp";
import novaIvfLogo from "../assets/logos/nova-ivf.webp";
import zadcarsLogo from "../assets/logos/zadcars-carrentals-logo.webp";

const logoData = [
  { src: ishvedLogo, alt: "Ishved", href: "https://mail.ishved.com/Home.html", mr: "mr-4 md:mr-8" },
  { src: motherhoodLogo, alt: "Motherhood", href: "https://www.motherhoodindia.com/" },
  { src: muldharaLogo, alt: "Muldhara", href: "https://muladhara.org.in/" },
  { src: nextgenLogo, alt: "NextGen", href: "https://nexgenagritech.ai/" },
  { src: starlinkLogo, alt: "Starlink", href: "https://starlinkworld.com/" },
  { src: wooblyLogo, alt: "Woobly", href: "https://mywoobly.com/" },
  { src: novaIvfLogo, alt: "Nova IVF Fertility", href: "https://www.novaivffertility.com/" },
  { src: zadcarsLogo, alt: "Zadcars Car Rentals", href: "https://www.zadcars.com/" },
];

const logoClasses: Record<string, string> = {
  "Zadcars Car Rentals":
    "w-full h-full object-contain scale-75 transition-all duration-300 hover:scale-[0.82] hover:drop-shadow-[0_0_12px_var(--color-lime-accent)] hover:brightness-110",
  Woobly:
    "w-full h-full object-contain transition-all duration-300 hover:scale-[1.1] hover:drop-shadow-[0_0_12px_var(--color-lime-accent)] hover:brightness-130",
};

const defaultImgClass =
  "w-full h-full object-contain transition-all duration-300 hover:scale-[1.1] hover:drop-shadow-[0_0_12px_var(--color-lime-accent)] hover:brightness-110";

const getImgClass = (alt: string) => logoClasses[alt] ?? defaultImgClass;

const LogoSet = memo(function LogoSet() {
  return (
    <div className="flex shrink-0 items-center">
      {logoData.map((logo) => (
        <a
          key={logo.alt}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-36 md:w-48 h-24 md:h-32 shrink-0 overflow-hidden ${logo.mr || "mr-12 md:mr-20"}`}
        >
          <img src={logo.src} alt={`${logo.alt} logo`} loading="lazy" width={192} height={128} className={getImgClass(logo.alt)} />
        </a>
      ))}
    </div>
  );
});

export default function LogoMarquee() {
  return (
    <div className="py-8 overflow-hidden">
      <div className="flex animate-marquee w-max">
        <LogoSet />
        <LogoSet />
      </div>
    </div>
  );
}
