import { useState, useEffect } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import ImageUpload from "./ImageUpload";

const empty = { order: "", name: "", logo: "" };

export default function AdminClients() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(empty);
  const [editDocId, setEditDocId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, "clients"), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditDocId(null); setView("form"); };
  const openEdit = (c) => { setForm(c); setEditDocId(c._docId); setView("form"); };
  const cancel = () => { setView("list"); setForm(empty); setEditDocId(null); };
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    if (!form.name || !form.logo) return alert("Name and Logo are required.");
    setSaving(true);
    const { _docId, ...data } = form;
    data.order = Number(data.order) || 0;
    try {
      if (editDocId) {
        await updateDoc(doc(db, "clients", editDocId), data);
      } else {
        await addDoc(collection(db, "clients"), data);
      }
      cancel();
      await load();
    } catch (e) { console.error(e); alert("Save failed. Check console."); }
    setSaving(false);
  };

  const del = async (docId) => {
    try { await deleteDoc(doc(db, "clients", docId)); await load(); } catch {}
    setConfirmDelete(null);
  };

  if (loading) return <p className="text-center py-20 text-gray-400">Loading clients...</p>;

  if (view === "form") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#132238]">
            {editDocId ? "Edit Client" : "New Client"}
          </h2>
          <button onClick={cancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Order" type="number" value={form.order} onChange={(v) => set("order", v)} hint="Controls marquee order" />
            <Field label="Client Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. Google" />
          </div>
          <ImageUpload
            label="Logo Image *"
            value={form.logo}
            onChange={(v) => set("logo", v)}
            folder="clients"
          />
          <p className="text-xs text-gray-400">
            Use a transparent PNG or SVG-exported PNG. Recommended height: 40–60px, white or gray tone for consistent look.
          </p>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-8 w-full bg-[#0080ff] text-white font-semibold py-3 rounded-xl hover:bg-[#01579b] transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editDocId ? "Update Client" : "Add Client"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#132238] text-lg">{items.length} Clients</h2>
        <button
          onClick={openAdd}
          className="bg-[#0080ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#01579b] transition-colors"
        >
          + Add Client
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No clients yet. Static brand logos will be shown on the site.</p>
          <button onClick={openAdd} className="text-[#0080ff] underline text-sm">Add your first client</button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((c) => (
          <div key={c._docId} className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-3">
            {c.logo && (
              <img src={c.logo} alt={c.name} className="h-10 w-full object-contain" />
            )}
            <div className="text-center">
              <span className="text-xs bg-[#e8f4fd] text-[#0080ff] px-2 py-0.5 rounded-full font-medium">#{c.order}</span>
              <p className="text-sm font-medium text-[#132238] mt-1">{c.name}</p>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => openEdit(c)}
                className="flex-1 border border-[#0080ff] text-[#0080ff] text-xs py-1.5 rounded-lg hover:bg-[#e8f4fd] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(c._docId)}
                className="flex-1 border border-red-300 text-red-400 text-xs py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-[#132238] mb-2">Delete this client?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={() => del(confirmDelete)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", hint, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#132238] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] transition-colors"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
