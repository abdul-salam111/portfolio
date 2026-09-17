import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, animateScroll } from "react-scroll";
import logo from "../../../assets/logo.png";
import { useTheme } from "../../../theme/ThemeProvider";
import { Aurora, Magnetic, useHasScrolled, useMotionPrefs } from "../../motion";

const navItems = [
  { id: 1, name: "Home", url: "introduction" },
  { id: 2, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Portfolio", url: "portfolio" },
  { id: 5, name: "Blog", url: "blog" },
  { id: 6, name: "Services", url: "services" },
];

const scrollProps = { smooth: true, duration: 800, spy: true, offset: -120 };
const easeOut = [0.16, 1, 0.3, 1];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path strokeLinecap="round" d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 4.1 4.1M19.9 19.9l-1.5-1.5M18.4 5.6l1.5-1.5M4.1 19.9l1.5-1.5" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.4 14.3A8.6 8.6 0 0 1 9.7 3.6a8.6 8.6 0 1 0 10.7 10.7Z" />
  </svg>
);

/** Sun/moon cross-fade. The icon shown is the theme you are switching *to*. */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`glass relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full text-fg-muted hover:text-brand ${className}`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          className="grid place-items-center"
          initial={{ opacity: 0, rotate: -80, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 80, scale: 0.4 }}
          transition={{ duration: 0.26, ease: easeOut }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

/** Two bars that fold into an X — shared by the trigger and the overlay's close button. */
const MenuIcon = ({ open }) => {
  const bar = "absolute left-0 h-[1.6px] w-full rounded-full bg-current";
  const transition = { duration: 0.32, ease: easeOut };

  return (
    <span className="relative block h-[15px] w-[19px]" aria-hidden="true">
      <motion.span
        className={bar}
        style={{ top: 3 }}
        animate={open ? { y: 4.4, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className={bar}
        style={{ top: 11.8 }}
        animate={open ? { y: -4.4, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={transition}
      />
    </span>
  );
};

const NavBar = () => {
  const scrolled = useHasScrolled(40);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(navItems[0].url);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  // The overlay owns the viewport while it is up: no background scroll, Escape
  // closes, focus moves into the dialog and back to the trigger on exit, and
  // reaching lg (where the overlay has no trigger) dismisses it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e) => e.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onDesktop);
      trigger?.focus();
    };
  }, [open]);

  const shellTransition = reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };
  const pillTransition = reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 34, mass: 0.6 };

  const goToTop = () => {
    setOpen(false);
    animateScroll.scrollToTop({ duration: 700, smooth: "easeInOutQuart" });
  };

  const wordmark = (
    <>
      <img
        src={logo}
        alt="Abdul Salam"
        className="h-9 w-9 rounded-xl border border-line object-cover"
      />
      <span className="font-display text-fluid-lg font-semibold tracking-tight text-fg">
        Abdul Salam
      </span>
    </>
  );

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingInline: "clamp(0.75rem, 3vw, 2rem)" }}
      >
        <motion.div
          className="relative mx-auto"
          animate={{
            maxWidth: scrolled ? 1060 : 1320,
            marginTop: scrolled ? 14 : 0,
            paddingInline: scrolled ? 18 : 8,
            paddingBlock: scrolled ? 9 : 18,
          }}
          initial={false}
          transition={shellTransition}
        >
          {/* The pill itself: fades in rather than scaling, so the blur stays stable. */}
          <motion.div
            aria-hidden="true"
            className="glass glass-pill pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: "var(--shadow-lifted)" }}
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: easeOut }}
          />

          <div className="relative flex items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <motion.button
              type="button"
              onClick={goToTop}
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.24, ease: easeOut }}
              className="flex items-center gap-2.5 justify-self-start rounded-full"
            >
              {wordmark}
            </motion.button>

            <nav aria-label="Sections" className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.url;
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    href={`#${item.url}`}
                    {...scrollProps}
                    aria-current={isActive ? "true" : undefined}
                    onSetActive={() => setActive(item.url)}
                    className="relative cursor-pointer rounded-full px-4 py-2 text-fluid-sm font-medium"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-brand/25"
                        style={{ background: "var(--accent-tint)" }}
                        transition={pillTransition}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-2">
              <ThemeToggle />

              <Magnetic className="hidden sm:block">
                <Link
                  to="contact"
                  href="#contact"
                  smooth={true}
                  duration={800}
                  offset={-90}
                  className="btn btn-primary btn-sm md:btn-md cursor-pointer px-5"
                >
                  Let&apos;s talk
                </Link>
              </Magnetic>

              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full text-fg lg:hidden"
              >
                <MenuIcon open={open} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            // Frosted over the page rather than an opaque sheet, so the content
            // behind stays legible as context — the iOS sheet behaviour.
            className="glass-sheet fixed inset-0 z-60 overflow-hidden lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <Aurora />

            {/* Scrolls rather than clipping when the viewport is short (landscape phones). */}
            <div
              className="relative z-10 flex h-full flex-col overflow-y-auto"
              style={{ paddingInline: "clamp(1.25rem, 6vw, 2.5rem)" }}
            >
              <div className="flex items-center justify-between py-[18px]">
                <button
                  type="button"
                  onClick={goToTop}
                  className="flex items-center gap-2.5 rounded-full"
                >
                  {wordmark}
                </button>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="glass grid h-10 w-10 place-items-center rounded-full text-fg"
                  >
                    <MenuIcon open />
                  </button>
                </div>
              </div>

              <motion.nav
                aria-label="Sections"
                className="flex flex-1 flex-col justify-center gap-1 py-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.08 } },
                }}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.55, ease: easeOut },
                      },
                    }}
                  >
                    <Link
                      to={item.url}
                      href={`#${item.url}`}
                      {...scrollProps}
                      aria-current={active === item.url ? "true" : undefined}
                      onSetActive={() => setActive(item.url)}
                      onClick={() => setOpen(false)}
                      className="flex cursor-pointer items-baseline gap-4 py-1.5"
                    >
                      <span className="font-mono text-fluid-xs text-fg-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-fluid-3xl font-semibold tracking-tight ${
                          active === item.url ? "text-brand" : "text-fg"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="flex flex-col gap-3 border-t border-line py-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24, ease: easeOut }}
              >
                <span className="font-mono text-fluid-xs uppercase tracking-[0.22em] text-fg-faint">
                  Available for work
                </span>
                <Link
                  to="contact"
                  href="#contact"
                  smooth={true}
                  duration={800}
                  offset={-90}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary btn-md w-full cursor-pointer"
                >
                  Let&apos;s talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
