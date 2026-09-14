import { CountUp } from "../motion";

/** One hero stat: an animated figure above a small mono label. */
const InformationSummary = ({ item, delay = 0 }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center lg:items-start lg:text-start">
      <span className="font-display text-fluid-2xl font-bold leading-none tracking-[-0.03em] text-fg">
        <CountUp value={item.value} suffix={item.suffix} duration={1.8} delay={delay} />
      </span>
      <span className="font-mono text-[0.6875rem] uppercase leading-[1.6] tracking-[0.18em] text-fg-muted sm:text-xs">
        {item.title}
      </span>
    </div>
  );
};

export default InformationSummary;
