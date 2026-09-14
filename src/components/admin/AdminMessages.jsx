import { useState, useEffect } from "react";
import { messages as api } from "../../services/api";

const fmt = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function AdminMessages({ onUnreadChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await api.listAll();
      setItems(rows);
      onUnreadChange?.(rows.filter((m) => !m.read).length);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRead = async (m, read) => {
    try {
      await api.setRead(m.id, read);
      await load();
    } catch (e) { alert(e.message); }
  };

  const expand = (m) => {
    setOpen(open === m.id ? null : m.id);
    if (!m.read) toggleRead(m, true);
  };

  const del = async (id) => {
    try { await api.remove(id); await load(); } catch (e) { alert(e.message); }
    setConfirmDelete(null);
  };

  if (loading) return <p className="text-center py-20 text-gray-400">Loading messages…</p>;

  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-[#132238] font-semibold">No messages yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Submissions from your contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((m) => (
        <div
          key={m.id}
          className={`bg-white rounded-xl shadow-sm border-l-4 transition-colors ${
            m.read ? "border-transparent" : "border-[#0080ff]"
          }`}
        >
          <button
            onClick={() => expand(m)}
            className="w-full text-left p-5 flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {!m.read && (
                  <span className="text-[10px] font-bold text-white bg-[#0080ff] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                )}
                <span className="font-semibold text-[#132238]">{m.name}</span>
                <span className="text-gray-400 text-sm truncate">{m.email}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {m.subject || m.message}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{fmt(m.createdAt)}</span>
          </button>

          {open === m.id && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                {[
                  ["Email", m.email], ["Location", m.location],
                  ["Budget", m.budget], ["Subject", m.subject],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}>
                    <span className="text-gray-400">{k}: </span>
                    <span className="text-[#132238]">{v}</span>
                  </div>
                ))}
              </div>

              <p className="whitespace-pre-wrap text-[#132238] text-sm bg-[#f6f8fa] rounded-xl p-4">
                {m.message}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "your message")}`}
                  className="bg-[#0080ff] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#01579b] transition-colors"
                >
                  Reply by email
                </a>
                <button
                  onClick={() => toggleRead(m, !m.read)}
                  className="text-sm text-gray-500 hover:text-[#0080ff] transition-colors"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                {confirmDelete === m.id ? (
                  <span className="text-sm">
                    <span className="text-gray-500">Delete?</span>
                    <button onClick={() => del(m.id)} className="text-red-500 font-semibold ml-2">Yes</button>
                    <button onClick={() => setConfirmDelete(null)} className="text-gray-400 ml-2">No</button>
                  </span>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(m.id)}
                    className="text-sm text-gray-300 hover:text-red-400 transition-colors ml-auto"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
