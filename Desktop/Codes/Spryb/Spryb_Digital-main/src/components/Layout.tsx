import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { PageTransition } from "./animations/PageTransition";

export default function Layout({ children, mainClass = "" }: { children: ReactNode; mainClass?: string }) {
  return (
    <PageTransition>
      <Nav />
      <main id="main-content" className={mainClass}>
        {children}
      </main>
      <Footer />
    </PageTransition>
  );
}
