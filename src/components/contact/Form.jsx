import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact } from "../../services/api";
import { Magnetic, useMotionPrefs } from "../motion";

const telegramSVG = (
  <svg className="w-4 md:w-5 aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.34 9.32013L6.34 2.32013C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22013L4.66 11.5901C4.71446 11.72 4.74251 11.8593 4.74251 12.0001C4.74251 12.1409 4.71446 12.2803 4.66 12.4101L2.26 17.7801C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C2.75682 21.0531 3.12953 21.3977 3.56883 21.6363C4.00812 21.875 4.50009 22 5 22.0001C5.46823 21.9955 5.92949 21.8861 6.35 21.6801L20.35 14.6801C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12.0001C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32013H20.34ZM19.45 12.8901L5.45 19.8901C5.26617 19.9784 5.05973 20.0084 4.85839 19.976C4.65705 19.9436 4.47041 19.8504 4.32352 19.709C4.17662 19.5675 4.07648 19.3845 4.03653 19.1846C3.99658 18.9846 4.01873 18.7772 4.1 18.5901L6.49 13.2201C6.52094 13.1484 6.54766 13.075 6.57 13.0001H13.46C13.7252 13.0001 13.9796 12.8948 14.1671 12.7072C14.3546 12.5197 14.46 12.2653 14.46 12.0001C14.46 11.7349 14.3546 11.4806 14.1671 11.293C13.9796 11.1055 13.7252 11.0001 13.46 11.0001H6.57C6.54766 10.9253 6.52094 10.8518 6.49 10.7801L4.1 5.41013C4.01873 5.22309 3.99658 5.01568 4.03653 4.8157C4.07648 4.61572 4.17662 4.43273 4.32352 4.29128C4.47041 4.14982 4.65705 4.05666 4.85839 4.02428C5.05973 3.9919 5.26617 4.02186 5.45 4.11013L19.45 11.1101C19.6138 11.194 19.7513 11.3215 19.8473 11.4786C19.9433 11.6356 19.994 11.8161 19.994 12.0001C19.994 12.1842 19.9433 12.3647 19.8473 12.5217C19.7513 12.6787 19.6138 12.8062 19.45 12.8901Z" fill="currentColor" />
  </svg>
);

const spinnerSVG = (
  <svg className="w-4 aspect-square animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* text-base below sm keeps the control at 16px, which is what stops iOS from
   zooming the page in when a field takes focus. */
const controlBase =
  "peer w-full rounded-xl border border-line bg-bg px-4 text-base sm:text-fluid-base text-fg hover:border-line-strong focus:border-brand";

const labelBase =
  "pointer-events-none absolute left-4 max-w-[calc(100%-2rem)] origin-left truncate text-base sm:text-fluid-base text-fg-faint transition-all duration-200 ease-out-quint peer-focus:text-brand";

/* Tailwind only sees complete class names, so the floated state is spelled out
   once per trigger instead of being composed at runtime. */
const floatOnFocus =
  "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:font-mono peer-focus:text-fluid-xs peer-focus:uppercase peer-focus:tracking-[0.16em]";

const floatOnFilled =
  "peer-[&:not(:placeholder-shown)]:top-2.5 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:font-mono peer-[&:not(:placeholder-shown)]:text-fluid-xs peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.16em]";

const empty = { name: "", email: "", location: "", budget: "", subject: "", message: "" };

/**
 * Text control with a CSS-only floating label: `placeholder=" "` keeps
 * `:placeholder-shown` in sync with emptiness, so the label can rise on focus
 * or content without any JS, while staying a real <label for>.
 */
const Field = ({ id, label, value, onChange, type = "text", autoComplete, textarea = false, rows = 4 }) => {
  const Control = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <Control
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? rows : undefined}
        required
        placeholder=" "
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`${controlBase} ${textarea ? "resize-y pt-7 pb-3" : "pt-7 pb-2.5"}`}
      />
      <label
        htmlFor={id}
        className={`${labelBase} ${textarea ? "top-[2.55rem]" : "top-1/2"} -translate-y-1/2 ${floatOnFocus} ${floatOnFilled}`}
      >
        {label}
        <span aria-hidden="true" className="text-brand"> *</span>
      </label>
    </div>
  );
};

const Form = () => {
  const { reduced } = useMotionPrefs();
  const [fields, setFields] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  // Hidden from humans; bots fill it in and the API silently discards those.
  const [honeypot, setHoneypot] = useState("");

  const set = (key, val) => setFields((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // The API stores the message before attempting any notification, so a
      // submission is never lost to a mail provider being down.
      await submitContact({ ...fields, website: honeypot });
      setStatus("success");
      setFields(empty);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const swap = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -14 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div key="success" className="center min-h-[22rem] flex-col text-center" {...swap}>
            <motion.span
              className="center h-16 w-16 rounded-full text-[color:var(--accent-contrast)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-soft), var(--accent) 55%, var(--accent-deep))",
                boxShadow: "var(--shadow-glow)",
              }}
              initial={reduced ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0.2 }
                  : { type: "spring", stiffness: 300, damping: 15, delay: 0.08 }
              }
            >
              <svg className="w-7 aspect-square" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>

            <p className="mt-6 text-fluid-xl font-semibold text-fg">Message sent!</p>
            <p className="mt-2 text-fluid-sm text-fg-muted">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>

            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 font-mono text-fluid-xs uppercase tracking-[0.16em] text-brand underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" {...swap}>
            {status === "error" && (
              <p className="mb-6 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-fluid-sm text-error">
                {error || "Failed to send."} You can also email me directly at{" "}
                <a href="mailto:abdulsalam.0302@gmail.com" className="font-medium underline underline-offset-2">
                  abdulsalam.0302@gmail.com
                </a>
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} />
                <Field id="email" label="Email" type="email" autoComplete="email" value={fields.email} onChange={(e) => set("email", e.target.value)} />
              </div>

              <Field id="location" label="Location" autoComplete="address-level2" value={fields.location} onChange={(e) => set("location", e.target.value)} />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="budget" label="Budget" value={fields.budget} onChange={(e) => set("budget", e.target.value)} />
                <Field id="subject" label="Subject" value={fields.subject} onChange={(e) => set("subject", e.target.value)} />
              </div>

              <Field id="message" label="Message" textarea rows={4} value={fields.message} onChange={(e) => set("message", e.target.value)} />

              {/* h-auto releases daisyUI's fixed .btn height so the padding applies. */}
              <Magnetic className="mt-4 w-fit max-lg:mx-auto" strength={0.24}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary inline-flex h-auto items-center gap-2.5 px-7 py-3.5 text-fluid-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      {spinnerSVG}
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      {telegramSVG}
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;
