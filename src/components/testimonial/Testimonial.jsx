import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import { Aurora, Magnetic, Reveal } from "../motion";
import { testimonialData } from "../../data/testimonialData";
import { useContent } from "../../services/useContent";
import "swiper/css";
import "swiper/css/pagination";
import "./testimonial.css";

const CarouselButton = ({ label, path, onClick }) => (
  <Magnetic strength={0.26} className="shrink-0">
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="glass center size-11 rounded-full text-fg hover:text-brand hover:shadow-[var(--shadow-glow)]"
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

// Swiper's defaults paint the bullets #000 at 0.2 opacity and the active one a
// fixed #007aff, both of which vanish or clash on the dark theme.
const swiperVars = {
  "--swiper-pagination-color": "var(--accent)",
  "--swiper-pagination-bullet-inactive-color": "var(--text-faint)",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
};

const Testimonial = () => {
  const swiperRef = useRef(null);
  const testimonials = useContent("testimonials", testimonialData);

  return (
    <section className="section relative overflow-hidden bg-bg">
      <Aurora />
      <div className="content relative z-10">
        <Reveal direction="none" duration={0.8} className="mx-auto max-w-[46rem] text-center">
          <span className="eyebrow eyebrow-center">Testimonials</span>
          <h2 className="section-title mt-4">What clients say</h2>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-12 w-full max-w-[52rem] md:mt-16">
          <Swiper
            id="testimonialSwiper"
            style={swiperVars}
            grabCursor={true}
            spaceBetween={30}
            loop={true}
            navigation={false}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {testimonials.map((testimonial, index) => (
              // Slides stretch to the tallest quote so the carousel never
              // resizes between testimonials of different length. Swiper's own
              // stylesheet loads after Tailwind and sets `display: block`, so
              // the flex here has to be forced for the card to fill the slide.
              <SwiperSlide key={testimonial?.id ?? index} className="h-auto !flex">
                <TestimonialTemplate testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <nav
            aria-label="Testimonial carousel controls"
            className="mt-4 flex items-center justify-center gap-3"
          >
            <CarouselButton
              label="Previous testimonial"
              path="M15 19l-7-7 7-7"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <CarouselButton
              label="Next testimonial"
              path="M9 5l7 7-7 7"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </nav>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonial;
