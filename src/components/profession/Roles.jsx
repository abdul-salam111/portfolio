const Roles = ({ role, index = 0, isLast = false }) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group relative py-8 ${isLast ? "" : "border-b border-line"}`}
    >
      {/* Wash wipes in from the left on hover — scaleX, so it never reflows the row. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -inset-x-4 origin-left scale-x-0 rounded-xl transition-transform duration-300 ease-out-expo group-hover:scale-x-100 sm:-inset-x-6"
        style={{
          background:
            "linear-gradient(90deg, var(--accent-tint), transparent 88%)",
        }}
      />

      <div className="relative flex items-start gap-5 sm:gap-8">
        <span className="shrink-0 pt-1 font-mono text-fluid-xl tabular-nums text-fg-faint transition-colors duration-300 group-hover:text-brand">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="inline-block font-display text-fluid-2xl transition-transform duration-300 ease-out-quint group-hover:translate-x-1.5">
            {role?.title}
          </h3>
          <p className="mt-3 max-w-[58ch] text-fg-muted">{role?.description}</p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-2 hidden size-5 shrink-0 -translate-x-2 text-brand opacity-0 transition duration-300 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100 sm:block"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </div>
    </article>
  );
};

export default Roles;
