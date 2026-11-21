import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Magnetic } from "../../motion";

const WHATSAPP_NUMBER = "923115308116";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const RADIUS = 23;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v));

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 14 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed right-4 bottom-6 z-40 sm:right-8 sm:bottom-10"
    >
      <Magnetic strength={0.25}>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          aria-label="Chat on WhatsApp"
          className="glass group relative grid size-12 cursor-pointer place-items-center rounded-full sm:size-14"
          style={{ boxShadow: "var(--shadow-ambient)" }}
        >
          {/* Reading progress, drawn from 12 o'clock by the -90° rotation. */}
          <svg
            viewBox="0 0 52 52"
            aria-hidden="true"
            className="absolute inset-0 size-full -rotate-90"
          >
            {/* Not --lg-edge: the glass rim brightens to the accent on hover,
                and the track would inherit it and swallow the progress arc. */}
            <circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="26"
              cy="26"
              r={RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="relative size-5 transition-transform duration-200 group-hover:scale-110 sm:size-6"
          >
            <circle cx="16" cy="16" r="16" fill="#25D366" />
            <path
              fill="#fff"
              d="M23.47 8.52A10.26 10.26 0 0 0 16.02 5.3c-5.67 0-10.28 4.6-10.28 10.27 0 1.81.48 3.58 1.38 5.14L5.65 26.7l6.15-1.61a10.3 10.3 0 0 0 4.22.9h.01c5.67 0 10.28-4.61 10.28-10.28a10.2 10.2 0 0 0-3-7.19Zm-7.45 15.8h-.01a8.54 8.54 0 0 1-4.35-1.19l-.31-.19-3.65.96.97-3.56-.2-.36a8.5 8.5 0 0 1-1.3-4.51c0-4.71 3.84-8.55 8.56-8.55a8.5 8.5 0 0 1 6.05 2.51 8.47 8.47 0 0 1 2.5 6.05c0 4.71-3.84 8.55-8.26 8.55Zm4.69-6.4c-.26-.13-1.52-.75-1.75-.84-.24-.09-.41-.13-.58.13-.17.26-.66.84-.81 1-.15.17-.3.19-.56.07-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.21-.5-.42-.44-.58-.44h-.5c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.52-.62 1.74-1.23.21-.6.21-1.11.15-1.22-.07-.11-.24-.17-.5-.3Z"
            />
          </svg>
        </a>
      </Magnetic>
    </motion.div>
  );
};

export default ScrollToTop;
