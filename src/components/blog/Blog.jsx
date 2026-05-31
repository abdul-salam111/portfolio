import { useState, useEffect } from "react";
import img1 from "../../assets/images/blog/blog-1.jpg";
import img2 from "../../assets/images/blog/blog-2.jpg";
import img3 from "../../assets/images/blog/blog-3.jpg";
import img4 from "../../assets/images/blog/blog-4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import MonoBlog from "./MonoBlog";
import "swiper/css";
import "swiper/css/pagination";
import "./blog.css";
import { blogsPromise } from "../../services/prefetch";

const custom_breakpoints = {
  640: { slidesPerView: 2, spaceBetween: 20 },
  1280: { slidesPerView: 3, spaceBetween: 24 },
};

const staticBlogData = [
  {
    id: 1,
    image: img1,
    date: "15 Jan, 2025",
    comments: 12,
    title: "Building Offline-First Apps with SQLite in Flutter",
    link: "#!",
  },
  {
    id: 2,
    image: img2,
    date: "10 Feb, 2025",
    comments: 8,
    title: "BLoC vs GetX: Choosing the Right State Management",
    link: "#!",
  },
  {
    id: 3,
    image: img3,
    date: "05 Mar, 2025",
    comments: 15,
    title: "Clean Architecture in Flutter: A Practical Guide",
    link: "#!",
  },
  {
    id: 4,
    image: img4,
    date: "20 Mar, 2025",
    comments: 9,
    title: "Integrating Firebase with Flutter for Production Apps",
    link: "#!",
  },
  {
    id: 5,
    image: img2,
    date: "02 Apr, 2025",
    comments: 6,
    title: "Reducing Flutter App Size: Tree Shaking & Split-ABI Builds",
    link: "#!",
  },
  {
    id: 6,
    image: img1,
    date: "18 Apr, 2025",
    comments: 11,
    title: "Test-Driven Development in Flutter with Widget Testing",
    link: "#!",
  },
];

const BlogSkeleton = () => (
  <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md animate-pulse">
    <div className="w-full h-64 bg-gray-200" />
    <div className="p-4 xs:p-8">
      <div className="h-5 w-20 bg-gray-200 rounded-full mb-3" />
      <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
      <div className="h-4 w-full bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-200 rounded mb-1.5" />
      <div className="h-3 w-2/3 bg-gray-200 rounded" />
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsPromise.then((data) => {
      setBlogs(data.length > 0 ? data : staticBlogData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="content py-25 px-2 relative" id="blog">
      <div className="max-w-135 text-center mx-auto pb-17.5">
        <p className="section-title pb-6">Blog</p>
        <p className="text-xs xs:text-[16px] md:text-lg text-gray-400">
          Check out my recent blog posts where I share insights on design,
          development, and the latest industry trends.
        </p>
      </div>
      <Swiper
        grabCursor={true}
        breakpoints={custom_breakpoints}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {loading
          ? [1, 2, 3].map((i) => (
              <SwiperSlide key={i} className="mb-10" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                <BlogSkeleton />
              </SwiperSlide>
            ))
          : blogs.map((data, index) => (
              <SwiperSlide
                key={data.id ?? index}
                className="mb-10"
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
              >
                <MonoBlog data={data} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default Blog;
