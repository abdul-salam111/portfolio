import { Link } from "react-router-dom";

const MonoBlog = ({ data }) => {
  return (
    <Link
      to={`/blog/${data?.id}`}
      className="group block w-full overflow-hidden rounded-lg border border-gray-200 hover:shadow-2xl bg-white shadow-gray-300 shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden">
        <img
          src={data?.image}
          alt="Blog"
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 xs:p-8">
        {data?.category && (
          <span className="inline-block text-[10px] font-bold text-[#0080ff] bg-[#e8f4fd] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
            {data.category}
          </span>
        )}
        <p className="text-[11px] text-gray-400 mb-2">
          {data?.date}
          {data?.readTime && <span> · {data.readTime}</span>}
          {data?.comments > 0 && <span> · {data.comments} Comments</span>}
        </p>
        <p className="text-sm font-semibold text-[#132238] leading-snug line-clamp-1 group-hover:text-[#0080ff] transition-colors duration-200">
          {data?.title}
        </p>
        {data?.excerpt && (
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {data.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-xs text-[#0080ff] font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Read more →
        </span>
      </div>
    </Link>
  );
};

export default MonoBlog;
