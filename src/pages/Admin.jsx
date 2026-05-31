import { useState } from "react";
import AdminProjects from "../components/admin/AdminProjects";
import AdminBlogs from "../components/admin/AdminBlogs";
import AdminTestimonials from "../components/admin/AdminTestimonials";
import AdminClients from "../components/admin/AdminClients";

const PASS = import.meta.env.VITE_ADMIN_PASS;

const Admin = () => {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("_adm") === "1"
  );
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("projects");

  const login = () => {
    if (pass === PASS) {
      sessionStorage.setItem("_adm", "1");
      setAuthed(true);
    } else {
      setError("Incorrect password.");
      setPass("");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("_adm");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f0f8ff] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm">
          <div className="w-12 h-12 bg-[#e8f4fd] rounded-xl flex items-center justify-center mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.24 2 7 4.24 7 7v2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V7c0-2.76-2.24-5-5-5zm0 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3-11v2H9V7c0-1.65 1.35-3 3-3s3 1.35 3 3z"
                fill="#0080ff" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[#132238] mb-1">Admin Panel</h1>
          <p className="text-gray-400 text-sm mb-6">Enter your password to continue.</p>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-[#0080ff] transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button onClick={login}
            className="w-full bg-[#0080ff] text-white font-semibold py-3 rounded-xl hover:bg-[#01579b] transition-colors">
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f8ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#01579b] to-[#0080ff] py-5 px-6 sticky top-0 z-40 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Admin Panel</h1>
            <p className="text-blue-200 text-xs mt-0.5">Eng. Abdul Salam — Portfolio</p>
          </div>
          <button onClick={logout} className="text-blue-200 hover:text-white text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {["projects", "blogs", "testimonials", "clients"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all capitalize ${
                tab === t
                  ? "bg-[#0080ff] text-white shadow-md shadow-blue-200"
                  : "bg-white text-[#132238] hover:bg-[#e8f4fd]"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "projects" && <AdminProjects />}
        {tab === "blogs" && <AdminBlogs />}
        {tab === "testimonials" && <AdminTestimonials />}
        {tab === "clients" && <AdminClients />}
      </div>
    </div>
  );
};

export default Admin;
