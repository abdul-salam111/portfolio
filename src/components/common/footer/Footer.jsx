import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logo.png";
import SocialMedia from "../socialMedia/SocialMedia";
import { RevealGroup, RevealItem } from "../../motion";

/* Hrefs are the real section ids rendered on the home page — the old
   `#home` / `#about` / `#process` targets matched nothing. */
const navItems = [
  { id: 1, name: "Home", href: "#introduction" },
  { id: 2, name: "About", href: "#profile" },
  { id: 3, name: "Process", href: "#work-process" },
  { id: 4, name: "Portfolio", href: "#portfolio" },
  { id: 5, name: "Blog", href: "#blog" },
  { id: 6, name: "Services", href: "#services" },
  { id: 7, name: "Contact", href: "#contact" },
];

const contactItems = [
  {
    id: "email",
    icon: faEnvelope,
    label: "abdulsalam.0302@gmail.com",
    href: "mailto:abdulsalam.0302@gmail.com",
  },
  {
    id: "phone",
    icon: faPhone,
    label: "+92 311 530 8116",
    href: "tel:+923115308116",
  },
  {
    id: "location",
    icon: faLocationDot,
    label: "Johar Town, Lahore, Pakistan",
  },
];

const columnHeading =
  "font-mono text-[0.6875rem] font-medium tracking-[0.2em] text-fg-faint uppercase";

const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-elev">
      {/* Oversized wordmark bleeding off the bottom edge — clipped here, so it
          can never widen the page. */}
      <p
        aria-hidden="true"
        className="text-fluid-6xl pointer-events-none absolute inset-x-0 -bottom-[0.18em] translate-y-[8%] text-center font-display font-semibold tracking-tight whitespace-nowrap text-fg/[0.03] select-none"
      >
        ABDUL SALAM
      </p>

      <div className="content relative z-10 pt-16 pb-9 md:pt-24">
        <RevealGroup className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <RevealItem className="md:col-span-5">
            <a href="#introduction" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Abdul Salam logo"
                className="size-10 rounded-xl sm:size-12"
              />
              <span className="text-fluid-xl font-display font-semibold tracking-tight text-fg">
                Abdul Salam
              </span>
            </a>

            <p className="text-fluid-sm mt-5 max-w-[44ch] text-fg-muted">
              Senior Flutter developer building polished cross-platform apps and
              the FastAPI backends behind them.
            </p>

            <SocialMedia className="mt-7" />
          </RevealItem>

          {/* Navigate */}
          <RevealItem className="md:col-span-3 md:col-start-7">
            <h2 className={columnHeading}>Navigate</h2>
            <nav aria-label="Footer">
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="text-fluid-sm group relative inline-block w-fit py-1 text-fg-muted hover:text-fg"
                    >
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </RevealItem>

          {/* Get in touch */}
          <RevealItem className="md:col-span-3 md:col-start-10">
            <h2 className={columnHeading}>Get in touch</h2>
            <ul className="mt-5 space-y-3.5">
              {contactItems.map((item) => {
                const body = (
                  <>
                    <FontAwesomeIcon
                      icon={item.icon}
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-brand"
                    />
                    <span className="break-words">{item.label}</span>
                  </>
                );

                return (
                  <li key={item.id} className="text-fluid-sm">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3 py-1 text-fg-muted hover:text-brand"
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="flex items-start gap-3 py-1 text-fg-muted">
                        {body}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </RevealItem>
        </RevealGroup>

        <div className="mt-14 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fluid-xs text-fg-faint">
            &copy; {copyrightYear} Abdul Salam. All rights reserved.
          </p>
          <p className="text-fluid-xs font-mono text-fg-faint">
            Built with React, Tailwind &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
