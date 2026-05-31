import Roles from "./Roles";

const rolesData = [
  {
    id: 1,
    title: "Flutter App Development",
    description:
      "I build high-performance, cross-platform mobile apps for Android and iOS using Flutter and Dart — pixel-perfect UI, smooth animations, and clean architecture from day one through store deployment.",
  },
  {
    id: 2,
    title: "Backend Development with FastAPI",
    description:
      "I design and build fast, production-ready REST APIs using Python and FastAPI — with JWT auth, database integration (PostgreSQL/SQLite), background tasks, and auto-generated OpenAPI docs.",
  },
  {
    id: 3,
    title: "Third-Party & API Integration",
    description:
      "I integrate payment gateways, Firebase services (Auth, Firestore, FCM, Storage), Google Maps, social logins, and any REST or GraphQL API — making sure data flows reliably between app and backend.",
  },
];

const Profession = () => {
  return (
    <div
      className="content grid md:grid-cols-2 max-xxl:px-4 xxl:px-2 py-10 md:py-15 lg:py-37.5"
      id="services"
    >
      <div className="flex flex-col justify-between h-fit md:pe-8 lg:pe-35.75 max-md:text-center my-auto">
        <p className="section-title max-md:text-center">What I do?</p>
        <div className="mt-6 text-[14px]">
          <p className="text-xs sm:text-lg font-normal text-soft-dark mb-4">
            I build complete, production-ready products — cross-platform mobile
            apps with Flutter on the front end and fast, scalable APIs with
            FastAPI on the back end.
          </p>
          <p className="text-xs sm:text-lg font-normal text-soft-dark">
            From UI to database, third-party integrations to deployment — I
            handle the full stack so nothing gets lost between layers.
          </p>
        </div>
        <a
          href="#contact"
          className="mt-5 md:mt-12.5 btn btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold max-md:mx-auto max-md:mb-5"
        >
          Say Hello!
        </a>
      </div>
      <div className="">
        {rolesData.map((role, index) => (
          <Roles role={role} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Profession;
