import { Link } from "react-router-dom";
import { TiltCard } from "../motion";

const MonoBlog = ({ data }) => {
  // API rows can be partial, so the meta line is assembled from what exists.
  const meta = [
    data?.date,
    data?.readTime,
    data?.comments > 0 ? `${data.comments} comments` : null,
  ].filter(Boolean);

  return (
    <TiltCard className="relative h-full w-full rounded-[1.25rem]" max={5} scale={1.012}>
      <Link
        to={`/blog/${data?.id}`}
        data-cursor="Read"
        className="panel group relative flex h-full flex-col overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <img
            src={data?.image}
            alt={data?.title ? `Cover for ${data.title}` : "Blog cover"}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
          />
          {/* Fixed-dark scrim so the floated chip stays legible on pale covers. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
          />
          {data?.category && (
            // The chip sits on that always-dark scrim, so it keeps a fixed dark
            // fill and the lighter accent in both themes — `chip-accent`'s
            // `--accent` is a near-navy in light mode and would vanish here.
            <span className="chip absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] !border-brand/40 !bg-ink/70 !text-brand-soft">
              <span className="min-w-0 truncate">{data.category}</span>
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {meta.length > 0 && (
            <p className="font-mono text-fluid-xs text-fg-faint">{meta.join(" · ")}</p>
          )}

          <h3 className="font-display text-fluid-lg leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-brand">
            {data?.title}
          </h3>

          {data?.excerpt && (
            <p className="text-fluid-sm text-fg-muted line-clamp-2">{data.excerpt}</p>
          )}

          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-fluid-xs tracking-[0.08em] text-brand">
            Read article
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
};

export default MonoBlog;
