import { useRef, useState } from "react";
import { uploadImage } from "../../services/api";

export default function ImageUpload({ value, onChange, folder = "uploads", label = "Image" }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null); // null = idle, 0-100 = uploading

  // fetch() exposes no upload progress, so show an indeterminate state instead
  // of the byte-accurate bar Firebase's resumable upload provided.
  const handleFile = async (file) => {
    if (!file) return;
    setProgress(0);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (e) {
      alert("Upload failed: " + e.message);
    } finally {
      setProgress(null);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-[#132238] mb-1.5">{label}</label>

      {/* Preview */}
      {value && progress === null && (
        <img src={value} alt="preview" className="w-full h-32 object-cover rounded-xl mb-2 bg-gray-100" />
      )}

      {/* Progress bar */}
      {progress !== null && (
        <div className="mb-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0080ff] rounded-full animate-pulse w-full" />
          </div>
          <p className="text-xs text-[#0080ff] mt-1">Uploading…</p>
        </div>
      )}

      {/* Buttons row */}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={progress !== null}
          onClick={() => inputRef.current?.click()}
          className="flex-1 border border-[#0080ff] text-[#0080ff] text-sm py-2.5 rounded-xl hover:bg-[#e8f4fd] transition-colors disabled:opacity-50"
        >
          {progress !== null ? "Uploading…" : value ? "Replace Image" : "Choose File"}
        </button>
        {value && progress === null && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-300 hover:text-red-400 px-3 transition-colors text-lg"
            title="Remove image"
          >
            ✕
          </button>
        )}
      </div>

      {/* Manual URL fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="mt-2 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#0080ff] transition-colors text-gray-500"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
