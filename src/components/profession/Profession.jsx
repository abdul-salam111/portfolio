import ServiceShowcase from "./ServiceShowcase";
import { Magnetic, Reveal } from "../motion";

const stackBadges = [
  { label: "Flutter", tone: "bg-primary/15 ring-primary/30 text-primary" },
  { label: "React", tone: "bg-accent/15 ring-accent/30 text-accent" },
  { label: "Flask", tone: "bg-success/15 ring-success/30 text-success" },
];

const rolesData = [
  {
    id: 1,
    title: "Flutter App Development",
    shortTitle: "Flutter",
    description:
      "I build high-performance, cross-platform mobile apps for Android and iOS using Flutter and Dart — pixel-perfect UI, smooth 60fps animations, and clean, testable architecture from the first screen through store deployment. Every app ships with proper state management, offline support where it matters, and a release pipeline that doesn't depend on me being online.",
    tags: ["Flutter", "Dart", "BLoC"],
  },
  {
    id: 2,
    title: "Web Development with React",
    shortTitle: "React",
    description:
      "I build fast, responsive, component-driven web apps and dashboards with React, JavaScript and modern tooling — from marketing landing pages to full client portals with authentication, data tables, and real-time updates. Clean component boundaries and shared design tokens keep the UI consistent as the product grows.",
    tags: ["React", "JavaScript", "Redux"],
  },
  {
    id: 3,
    title: "Backend Development with Flask",
    shortTitle: "Flask",
    description:
      "I design and build production-ready REST APIs using Python and Flask — with JWT auth, database integration (PostgreSQL/SQLite), request validation, and clean, versioned endpoints that serve both mobile and web clients from one source of truth. Every API ships with proper error handling and is ready to scale beyond a single server.",
    tags: ["Python", "Flask", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Third-Party & API Integration",
    shortTitle: "API Integration",
    description:
      "I integrate payment gateways, Firebase services (Auth, Firestore, FCM, Storage), Google Maps, social logins, and any REST or GraphQL API — making sure data flows reliably between app, web and backend. From webhook handling to retry logic, I make sure a third-party outage never takes the whole product down with it.",
    tags: ["Firebase", "Stripe", "Google Maps"],
  },
];

const Profession = () => {
  return (
    <section
      id="services"
      className="section relative overflow-hidden bg-bg"
      // The sections before and after this one (About, Work Process) each
      // carry their own padding too, so the default padding here stacked
      // with both into visible gaps above and below.
      style={{ paddingBlock: "clamp(2rem, 4vw, 3.5rem)" }}
    >
      {/* Soft decorative glow behind the heading — purely atmospheric. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-[28rem] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-tint-strong), transparent)",
        }}
      />

      <div className="content relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <Reveal>
            <p className="eyebrow">SERVICES</p>
            <h2 className="section-title mt-5">
              What I <span className="text-gradient">do?</span>
            </h2>
            <p className="section-lead mt-6">
              I build complete, production-ready products across app and web —
              cross-platform mobile apps with Flutter, modern web apps with
              React, and fast, scalable APIs with Python and Flask behind both.
            </p>
            <p className="section-lead mt-4">
              From UI to database, third-party integrations to deployment — I
              handle the full stack so nothing gets lost between layers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic className="w-fit">
                <a href="#contact" className="btn btn-primary h-12 px-7">
                  Let&apos;s talk
                </a>
              </Magnetic>

              {/* Overlapping tech cluster — a quick, playful stack summary. */}
              <div className="flex items-center -space-x-3">
                {stackBadges.map((badge, i) => (
                  <span
                    key={badge.label}
                    title={badge.label}
                    style={{ zIndex: stackBadges.length - i }}
                    className={`chip glass-thin flex size-11 items-center justify-center rounded-full ring-1 font-mono text-[0.6rem] font-semibold uppercase tracking-tight transition-transform duration-300 ease-out-quint hover:-translate-y-1.5 hover:scale-110 ${badge.tone}`}
                  >
                    {badge.label.slice(0, 2)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex h-full min-w-0 flex-col">
          <ServiceShowcase roles={rolesData} />
        </Reveal>
      </div>
    </section>
  );
};

export default Profession;
