import Roles from "./Roles";
import { Magnetic, Reveal, RevealGroup, RevealItem } from "../motion";

const rolesData = [
  {
    id: 1,
    title: "Flutter App Development",
    description:
      "I build high-performance, cross-platform mobile apps for Android and iOS using Flutter and Dart — pixel-perfect UI, smooth animations, and clean architecture from day one through store deployment.",
  },
  {
    id: 2,
    title: "Web Development with React",
    description:
      "I build fast, responsive, component-driven web apps and dashboards with React, JavaScript and modern tooling — from landing pages to full client portals with clean, maintainable UI.",
  },
  {
    id: 3,
    title: "Backend Development with Flask",
    description:
      "I design and build production-ready REST APIs using Python and Flask — with JWT auth, database integration (PostgreSQL/SQLite), and clean, versioned endpoints that serve both mobile and web clients.",
  },
  {
    id: 4,
    title: "Third-Party & API Integration",
    description:
      "I integrate payment gateways, Firebase services (Auth, Firestore, FCM, Storage), Google Maps, social logins, and any REST or GraphQL API — making sure data flows reliably between app, web and backend.",
  },
];

const Profession = () => {
  return (
    <section id="services" className="section relative bg-bg">
      <div className="content grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <Reveal>
            <p className="eyebrow">SERVICES</p>
            <h2 className="section-title mt-5">What I do?</h2>
            <p className="section-lead mt-6">
              I build complete, production-ready products across app and web —
              cross-platform mobile apps with Flutter, modern web apps with
              React, and fast, scalable APIs with Python and Flask behind both.
            </p>
            <p className="section-lead mt-4">
              From UI to database, third-party integrations to deployment — I
              handle the full stack so nothing gets lost between layers.
            </p>
            <Magnetic className="mt-9 w-fit">
              <a href="#contact" className="btn btn-primary h-12 px-7">
                Let&apos;s talk
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <RevealGroup className="min-w-0">
          {rolesData.map((role, index) => (
            <RevealItem key={role.id}>
              <Roles
                role={role}
                index={index}
                isLast={index === rolesData.length - 1}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Profession;
