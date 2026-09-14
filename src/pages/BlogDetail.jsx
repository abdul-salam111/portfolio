import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCalendarDays, faClock, faComment, faTag } from "@fortawesome/free-solid-svg-icons";
import { blogData } from "../data/blogData";
import { useContent } from "../services/useContent";
import { Aurora, Magnetic, Reveal } from "../components/motion";

const easeOut = [0.16, 1, 0.3, 1];

// The hero is an always-dark band. Tailwind's `border-line` / `text-fg-muted`
// utilities are resolved at :root and cannot be re-pointed here, but the shared
// `.chip` and `.grid-lines` classes read the raw tokens directly — pinning those
// to their dark values keeps both readable when the site is in its light theme.
const darkBand = {
  "--border-hairline": "rgb(255 255 255 / 0.13)",
  "--border-strong": "rgb(255 255 255 / 0.24)",
  "--surface-veil": "rgb(255 255 255 / 0.08)",
  "--text-muted": "rgb(255 255 255 / 0.74)",
};

// Tailwind Typography ships near-black defaults, and the theme switches on
// `data-theme` rather than Tailwind's `dark:` variant, so `dark:prose-invert`
// never fires. daisyUI re-declares the same custom properties at `:root .prose`,
// which outranks a class-level override — setting them inline is the only form
// that reliably wins, so the article body follows the tokens in both themes.
const proseTokens = {
  "--tw-prose-body": "var(--text-muted)",
  "--tw-prose-headings": "var(--text)",
  "--tw-prose-lead": "var(--text-muted)",
  "--tw-prose-links": "var(--accent)",
  "--tw-prose-bold": "var(--text)",
  "--tw-prose-counters": "var(--text-faint)",
  "--tw-prose-bullets": "var(--border-strong)",
  "--tw-prose-hr": "var(--border-hairline)",
  "--tw-prose-quotes": "var(--text)",
  "--tw-prose-quote-borders": "var(--accent)",
  "--tw-prose-captions": "var(--text-faint)",
  "--tw-prose-code": "var(--text)",
  "--tw-prose-pre-code": "var(--text)",
  "--tw-prose-pre-bg": "var(--bg-sunken)",
  "--tw-prose-th-borders": "var(--border-strong)",
  "--tw-prose-td-borders": "var(--border-hairline)",
};

const proseClasses = [
  "prose prose-base max-w-none",
  "prose-headings:font-display prose-headings:font-semibold",
  "prose-p:leading-relaxed prose-a:font-medium",
  "prose-blockquote:border-l-2 prose-blockquote:not-italic",
  "prose-img:max-w-sm prose-img:rounded-xl prose-img:border prose-img:border-line",
  "prose-pre:rounded-xl prose-pre:border prose-pre:border-line",
  // Pasted editor markup carries its own inline highlight colours; neutralise
  // them so code blocks inherit the themed foreground instead.
  "[&_pre_*]:bg-transparent [&_pre_*]:text-inherit",
  "[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-brand/10 [&_:not(pre)>code]:px-1.5",
  "[&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-normal [&_:not(pre)>code]:text-brand",
  "[&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none",
].join(" ");

const isRealLink = (link) => link && link !== "#!";

const BlogDetail = () => {
  const { id } = useParams();
  const allBlogs = useContent("blogs", blogData);
  const blog = allBlogs.find((b) => String(b.id) === String(id));

  if (!blog) return <Navigate to="/" replace />;

  const hasContent = !!blog.content && blog.content !== "<p></p>";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  // Bundled posts carry only a title and date, so the article wrapper must not
  // reserve vertical space when there is nothing to put in it.
  const hasBody = !!blog.excerpt || hasContent || tags.length > 0;

  return (
    <div className="bg-bg">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-36 sm:pt-36" style={darkBand}>
        <Aurora />
        <div className="grid-lines" aria-hidden="true" />

        <div className="content relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <Link
              to="/#blog"
              className="group inline-flex items-center gap-2 text-fluid-sm font-medium text-white/70 hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          {blog.category && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65, ease: easeOut }}
            >
              <span className="chip">{blog.category}</span>
            </motion.div>
          )}

          <motion.h1
            className="mt-6 max-w-4xl text-fluid-3xl text-white sm:text-fluid-4xl"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75, ease: easeOut }}
          >
            {blog.title}
          </motion.h1>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-fluid-xs tracking-wide text-white/70"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.75, ease: easeOut }}
          >
            {blog.date && (
              <span className="inline-flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} className="opacity-60" />
                {blog.date}
              </span>
            )}
            {blog.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/35" />
                <FontAwesomeIcon icon={faClock} className="opacity-60" />
                {blog.readTime}
              </span>
            )}
            {blog.comments > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/35" />
                <FontAwesomeIcon icon={faComment} className="opacity-60" />
                {blog.comments} Comments
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Cover image floating over the hero ── */}
      {blog.image && (
        <div className="content relative z-20 -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.42, duration: 0.85, ease: easeOut }}
            className="overflow-hidden rounded-[1.5rem] border border-line bg-surface"
            style={{ boxShadow: "var(--shadow-lifted)" }}
          >
            <img
              src={blog.image}
              alt={blog.title ? `${blog.title} cover` : "Article cover"}
              loading="eager"
              className="max-h-[480px] w-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* ── Article ── */}
      <div className={`content pb-6 ${hasBody ? "pt-16" : ""}`}>

        {blog.excerpt && (
          <Reveal className="mx-auto max-w-3xl">
            <blockquote className="border-l-2 border-brand pl-6">
              <p className="text-fluid-lg font-medium leading-relaxed text-fg">
                {blog.excerpt}
              </p>
            </blockquote>
          </Reveal>
        )}

        {hasContent && (
          <Reveal delay={0.08} className={`mx-auto max-w-3xl ${blog.excerpt ? "mt-12" : ""}`}>
            <article
              className={proseClasses}
              style={proseTokens}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Reveal>
        )}

        {tags.length > 0 && (
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <span className="inline-flex items-center gap-1.5 font-mono text-fluid-xs uppercase tracking-[0.22em] text-fg-faint">
                <FontAwesomeIcon icon={faTag} />
                Tags
              </span>
              {tags.map((tag) => (
                <span key={tag} className="chip chip-accent cursor-default px-4 py-2 text-[0.72rem]">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="section relative overflow-hidden border-t border-line bg-bg-elev">
        <Aurora />
        <div className="content relative z-10 text-center">
          <Reveal>
            <span className="eyebrow eyebrow-center">
              {isRealLink(blog.link) ? "Keep reading" : "Say hello"}
            </span>
            <h2 className="section-title mt-4">
              {isRealLink(blog.link) ? "Read the Full Article" : "Enjoyed this Post?"}
            </h2>
            <p className="section-lead mx-auto mt-5 text-center">
              {isRealLink(blog.link)
                ? "This post is also available on an external platform."
                : "Feel free to reach out — I love talking about Flutter and mobile development."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {isRealLink(blog.link) && (
                <Magnetic strength={0.2}>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary h-12 min-h-12 gap-3 px-7 text-fluid-base"
                  >
                    Read Full Article
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </Magnetic>
              )}
              <Magnetic strength={0.2}>
                <a href="/#contact" className="btn btn-ghost-line h-12 min-h-12 px-7 text-fluid-base">
                  Get in Touch
                </a>
              </Magnetic>
            </div>

            <Link
              to="/#blog"
              className="group mt-12 inline-flex items-center gap-2 text-fluid-sm font-medium text-fg-muted hover:text-brand"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to all posts
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default BlogDetail;
