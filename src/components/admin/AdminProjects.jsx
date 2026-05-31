import { useState, useEffect, useRef } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import ImageUpload from "./ImageUpload";

const empty = {
  order: "", id: "", title: "", category: "", tagline: "",
  about: "", description: "", fullDescription: "", image: "",
  screenshots: [], techStack: "", features: [],
  playStoreLink: "#!", appStoreLink: "#!",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(empty);
  const [editDocId, setEditDocId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "projects"), orderBy("order", "asc")));
      setProjects(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditDocId(null); setView("form"); };
  const openEdit = (p) => { setForm({ ...p, techStack: (p.techStack || []).join(", ") }); setEditDocId(p._docId); setView("form"); };
  const cancel = () => { setView("list"); setForm(empty); setEditDocId(null); };
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addItem = (key) => setForm((f) => ({ ...f, [key]: [...f[key], ""] }));
  const setItem = (key, i, val) => setForm((f) => {
    const arr = [...f[key]]; arr[i] = val; return { ...f, [key]: arr };
  });
  const removeItem = (key, i) => setForm((f) => ({
    ...f, [key]: f[key].filter((_, idx) => idx !== i),
  }));

  const save = async () => {
    if (!form.title || !form.order) return alert("Title and Order are required.");
    setSaving(true);
    const { _docId, ...data } = form;
    data.order = Number(data.order);
    data.id = Number(data.id) || Number(data.order);
    data.techStack = data.techStack.split(",").map((s) => s.trim()).filter(Boolean);
    data.features = data.features.filter(Boolean);
    data.screenshots = data.screenshots.filter(Boolean);
    try {
      if (editDocId) {
        await updateDoc(doc(db, "projects", editDocId), data);
      } else {
        await addDoc(collection(db, "projects"), data);
      }
      cancel();
      await load();
    } catch (e) { console.error(e); alert("Save failed. Check console."); }
    setSaving(false);
  };

  const del = async (docId) => {
    try { await deleteDoc(doc(db, "projects", docId)); await load(); } catch {}
    setConfirmDelete(null);
  };

  if (loading) return <p className="text-center py-20 text-gray-400">Loading projects...</p>;

  if (view === "form") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#132238]">
            {editDocId ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={cancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Order *" type="number" value={form.order} onChange={(v) => set("order", v)} hint="Controls display order (1 = first)" />
          <Field label="ID *" type="number" value={form.id} onChange={(v) => set("id", v)} hint="Used in URL → /project/1" />
          <Field label="Title *" value={form.title} onChange={(v) => set("title", v)} />
          <Field label="Category" value={form.category} onChange={(v) => set("category", v)} hint='e.g. "FLUTTER · FIREBASE"' />
          <div className="sm:col-span-2">
            <Field label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} hint="Short one-liner on the detail page hero" />
          </div>
          <div className="sm:col-span-2">
            <Field label="About the Project" textarea rows={4} value={form.about} onChange={(v) => set("about", v)} hint="Shown in the 'About' section on the detail page — describe what the project is." />
          </div>
          <div className="sm:col-span-2">
            <Field label="Problem Statement — The Challenge" textarea value={form.description} onChange={(v) => set("description", v)} hint="What problem did this app solve? Shown on the portfolio card and as 'The Challenge' on the detail page." />
          </div>
          <div className="sm:col-span-2">
            <Field label="The Solution" textarea rows={4} value={form.fullDescription} onChange={(v) => set("fullDescription", v)} hint="How did you build it / solve the problem? Shown as 'The Solution' on the detail page." />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Main Image" value={form.image} onChange={(v) => set("image", v)} folder="projects" />
          </div>
          <Field label="Play Store Link" value={form.playStoreLink} onChange={(v) => set("playStoreLink", v)} hint='Use "#!" if not available' />
          <Field label="App Store Link" value={form.appStoreLink} onChange={(v) => set("appStoreLink", v)} hint='Use "#!" if not available' />
        </div>

        {/* Screenshots — each item gets its own upload widget */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#132238]">Screenshots</label>
            <button onClick={() => addItem("screenshots")} className="text-xs text-[#0080ff] hover:underline font-medium">+ Add screenshot</button>
          </div>
          {form.screenshots.length === 0 && (
            <p className="text-xs text-gray-300 italic py-2">No screenshots yet — click + Add screenshot</p>
          )}
          {form.screenshots.map((url, i) => (
            <div key={i} className="mb-4 border border-gray-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-semibold text-[#132238]">Screenshot {i + 1}</span>
                  {i === 0 && <span className="ml-2 text-xs text-[#0080ff] bg-[#e8f4fd] px-2 py-0.5 rounded-full">Problem section — right side</span>}
                  {i === 1 && <span className="ml-2 text-xs text-[#0080ff] bg-[#e8f4fd] px-2 py-0.5 rounded-full">Solution section — left side</span>}
                  {i > 1 && <span className="ml-2 text-xs text-gray-400">(not displayed on detail page)</span>}
                </div>
                <button onClick={() => removeItem("screenshots", i)} className="text-gray-300 hover:text-red-400 text-xs transition-colors">✕ Remove</button>
              </div>
              <ImageUpload value={url} onChange={(v) => setItem("screenshots", i, v)} folder="projects/screenshots" label="" />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Field label="Tech Stack" textarea rows={2} value={form.techStack} onChange={(v) => set("techStack", v)} placeholder="Flutter, Firebase, Dart, GetX" hint="Comma-separated — each item becomes a chip on the detail page." />
        </div>

        <ArrayField label="Key Features" items={form.features}
          onAdd={() => addItem("features")} onRemove={(i) => removeItem("features", i)}
          onChange={(i, v) => setItem("features", i, v)} placeholder="Describe a feature..." />

        <button onClick={save} disabled={saving}
          className="mt-8 w-full bg-[#0080ff] text-white font-semibold py-3 rounded-xl hover:bg-[#01579b] transition-colors disabled:opacity-50">
          {saving ? "Saving..." : editDocId ? "Update Project" : "Add Project"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#132238] text-lg">{projects.length} Projects</h2>
        <button onClick={openAdd}
          className="bg-[#0080ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#01579b] transition-colors">
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No projects yet.</p>
          <button onClick={openAdd} className="text-[#0080ff] underline text-sm">Add your first project</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p._docId} className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
            {p.image && (
              <img src={p.image} alt={p.title} className="w-full h-36 object-cover rounded-lg bg-gray-100" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[#e8f4fd] text-[#0080ff] px-2 py-0.5 rounded-full font-medium">
                  #{p.order}
                </span>
                <span className="text-xs text-gray-400">{p.category}</span>
              </div>
              <h3 className="font-bold text-[#132238]">{p.title}</h3>
              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{p.tagline}</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => openEdit(p)}
                className="flex-1 border border-[#0080ff] text-[#0080ff] text-sm py-2 rounded-lg hover:bg-[#e8f4fd] transition-colors">
                Edit
              </button>
              <button onClick={() => setConfirmDelete(p._docId)}
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
            <h3 className="font-bold text-[#132238] mb-2">Delete this project?</h3>
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

function ArrayField({ label, items, onAdd, onRemove, onChange, placeholder }) {
  const inputRefs = useRef([]);

  const handleKeyDown = (e, i) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    onAdd();
    // focus the new input on next render
    setTimeout(() => inputRefs.current[i + 1]?.focus(), 0);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-[#132238]">{label}</label>
        <button onClick={onAdd} className="text-xs text-[#0080ff] hover:underline font-medium">+ Add item</button>
      </div>
      {items.length === 0 && (
        <p className="text-xs text-gray-300 italic py-2">No items yet — click + Add item or press Enter</p>
      )}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            placeholder={placeholder}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] transition-colors"
          />
          <button onClick={() => onRemove(i)}
            className="text-gray-300 hover:text-red-400 px-2 transition-colors">✕</button>
        </div>
      ))}
    </div>
  );
}
