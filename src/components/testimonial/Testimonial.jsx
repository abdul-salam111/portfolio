import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import "./testimonial.css";

const staticTestimonials = [
  {
    _docId: "static-1",
    message: "Abdul delivered our Flutter app two weeks ahead of schedule — clean architecture, zero critical bugs at launch.",
    quote: "We needed a cross-platform app with real-time Firebase sync, offline support, and a polished UI. Abdul nailed every requirement and kept communication tight throughout. The codebase he handed over is genuinely maintainable. We've since hired him for a second project.",
    name: "James Thornton",
    designation: "CTO, Verdant Labs — London, UK",
  },
  {
    _docId: "static-2",
    message: "Rebuilt our legacy Android app in Flutter. Performance improved dramatically and the iOS version shipped at no extra cost.",
    quote: "Abdul restructured the entire state management layer using BLoC and reduced our app's cold-start time by nearly 40%. He was proactive about edge cases we hadn't even considered. A rare developer who understands both the product and the engineering side.",
    name: "Ayesha Nawaz",
    designation: "Head of Product, SwiftPay Technologies — Karachi",
  },
  {
    _docId: "static-3",
    message: "Our e-commerce app went from a buggy prototype to a 4.8-star Play Store listing in under three months.",
    quote: "Abdul integrated Stripe payments, push notifications, and a custom cart system — all with smooth animations that our users love. He raised concerns early when specs were unclear instead of building the wrong thing. That kind of ownership is hard to find.",
    name: "Michael Brewer",
    designation: "Founder & CEO, Cartera — Toronto, Canada",
  },
];

const Testimonial = () => {
  const swiperRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(query(collection(db, "testimonials"), orderBy("order", "asc")));
        const data = snap.docs.map((d) => ({ ...d.data(), _docId: d.id }));
        setTestimonials(data.length > 0 ? data : staticTestimonials);
      } catch {
        setTestimonials(staticTestimonials);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return null;

  return (
    <div className="flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25">
      <div className="w-full h-full cursor-grab">
        <p className="section-title mb-6 text-center">Testimonial</p>
        <Swiper
          id="testimonialSwiper"
          spaceBetween={30}
          loop={true}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._docId}>
              <TestimonialTemplate testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-picto-primary hover:border-picto-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-picto-primary hover:border-picto-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
