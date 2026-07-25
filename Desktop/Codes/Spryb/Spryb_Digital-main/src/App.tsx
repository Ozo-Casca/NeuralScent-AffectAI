import { lazy, Suspense, useEffect, useRef, useState, Component, type ReactNode } from "react";
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import Home from "./pages/Home";
import { CustomCursor } from "./components/animations/CustomCursor";
import { ScrollProgress } from "./components/animations/ScrollProgress";
import { LenisContext } from "./hooks/useLenis";

const FounderFeedPage = lazy(() => import("./pages/FounderFeedPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));

const lenisEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex items-center justify-center bg-[#04080f] text-white">
          <div className="text-center px-6">
            <h1 className="text-4xl font-semibold mb-4">Something went wrong</h1>
            <p className="text-neutral-400 mb-8">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3.5 bg-[#58F36B] text-[#04080f] font-semibold rounded-full hover:opacity-90 transition-opacity min-h-[44px]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#04080f] text-white">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-semibold mb-4">404</h1>
        <p className="text-neutral-400 mb-8">This page does not exist.</p>
        <Link
          to="/en"
          className="px-6 py-3.5 bg-[#58F36B] text-[#04080f] font-semibold rounded-full hover:opacity-90 transition-opacity inline-block min-h-[44px] flex items-center justify-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

function LenisProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const instance = new Lenis({
      duration: 0.7,
      easing: lenisEasing,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }

    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      instance.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>;
}

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <ErrorBoundary>
          <LenisProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-lime-accent focus:text-bg-primary focus:rounded-full focus:text-sm focus:font-medium"
            >
              Skip to main content
            </a>
            <CustomCursor />
            <ScrollProgress />
            <div id="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/en" replace />} />
                <Route path="/en" element={<Home />} />
                <Route path="/en/portfolio" element={
                  <ErrorBoundary>
                    <Suspense fallback={
                      <div className="min-h-dvh flex items-center justify-center bg-bg-primary">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-8 h-8 border-2 border-lime-accent border-t-transparent rounded-full animate-spin" />
                          <span className="text-text-muted text-sm">Loading...</span>
                        </div>
                      </div>
                    }>
                      <PortfolioPage />
                    </Suspense>
                  </ErrorBoundary>
                } />
                <Route
                  path="/en/founder-feed"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={
                        <div className="min-h-dvh flex items-center justify-center bg-bg-primary">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-lime-accent border-t-transparent rounded-full animate-spin" />
                            <span className="text-text-muted text-sm">Loading...</span>
                          </div>
                        </div>
                      }>
                        <FounderFeedPage />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </LenisProvider>
        </ErrorBoundary>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
