import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

/** Counts from 0 to `value` the first time it scrolls into view. */
const CountUp = ({ value, duration = 1.8, delay = 0, decimals = 0, className = "", suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const { reduced } = useMotionPrefs();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, delay, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
