import { Link } from "react-router-dom";
import { TiltCard } from "../motion";

// `.chip` is `white-space: nowrap` and lives outside a cascade layer, so a
// Tailwind utility can't relax it — an inline style is the only override that
// keeps an unusually long category token inside the card.
const chipWrap = { maxWidth: "100%", whiteSpace: "normal", overflowWrap: "anywhere" };

// Hides the seam where the image meets the card body.
const scrim = {
  background: "linear-gradient(to top, var(--surface-solid) 6%, transparent 78%)",
};

const Projects = ({ data, featured = false }) => {
  // Admin-entered categories aren't guaranteed to use the exact " · " spacing
  // the bundled rows do, so split on the separator itself.
  const tags = String(data?.category ?? "")
    .split(/\s*·\s*/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);

  const title = data?.title ?? "Untitled project";
  const blurb = data?.about || data?.tagline;

  return (
    <TiltCard
      max={featured ? 3.5 : 5}
      scale={1.015}
      className="border-beam relative h-full rounded-[1.25rem] transition-shadow duration-300 hover:shadow-[var(--shadow-lifted)]"
    >
      {/* One link over the whole surface — nothing interactive is nested inside. */}
      <Link
        to={`/project/${data?.id}`}
        data-cursor="View"
        aria-label={`Open the ${title} case study`}
        className="panel group relative flex h-full flex-col overflow-hidden"
      >
        {/* The image, not the copy, absorbs the slack when the grid stretches a
            card to match a taller sibling — otherwise a project with a short
            blurb ends up with dead space under its text.
            `grow` rather than `flex-1`: flex-1 sets flex-basis to 0, which
            would throw away the aspect ratio and collapse the card to its
            content. This keeps the ratio as the base size and grows from it. */}
        <div
          className={`relative grow overflow-hidden ${
            featured ? "aspect-[16/10]" : "aspect-[3/2]"
          }`}
        >
          <img
            src={data?.image}
            alt={`${title} interface preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={scrim}
          />
        </div>

        <div className="flex shrink-0 flex-col p-5 sm:p-6">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span key={`${tag}-${i}`} className="chip" style={chipWrap}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3
            className={`font-display mt-4 break-words text-fg ${
              featured ? "text-fluid-2xl" : "text-fluid-xl"
            }`}
          >
            {title}
          </h3>

          {blurb && (
            <p className="mt-2 line-clamp-3 text-fluid-sm text-fg-muted">{blurb}</p>
          )}

          <div className="mt-auto flex items-center gap-2 border-t border-line pt-5 text-fluid-sm font-semibold text-brand">
            <span className="font-display">Case Study</span>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

export default Projects;
