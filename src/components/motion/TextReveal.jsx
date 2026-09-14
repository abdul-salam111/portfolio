import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPrefs } from "./useMotionPrefs";

/**
 * Splits text into words (and optionally characters) and lifts each one out of
 * a clipped line. Words are kept whole so the copy still wraps and, crucially,
 * still reads as one string to screen readers — the visible spans are hidden
 * from the accessibility tree and the full text is exposed via aria-label.
 */
const TextReveal = ({
  text,
  as = "span",
  by = "word",
  className = "",
  delay = 0,
  stagger,
  duration = 0.9,
  trigger = "view",
  once = true,
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });
  const { reduced } = useMotionPrefs();
  const Tag = motion[as] ?? motion.span;

  if (reduced || typeof text !== "string") {
    const Plain = as;
    return (
      <Plain ref={ref} className={className} {...rest}>
        {text}
      </Plain>
    );
  }

  const step = stagger ?? (by === "char" ? 0.026 : 0.062);
  const words = text.split(" ");
  const active = trigger === "mount" ? true : inView;

  let index = -1;

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={text}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      {...rest}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden="true"
          // inline-block keeps each word's clip box tight to its own glyphs
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          {(by === "char" ? Array.from(word) : [word]).map((piece, pi) => {
            index += 1;
            return (
              <motion.span
                key={`${piece}-${pi}`}
                style={{ display: "inline-block", willChange: "transform, opacity" }}
                variants={{
                  hidden: { y: "108%", opacity: 0, rotate: by === "char" ? 4 : 2 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration,
                      delay: delay + index * step,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                {piece}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
