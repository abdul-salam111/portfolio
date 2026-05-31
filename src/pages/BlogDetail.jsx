import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { blogsPromise } from "../services/prefetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCalendarDays, faClock, faComment, faTag } from "@fortawesome/free-solid-svg-icons";
import ScrollReveal from "../components/common/ScrollReveal";
import Loading from "../components/common/loading/Loading";

const BlogDetail = () => {
  const { id } = useParams();
  const [allBlogs, setAllBlogs] = useState(null); // null = not yet loaded

  useEffect(() => {
    blogsPromise.then((data) => setAllBlogs(data));
  }, []);

  if (allBlogs === null) return <Loading />;

  const blog = allBlogs.find((b) => String(b.id) === String(id));

  if (!blog) return <Navigate to="/" replace />;

  const isRealLink = (link) => link && link !== "#!";
  const hasContent = !!blog.content && blog.content !== "<p></p>";
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#01579b] via-[#0080ff] to-[#54c5f8] pt-10 pb-32 px-4">
        <div className="content">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/#blog" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-10 group text-sm font-medium">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category chip */}
          {blog.category && (
            <motion.div className="mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
              <span className="text-xs bg-white/15 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 font-medium">
                {blog.category}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl"
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          >
            {blog.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            className="flex flex-wrap items-center gap-4 text-blue-100 text-sm"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
          >
            {blog.date && (
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faCalendarDays} className="text-xs opacity-70" />
                {blog.date}
              </span>
            )}
            {blog.readTime && (
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-300/60" />
                <FontAwesomeIcon icon={faClock} className="text-xs opacity-70" />
                {blog.readTime}
              </span>
            )}
            {blog.comments > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-300/60" />
                <FontAwesomeIcon icon={faComment} className="text-xs opacity-70" />
                {blog.comments} Comments
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Cover image floating over hero ── */}
      {blog.image && (
        <div className="content px-4 -mt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,128,255,0.28)] border border-white/80"
          >
            <img src={blog.image} alt={blog.title} className="w-full max-h-[480px] object-cover" />
          </motion.div>
        </div>
      )}

      {/* ── Excerpt ── */}
      {blog.excerpt && (
        <div className="content px-4 mt-14">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="border-l-4 border-[#0080ff] pl-6 py-1">
                <p className="text-[#132238] text-lg sm:text-xl font-medium italic leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* ── Article body ── */}
      {hasContent && (
        <ScrollReveal>
          <div className="content px-4 mt-12 pb-4">
            <div
              className="max-w-3xl mx-auto prose prose-base prose-headings:text-[#132238] prose-headings:font-bold prose-p:text-[#4a5568] prose-p:leading-relaxed prose-a:text-[#0080ff] prose-strong:text-[#132238] prose-blockquote:border-[#0080ff] prose-blockquote:text-[#4a5568] prose-li:text-[#4a5568] prose-img:max-w-sm prose-img:rounded-xl [&_:not(pre)>code]:text-[#0080ff] [&_:not(pre)>code]:bg-[#e8f4fd] [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:rounded prose-pre:bg-[#1e1e1e] prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 [&_pre]:text-[#d4d4d4] [&_pre_*]:bg-transparent [&_pre_*]:text-inherit max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </ScrollReveal>
      )}

      {/* ── Tags ── */}
      {tags.length > 0 && (
        <div className="content px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="border-t border-gray-100 pt-8 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  <FontAwesomeIcon icon={faTag} />
                  Tags
                </span>
                {tags.map((tag) => (
                  <span key={tag} className="text-sm bg-[#e8f4fd] text-[#0080ff] px-4 py-1.5 rounded-full font-medium border border-[#0080ff]/15 hover:bg-[#0080ff] hover:text-white transition-colors duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-[#01579b] to-[#0080ff] py-20 px-4 mt-6">
        <div className="content text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {isRealLink(blog.link) ? "Read the Full Article" : "Enjoyed this Post?"}
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-10">
              {isRealLink(blog.link)
                ? "This post is also available on an external platform."
                : "Feel free to reach out — I love talking about Flutter and mobile development."}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {isRealLink(blog.link) && (
                <motion.a href={blog.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white text-[#0080ff] font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  Read Full Article
                  <FontAwesomeIcon icon={faArrowRight} />
                </motion.a>
              )}
              <motion.a href="/#contact"
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-white/15 text-white font-semibold px-7 py-4 rounded-xl border border-white/25 hover:bg-white/25 transition-colors duration-300">
                Get in Touch
              </motion.a>
            </div>

            <Link to="/#blog" className="text-blue-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group text-sm font-medium">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all posts
            </Link>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
};

export default BlogDetail;
