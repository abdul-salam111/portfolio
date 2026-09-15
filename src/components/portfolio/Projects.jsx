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

  // Cards in a row stretch to a common height, so a project with a short blurb
  // used to leave a gap above the footer. The stack fills it with the thing
  // people actually scan a portfolio card for. Capped so the wide lead card
  // doesn't turn into a wall of chips.
  const stack = (Array.isArray(data?.techStack) ? data.techStack : []).filter(Boolean);
  const stackShown = stack.slice(0, featured ? 8 : 6);
  const stackRest = stack.length - stackShown.length;

  // The narrow card carries a much shorter image than the wide lead, so at
  // equal row height it had a hole between the blurb and the footer. Highlights
  // fill it with the strongest thing the project already has on record.
  const highlights = (Array.isArray(data?.features) ? data.features : [])
    .filter(Boolean)
    .slice(0, 3);

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
        <div
          className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
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

        <div className="flex flex-1 flex-col p-5 sm:p-6">
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
            <p className="mt-2 line-clamp-2 text-fluid-sm text-fg-muted">{blurb}</p>
          )}

          {highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-fluid-sm leading-snug text-fg-muted"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-[0.3em] shrink-0 text-brand"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="line-clamp-2">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* mt-auto on the group, not the footer, so the stack and the CTA
              settle together at the bottom and the remaining space reads as a
              deliberate gap under the intro rather than a hole above the rule. */}
          <div className="mt-auto">
            {stackShown.length > 0 && (
              <ul
                aria-label="Built with"
                className="mt-5 flex flex-wrap gap-1.5 pb-5"
              >
                {stackShown.map((item) => (
                  <li
                    key={item}
                    style={{ background: "var(--surface-veil)" }}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[0.625rem] leading-none tracking-[0.04em] text-fg-faint uppercase"
                  >
                    {item}
                  </li>
                ))}
                {stackRest > 0 && (
                  <li className="rounded-md px-2 py-1 font-mono text-[0.625rem] leading-none text-fg-faint">
                    +{stackRest}
                  </li>
                )}
              </ul>
            )}

            <div className="flex items-center gap-2 border-t border-line pt-5 text-fluid-sm font-semibold text-brand">
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
        </div>
      </Link>
    </TiltCard>
  );
};

export default Projects;
