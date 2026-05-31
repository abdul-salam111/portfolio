import { useState, useEffect } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";

const empty = {
  order: "", id: "", title: "", category: "", date: "", readTime: "",
  comments: "", excerpt: "", content: "", tags: "", image: "", link: "#!",
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(empty);
  const [editDocId, setEditDocId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "blogs"), orderBy("order", "asc")));
      setBlogs(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditDocId(null); setView("form"); };
  const openEdit = (b) => { setForm({ ...b, tags: Array.isArray(b.tags) ? b.tags.join(", ") : (b.tags || "") }); setEditDocId(b._docId); setView("form"); };
  const cancel = () => { setView("list"); setForm(empty); setEditDocId(null); };
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    if (!form.title || !form.order) return alert("Title and Order are required.");
    setSaving(true);
    const { _docId, ...data } = form;
    data.order = Number(data.order);
    data.id = Number(data.id) || Number(data.order);
    data.comments = Number(data.comments) || 0;
    data.tags = data.tags ? data.tags.split(",").map((s) => s.trim()).filter(Boolean) : [];
    try {
      if (editDocId) {
        await updateDoc(doc(db, "blogs", editDocId), data);
      } else {
        await addDoc(collection(db, "blogs"), data);
      }
      cancel();
      await load();
    } catch (e) { console.error(e); alert("Save failed. Check console."); }
    setSaving(false);
  };

  const del = async (docId) => {
    try { await deleteDoc(doc(db, "blogs", docId)); await load(); } catch {}
    setConfirmDelete(null);
  };

  if (loading) return <p className="text-center py-20 text-gray-400">Loading blogs...</p>;

  if (view === "form") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#132238]">
            {editDocId ? "Edit Blog" : "New Blog Post"}
          </h2>
          <button onClick={cancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Order *" type="number" value={form.order} onChange={(v) => set("order", v)} hint="Controls display order" />
          <Field label="ID *" type="number" value={form.id} onChange={(v) => set("id", v)} />
          <div className="sm:col-span-2">
            <Field label="Title *" value={form.title} onChange={(v) => set("title", v)} />
          </div>
          <Field label="Category" value={form.category} onChange={(v) => set("category", v)} hint='e.g. "Flutter", "Firebase"' />
          <Field label="Date" value={form.date} onChange={(v) => set("date", v)} hint='e.g. "29 May, 2025"' />
          <Field label="Read Time" value={form.readTime} onChange={(v) => set("readTime", v)} hint='e.g. "5 min read"' />
          <Field label="Comment Count" type="number" value={form.comments} onChange={(v) => set("comments", v)} />
          <div className="sm:col-span-2">
            <Field label="Excerpt" textarea rows={2} value={form.excerpt} onChange={(v) => set("excerpt", v)} hint="Short summary shown on the blog card and as a pull-quote on the detail page." />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#132238] mb-1.5">Content</label>
            <RichTextEditor value={form.content} onChange={(v) => set("content", v)} />
            <p className="text-xs text-gray-400 mt-1">Full blog post — use the toolbar to format headings, bold, lists, links, etc.</p>
          </div>
          <div className="sm:col-span-2">
            <Field label="Tags" value={form.tags} onChange={(v) => set("tags", v)} hint='Comma-separated — e.g. "Flutter, Firebase, Dart"' />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Cover Image" value={form.image} onChange={(v) => set("image", v)} folder="blogs" />
          </div>
          <div className="sm:col-span-2">
            <Field label="External Link" value={form.link} onChange={(v) => set("link", v)} hint='Link to Medium / external platform. Use "#!" if not published.' />
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="mt-8 w-full bg-[#0080ff] text-white font-semibold py-3 rounded-xl hover:bg-[#01579b] transition-colors disabled:opacity-50">
          {saving ? "Saving..." : editDocId ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#132238] text-lg">{blogs.length} Blog Posts</h2>
        <button onClick={openAdd}
          className="bg-[#0080ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#01579b] transition-colors">
          + Add Blog
        </button>
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No blog posts yet.</p>
          <button onClick={openAdd} className="text-[#0080ff] underline text-sm">Add your first post</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((b) => (
          <div key={b._docId} className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
            {b.image && (
              <img src={b.image} alt={b.title} className="w-full h-32 object-cover rounded-lg bg-gray-100" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[#e8f4fd] text-[#0080ff] px-2 py-0.5 rounded-full font-medium">
                  #{b.order}
                </span>
                <span className="text-xs text-gray-400">{b.date}</span>
              </div>
              <h3 className="font-bold text-[#132238] text-sm truncate">{b.title}</h3>
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => openEdit(b)}
                className="flex-1 border border-[#0080ff] text-[#0080ff] text-sm py-2 rounded-lg hover:bg-[#e8f4fd] transition-colors">
                Edit
              </button>
              <button onClick={() => setConfirmDelete(b._docId)}
                className="flex-1 border border-red-300 text-red-400 text-sm py-2 rounded-lg hover:bg-red-50 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-[#132238] mb-2">Delete this blog post?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={() => del(confirmDelete)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, rows = 3, hint, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#132238] mb-1.5">{label}</label>
      {textarea ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] resize-none transition-colors" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] transition-colors" />
      )}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
