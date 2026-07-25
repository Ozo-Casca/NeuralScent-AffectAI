import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./animations/Reveal";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
const inputClass = "w-full bg-bg-secondary border border-border/60 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-lime-accent/50 transition-colors min-h-[44px]";

const CONFETTI_COLORS = ["#58F36B", "#54F06A", "#F3F34B", "#DDE25B", "#ffffff"];
const PARTICLE_COUNT = 30;

interface Particle {
  id: number;
  color: string;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  rotation: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    angle: (360 / PARTICLE_COUNT) * i + (Math.random() - 0.5) * 30,
    distance: 60 + Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 0.15,
    rotation: Math.random() * 720 - 360,
  }));
}

function Confetti() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.distance;
        const y = Math.sin(rad) * p.distance - 30;
        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0.3,
              rotate: p.rotation,
            }}
            transition={{
              duration: 1.0 + Math.random() * 0.4,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const key = target.name || target.id;
      const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.honeypot) return;
      setSending(true);
      setError("");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          keepalive: true,
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            subject: `New contact from ${formData.name}`,
            from_name: "Spryb Digital Website",
            replyto: formData.email,
          }),
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError("Network error. Please check your connection and try again.");
        }
      } finally {
        setSending(false);
      }
    },
    [formData],
  );

  return (
    <section id="contact" className="px-6 py-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <Reveal delay={0.1}>
          <div className="mb-10">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-medium tracking-[-0.02em]">
              Let's grow your <span className="italic text-lime-accent">IDEA!</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative p-8 rounded-2xl border border-lime-accent/30 bg-lime-accent/5 text-center max-w-xl mx-auto overflow-hidden"
              >
                <Confetti />
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                >
                  🎉
                </motion.div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-text-muted text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4 max-w-xl"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs text-text-muted block mb-1">
                      Full name <span className="text-lime-accent">*</span>
                    </label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs text-text-muted block mb-1">
                      Email <span className="text-lime-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs text-text-muted block mb-1">
                    Phone number <span className="text-lime-accent">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-xs text-text-muted block mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <input
                  type="text"
                  id="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 accent-lime-accent"
                  />
                  <span className="text-xs text-text-muted">
                    I consent to the processing of my data according to the privacy policy.
                  </span>
                </label>
                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={sending} className="w-full py-3.5 bg-lime-accent text-bg-primary rounded-xl font-medium text-sm hover:bg-lime-accent/90 transition-all disabled:opacity-50 min-h-[44px]">
                  {sending ? "Sending..." : "Send request →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
