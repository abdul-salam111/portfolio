import { useState, useEffect } from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";

const empty = { order: "", name: "", designation: "", message: "", quote: "" };

export default function AdminTestimonials() {
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
      const snap = await getDocs(query(collection(db, "testimonials"), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditDocId(null); setView("form"); };
  const openEdit = (t) => { setForm(t); setEditDocId(t._docId); setView("form"); };
  const cancel = () => { setView("list"); setForm(empty); setEditDocId(null); };
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    if (!form.name || !form.message) return alert("Name and Message are required.");
    setSaving(true);
    const { _docId, ...data } = form;
    data.order = Number(data.order) || 0;
    try {
      if (editDocId) {
        await updateDoc(doc(db, "testimonials", editDocId), data);
      } else {
        await addDoc(collection(db, "testimonials"), data);
      }
      cancel();
      await load();
    } catch (e) { console.error(e); alert("Save failed. Check console."); }
    setSaving(false);
  };

  const del = async (docId) => {
    try { await deleteDoc(doc(db, "testimonials", docId)); await load(); } catch {}
    setConfirmDelete(null);
  };

  if (loading) return <p className="text-center py-20 text-gray-400">Loading testimonials...</p>;

  if (view === "form") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#132238]">
            {editDocId ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <button onClick={cancel} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancel</button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Order" type="number" value={form.order} onChange={(v) => set("order", v)} hint="Controls display order (1 = first)" />
          <Field label="Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. John Smith" />
          <div className="sm:col-span-2">
            <Field label="Designation" value={form.designation} onChange={(v) => set("designation", v)} placeholder="e.g. Managing Director, ABC Company" />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Message *"
              textarea
              rows={2}
              value={form.message}
              onChange={(v) => set("message", v)}
              hint="Short headline shown above the quote — 1–2 sentences."
              placeholder="Working with this team was a fantastic experience..."
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Full Quote"
              textarea
              rows={4}
              value={form.quote}
              onChange={(v) => set("quote", v)}
              hint="The longer paragraph shown in quotes."
              placeholder="From the initial consultation to the final delivery..."
            />
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-8 w-full bg-[#0080ff] text-white font-semibold py-3 rounded-xl hover:bg-[#01579b] transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editDocId ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#132238] text-lg">{items.length} Testimonials</h2>
        <button
          onClick={openAdd}
          className="bg-[#0080ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#01579b] transition-colors"
        >
          + Add Testimonial
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No testimonials yet.</p>
          <button onClick={openAdd} className="text-[#0080ff] underline text-sm">Add your first testimonial</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t._docId} className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-[#e8f4fd] text-[#0080ff] px-2 py-0.5 rounded-full font-medium">
                  #{t.order}
                </span>
              </div>
              <h3 className="font-bold text-[#132238]">{t.name}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{t.designation}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 italic">"{t.message}"</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => openEdit(t)}
                className="flex-1 border border-[#0080ff] text-[#0080ff] text-sm py-2 rounded-lg hover:bg-[#e8f4fd] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(t._docId)}
                className="flex-1 border border-red-300 text-red-400 text-sm py-2 rounded-lg hover:bg-red-50 transition-colors"
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
            <h3 className="font-bold text-[#132238] mb-2">Delete this testimonial?</h3>
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

function Field({ label, value, onChange, type = "text", textarea = false, rows = 3, hint, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#132238] mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] resize-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] transition-colors"
        />
      )}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
