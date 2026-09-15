import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * One contact row. Renders an anchor when `href` is given (email, phone) and a
 * plain div otherwise (the postal address), so only the actionable rows are
 * keyboard-reachable.
 */
const Address = ({ item, href }) => {
  const Tag = href ? "a" : "div";

  return (
    <Tag
      {...(href ? { href } : {})}
      className="group flex items-center gap-4 rounded-xl py-2.5"
    >
      <span className="relative center h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-brand/10">
        {/* Gradient sits on its own layer so it can cross-fade on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out-quint group-hover:opacity-100"
          style={{
            background:
              "var(--grad-accent)",
          }}
        />
        <FontAwesomeIcon
          icon={item?.icon}
          className="relative text-fluid-base text-brand transition-colors duration-300 group-hover:text-[color:var(--accent-contrast)]"
        />
      </span>

      <span className="min-w-0">
        <span className="block font-mono text-fluid-xs uppercase tracking-[0.18em] text-fg-faint">
          {item?.title}
        </span>
        <span
          className={`block break-words font-medium text-fg transition-colors duration-300 ${
            href ? "group-hover:text-brand" : ""
          }`}
        >
          {item?.description}
        </span>
      </span>
    </Tag>
  );
};

export default Address;
