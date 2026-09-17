import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   Liquid glass — the refraction half of the material in index.css
   ═══════════════════════════════════════════════════════════════════════════

   A blur is not glass. What makes a pane read as glass is that it *bends* what
   is behind it, hardest at the rim where the surface curves away, and that the
   bend splits the colour channels a little on the way through. CSS has no
   primitive for that, but `backdrop-filter` accepts an SVG filter, and
   `feDisplacementMap` will happily push the backdrop around using an image as
   the offset field. This component ships that field.

   The map is read one channel per axis: R drives the horizontal offset, G the
   vertical, and 128 is "don't move". So each map is a flat mid-grey field with
   an eased ramp inside a band along each edge — the middle of a pane stays put
   and only the rim bends. The two axes are built as separate one-channel
   images and screened together in the filter, which avoids relying on
   `mix-blend-mode` inside a data URI.

   Only Chromium honours a filter reference inside `backdrop-filter`. WebKit
   parses it and drops it; Gecko parses it and paints nothing. So this is a
   progressive enhancement: the probe below sets `data-liquid-glass` on <html>
   only where the bend will actually land, and index.css is written so the
   unenhanced pane is a finished material rather than a broken one.
   ═══════════════════════════════════════════════════════════════════════════ */

const svgUrl = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const hex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");

/* Sample points across the band, as a fraction of its width. */
const STEPS = [0, 0.25, 0.5, 0.75, 1];

/* Quadratic ease-out from the edge inwards: bend = 127·(1 − t)². The slope
   reaches zero exactly where the band ends, so the ramp meets the flat middle
   without a crease — a linear ramp leaves a visible seam ringing the pane. */
const bendAt = (t) => 127 * (1 - t) ** 2;

/**
 * One axis of the displacement field, as a data-URI SVG.
 *
 * `band` is the share of the pane each edge ramp occupies, so the rim scales
 * with the element instead of being pinned to a pixel width.
 */
const axisMap = (axis, band) => {
  const paint = (value) => (axis === "x" ? `#${hex(value)}0000` : `#00${hex(value)}00`);

  const stops = [
    // Leading edge: 255 at the very edge, easing down to the 128 no-op.
    ...STEPS.map((t) => [t * band, paint(128 + bendAt(t))]),
    // Trailing edge, mirrored — 128 back up at the band, 1 at the edge.
    ...[...STEPS].reverse().map((t) => [1 - t * band, paint(128 - bendAt(t))]),
  ];

  const vector = axis === "x" ? 'x1="0" y1="0" x2="1" y2="0"' : 'x1="0" y1="0" x2="0" y2="1"';

  return svgUrl(
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
      `<linearGradient id="r" ${vector}>` +
      stops
        .map(([offset, color]) => `<stop offset="${offset.toFixed(4)}" stop-color="${color}"/>`)
        .join("") +
      "</linearGradient>" +
      '<rect width="256" height="256" fill="url(#r)"/>' +
      "</svg>"
  );
};

/*
 * `scale` is the peak displacement in CSS pixels, so it is tuned per size
 * class rather than shared: ±16px of bend reads as a thick bevel on a 1200px
 * panel and as a funhouse mirror on a 40px button.
 *
 * `aberration` spreads the three channels around that peak. Real glass
 * disperses, and the faint colour fringe along the rim is most of why the
 * enhanced pane looks like a material instead of a filter.
 */
const LENSES = [
  // Controls, chips, the cursor. A wide band on a small pane, because at 40px
  // across there is no room for a subtle one.
  { id: "lg-lens-sm", band: 0.28, scale: 8, aberration: 0.22 },
  // Panels and sheets. Dispersion is skipped: three displacement passes over a
  // surface this size is the one place the cost shows up on scroll.
  { id: "lg-lens-lg", band: 0.1, scale: 26, aberration: 0 },
];

/* Keeps one channel of a displaced pass and drops the rest, so the three
   passes can be screened back together into a single dispersed image. */
const CHANNEL_MATRIX = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
};

const Displace = ({ scale, channel }) => (
  <>
    <feDisplacementMap
      in="SourceGraphic"
      in2="map"
      scale={scale}
      xChannelSelector="R"
      yChannelSelector="G"
      result={`bent-${channel}`}
    />
    <feColorMatrix
      in={`bent-${channel}`}
      type="matrix"
      values={CHANNEL_MATRIX[channel]}
      result={`only-${channel}`}
    />
  </>
);

const Lens = ({ id, band, scale, aberration }) => (
  /* The filter region is pinned to the border box (`objectBoundingBox`, 0 0
     1 1) so the map, which has no intrinsic placement of its own, lands
     exactly on the pane. That also means the bend may only ever sample
     *inwards*: there is no backdrop outside the region to pull from, so the
     ramps are signed to fold the surroundings toward the middle. */
  <filter
    id={id}
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="1"
    height="1"
    colorInterpolationFilters="sRGB"
  >
    <feImage href={axisMap("x", band)} preserveAspectRatio="none" result="map-x" />
    <feImage href={axisMap("y", band)} preserveAspectRatio="none" result="map-y" />
    {/* One channel each, so `screen` just lays them side by side into RG. */}
    <feBlend in="map-x" in2="map-y" mode="screen" result="map" />

    {aberration ? (
      <>
        <Displace scale={scale * (1 + aberration)} channel="r" />
        <Displace scale={scale} channel="g" />
        <Displace scale={scale * (1 - aberration)} channel="b" />
        <feBlend in="only-r" in2="only-g" mode="screen" result="rg" />
        <feBlend in="rg" in2="only-b" mode="screen" />
      </>
    ) : (
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    )}
  </filter>
);

/**
 * True only where an SVG filter inside `backdrop-filter` actually paints.
 *
 * `CSS.supports` is not enough on its own — Gecko reports the declaration as
 * valid and then renders an untouched backdrop — so the engine check stands in
 * for a capability there is no honest way to feature-detect.
 */
const lensSupported = () => {
  if (typeof window === "undefined" || !window.CSS?.supports) return false;
  if (!CSS.supports("backdrop-filter", "blur(1px)")) return false;
  if (!CSS.supports("backdrop-filter", "url('#lens')")) return false;

  const ua = navigator.userAgent;
  if (/\bFirefox\//.test(ua)) return false;
  // Safari and every iOS browser, all of which are WebKit underneath.
  // No \b before the brand: headless builds report "HeadlessChrome/".
  if (/\bAppleWebKit\//.test(ua) && !/(Chrome|Chromium|Edg)\//.test(ua)) return false;

  return true;
};

/* A fragment-only `url(#id)` resolves against the stylesheet that holds it, and
   index.css ships as a separate file in a production build — which would point
   these at `/index.css#lg-lens-sm`. Injecting the declarations into the
   document instead is what keeps the reference pointing at the <defs> below. */
const LENS_RULES = `
[data-liquid-glass] .glass,
[data-liquid-glass] .glass-thin,
[data-liquid-glass] .chip {
  -webkit-backdrop-filter: blur(var(--lg-blur)) var(--lg-adjust) url(#lg-lens-sm);
  backdrop-filter: blur(var(--lg-blur)) var(--lg-adjust) url(#lg-lens-sm);
}
/* Refraction on its own, for things that carry their own colour and only want
   the bend — the cursor ring. */
[data-liquid-glass] .glass-lens {
  -webkit-backdrop-filter: blur(var(--lg-blur)) url(#lg-lens-sm);
  backdrop-filter: blur(var(--lg-blur)) url(#lg-lens-sm);
}
[data-liquid-glass] .glass-panel,
[data-liquid-glass] .glass-sheet {
  -webkit-backdrop-filter: blur(var(--lg-blur)) var(--lg-adjust) url(#lg-lens-lg);
  backdrop-filter: blur(var(--lg-blur)) var(--lg-adjust) url(#lg-lens-lg);
}
@media (prefers-reduced-transparency: reduce) {
  [data-liquid-glass] .glass,
  [data-liquid-glass] .glass-thin,
  [data-liquid-glass] .chip,
  [data-liquid-glass] .glass-lens,
  [data-liquid-glass] .glass-panel,
  [data-liquid-glass] .glass-sheet {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}`;

/**
 * Mounts the lens filters, turns them on where they work, and keeps every
 * pane's specular highlight aimed at the same light.
 *
 * Render once, near the root of a layout.
 */
const LiquidGlass = () => {
  useEffect(() => {
    if (!lensSupported()) return;

    const root = document.documentElement;
    const style = document.createElement("style");
    style.dataset.liquidGlass = "lens";
    style.textContent = LENS_RULES;
    document.head.appendChild(style);
    root.dataset.liquidGlass = "on";

    return () => {
      style.remove();
      delete root.dataset.liquidGlass;
    };
  }, []);

  /* The highlight is a conic gradient rotated by `--lg-angle`, and the light
     is shared by the whole page: one angle on <html> means every pane catches
     it from the same side, which is the thing that sells them as panes of one
     material rather than a set of unrelated glows. Pointer-driven, because a
     highlight that never moves is just a painted-on border. */
  useEffect(() => {
    const canTrack =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTrack) return;

    const root = document.documentElement;
    let frame = 0;

    const onMove = (event) => {
      if (frame) return;
      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const dx = clientX - window.innerWidth / 2;
        const dy = clientY - window.innerHeight / 2;
        // conic-gradient measures from 12 o'clock, clockwise.
        const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
        root.style.setProperty("--lg-angle", `${angle.toFixed(1)}deg`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--lg-angle");
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      /* Not `display: none` — a hidden subtree stops being a valid filter
         reference in some engines. Zero-sized and out of flow is safe. */
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {LENSES.map((lens) => (
          <Lens key={lens.id} {...lens} />
        ))}
      </defs>
    </svg>
  );
};

export default LiquidGlass;
