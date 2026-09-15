const avatarStyle = {
  background: "var(--grad-accent)",
  color: "var(--accent-contrast)",
};

const ruleStyle = {
  background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)",
};

const TestimonialTemplate = ({ testimonial }) => {
  const initial = testimonial?.name?.trim().charAt(0).toUpperCase() ?? "";

  return (
    <figure className="glass-panel flex h-full w-full flex-col overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12 md:px-14 md:py-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1 select-none font-display text-[9rem] leading-none text-brand/10 sm:left-6 sm:text-[13rem]"
      >
        &ldquo;
      </span>

      {/* Field roles come from the admin form: `message` is the short headline,
          `quote` the longer paragraph underneath it. */}
      <blockquote className="relative z-10 flex flex-1 flex-col items-center">
        <p className="mx-auto max-w-[34ch] font-display text-fluid-2xl leading-[1.18] tracking-[-0.03em] text-fg">
          {testimonial?.message}
        </p>

        {testimonial?.quote && (
          <p className="mx-auto mt-6 max-w-[58ch] text-fluid-base text-fg-muted">
            {testimonial.quote}
          </p>
        )}
      </blockquote>

      <hr className="my-8 h-px w-full border-0" style={ruleStyle} aria-hidden="true" />

      <figcaption className="relative z-10 flex items-center justify-center gap-3.5 text-left">
        <span
          aria-hidden="true"
          className="center size-11 shrink-0 rounded-full font-display text-fluid-lg font-semibold"
          style={avatarStyle}
        >
          {initial}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-fluid-base font-semibold text-fg">
            {testimonial?.name}
          </span>
          <span className="mt-1 block font-mono text-fluid-xs text-fg-faint">
            {testimonial?.designation}
          </span>
        </span>
      </figcaption>
    </figure>
  );
};

export default TestimonialTemplate;
