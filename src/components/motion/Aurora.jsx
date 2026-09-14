import { useMotionPrefs } from "./useMotionPrefs";

const defaultBlobs = [
  { color: "var(--accent)",      size: "46rem", top: "-18%", left: "-10%", opacity: 0.3,  delay: "0s"  },
  { color: "var(--violet)",      size: "38rem", top: "24%",  left: "58%",  opacity: 0.22, delay: "-7s" },
  { color: "var(--accent-soft)", size: "32rem", top: "62%",  left: "6%",   opacity: 0.2,  delay: "-13s"},
];

/**
 * Slow-drifting gradient mesh behind a section. Purely decorative: it is
 * pointer-transparent, sits at z-0, and is removed entirely under
 * prefers-reduced-motion by the stylesheet.
 */
const Aurora = ({ blobs = defaultBlobs, grain = true, className = "" }) => {
  const { reduced } = useMotionPrefs();

  return (
    <div className={`aurora ${grain ? "grain" : ""} ${className}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <span
          key={i}
          className="aurora-blob"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            background: b.color,
            animation: reduced ? "none" : `aurora ${18 + i * 5}s ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Aurora;
