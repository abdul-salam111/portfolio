import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MonoBlog from "./MonoBlog";
import { Magnetic, Reveal } from "../motion";
import { blogData } from "../../data/blogData";
import { useContent } from "../../services/useContent";
import "swiper/css";
import "swiper/css/pagination";

const custom_breakpoints = {
  640: { slidesPerView: 2, spaceBetween: 20 },
  1280: { slidesPerView: 3, spaceBetween: 24 },
};

const CarouselButton = ({ label, path, disabled, onClick }) => (
  <Magnetic strength={0.26} className="shrink-0">
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`glass center size-11 rounded-full text-fg hover:text-brand hover:shadow-[var(--shadow-glow)] disabled:cursor-not-allowed ${
        disabled ? "opacity-35" : "opacity-100"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-4 w-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </button>
  </Magnetic>
);

const Blog = () => {
  const blogs = useContent("blogs", blogData);
  const swiperRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Swiper owns the real position; mirroring only the two edges keeps the
  // custom arrows honest without re-rendering on every drag frame.
  const syncEdges = (swiper) =>
    setEdges({ start: swiper.isBeginning, end: swiper.isEnd });

  return (
    <section id="blog" className="section relative border-y border-line bg-bg-elev">
      <div className="content">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="text-center md:text-left">
            <span className="eyebrow [&::before]:hidden md:[&::before]:block">
              Writing
            </span>
            <h2 className="section-title mt-4">Blog</h2>
            <p className="section-lead mt-5 mx-auto md:mx-0">
              Check out my recent blog posts where I share insights on design,
              development, and the latest industry trends.
            </p>
          </Reveal>

          <nav
            aria-label="Blog carousel controls"
            className="flex items-center justify-center gap-3 md:pb-2"
          >
            <CarouselButton
              label="Previous posts"
              path="M15 19l-7-7 7-7"
              disabled={edges.start}
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <CarouselButton
              label="Next posts"
              path="M9 5l7 7-7 7"
              disabled={edges.end}
              onClick={() => swiperRef.current?.slideNext()}
            />
          </nav>
        </div>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <Swiper
            grabCursor={true}
            spaceBetween={16}
            breakpoints={custom_breakpoints}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncEdges(swiper);
            }}
            onSlideChange={syncEdges}
            onResize={syncEdges}
            // Live API rows replace the bundled fallback after mount, which
            // changes the slide count without firing slideChange.
            onUpdate={syncEdges}
            className="!pb-14"
          >
            {blogs.map((data, index) => (
              // Every card stretches to the tallest slide so the carousel never
              // jitters between posts of different length. Both utilities have
              // to be forced: swiper.css is unlayered and therefore outranks
              // Tailwind's layered `flex` / `h-auto`.
              <SwiperSlide key={data?.id ?? index} className="!flex !h-auto">
                <MonoBlog data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
};

export default Blog;
