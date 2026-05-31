import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEffect, useCallback, useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: el => el.style.fontSize || null,
          renderHTML: attrs => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize: size => ({ chain }) => chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

const ToolBtn = ({ onClick, active, title, children, disabled, paint }) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    disabled={disabled}
    title={title}
    className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 select-none
      ${paint
        ? "bg-amber-400 text-white shadow-sm ring-2 ring-amber-300"
        : active
          ? "bg-[#0080ff] text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-100 hover:text-[#132238]"
      } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-1 self-center" />;

export default function RichTextEditor({ value, onChange, placeholder = "Write your blog content here…" }) {
  const imgInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [lh, setLh] = useState(1.5);
  const adjustLh = (delta) => setLh((l) => parseFloat(Math.min(3.0, Math.max(1.0, l + delta)).toFixed(1)));

  // Format Painter — use a ref so onSelectionUpdate closure always sees current value
  const paintingMarksRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-[#0080ff] underline" } }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "rounded-xl max-w-sm my-4" } }),
      TextStyle,
      FontSize,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onSelectionUpdate: ({ editor }) => {
      if (!paintingMarksRef.current) return;
      if (editor.state.selection.empty) return; // wait for actual text selection
      const m = paintingMarksRef.current;
      let chain = editor.chain().focus();
      if (m.bold) chain = chain.setBold(); else chain = chain.unsetMark("bold");
      if (m.italic) chain = chain.setItalic(); else chain = chain.unsetMark("italic");
      if (m.underline) chain = chain.setUnderline(); else chain = chain.unsetMark("underline");
      if (m.strike) chain = chain.setStrike(); else chain = chain.unsetMark("strike");
      if (m.code) chain = chain.setCode(); else chain = chain.unsetMark("code");
      if (m.link) chain = chain.setLink(m.link); else chain = chain.unsetLink();
      if (m.textAlign) chain = chain.setTextAlign(m.textAlign);
      chain.run();
      paintingMarksRef.current = null;
      setIsPainting(false);
    },
    editorProps: {
      attributes: {
        class: "min-h-[320px] px-4 py-3 text-[#132238] text-sm outline-none prose prose-sm max-w-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertImageByUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const uploadImage = useCallback((file) => {
    if (!file || !editor) return;
    const ext = file.name.split(".").pop();
    const path = `blog-content/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    setUploading(true);
    task.on(
      "state_changed",
      null,
      (err) => { console.error(err); alert("Upload failed: " + err.message); setUploading(false); },
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          editor.chain().focus().setImage({ src: url }).run();
          setUploading(false);
        });
      }
    );
  }, [editor]);

  const toggleFormatPainter = useCallback(() => {
    if (!editor) return;
    if (isPainting) {
      paintingMarksRef.current = null;
      setIsPainting(false);
      return;
    }
    paintingMarksRef.current = {
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
      link: editor.isActive("link") ? editor.getAttributes("link") : null,
      textAlign: ["left", "center", "right"].find((a) => editor.isActive({ textAlign: a })) || null,
    };
    setIsPainting(true);
  }, [editor, isPainting]);

  const adjustFontSize = useCallback((delta) => {
    if (!editor) return;
    const current = editor.getAttributes("textStyle").fontSize;
    const px = current ? parseInt(current, 10) : 16;
    const next = Math.min(72, Math.max(8, px + delta));
    editor.chain().focus().setFontSize(`${next}px`).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <>
    <style>{`.rte-content .ProseMirror, .rte-content .ProseMirror * { line-height: ${lh} !important; }`}</style>
    <div className="rte-content border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#0080ff] transition-colors">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 bg-gray-50 border-b border-gray-200">
        {/* History */}
        <ToolBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>↩</ToolBtn>
        <ToolBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>↪</ToolBtn>

        <Divider />

        {/* Font size */}
        <ToolBtn title="Decrease font size" onClick={() => adjustFontSize(-2)}>A−</ToolBtn>
        <span className="text-xs text-gray-400 px-1 select-none self-center min-w-[30px] text-center">
          {editor.getAttributes("textStyle").fontSize
            ? parseInt(editor.getAttributes("textStyle").fontSize, 10)
            : 16}
        </span>
        <ToolBtn title="Increase font size" onClick={() => adjustFontSize(2)}>A+</ToolBtn>

        <Divider />

        {/* Line height */}
        <ToolBtn title="Decrease line height" onClick={() => adjustLh(-0.1)}>≡−</ToolBtn>
        <span className="text-xs text-gray-400 px-1 select-none self-center min-w-[28px] text-center">{lh.toFixed(1)}</span>
        <ToolBtn title="Increase line height" onClick={() => adjustLh(0.1)}>≡+</ToolBtn>

        <Divider />

        {/* Format Painter */}
        <ToolBtn
          title={isPainting ? "Click to cancel — or select text to apply format" : "Format Painter: select source text first, then click this, then select target text"}
          onClick={toggleFormatPainter}
          paint={isPainting}
        >
          🖌
        </ToolBtn>

        <Divider />

        {/* Headings */}
        <ToolBtn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolBtn>
        <ToolBtn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolBtn>

        <Divider />

        {/* Inline marks */}
        <ToolBtn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></ToolBtn>
        <ToolBtn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></ToolBtn>
        <ToolBtn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></ToolBtn>
        <ToolBtn title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>{"`"}</ToolBtn>

        <Divider />

        {/* Alignment */}
        <ToolBtn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>≡L</ToolBtn>
        <ToolBtn title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>≡C</ToolBtn>
        <ToolBtn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>≡R</ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolBtn>
        <ToolBtn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolBtn>

        <Divider />

        {/* Block */}
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</ToolBtn>
        <ToolBtn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"</>"}</ToolBtn>
        <ToolBtn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>─</ToolBtn>

        <Divider />

        {/* Link */}
        <ToolBtn title="Link" active={editor.isActive("link")} onClick={setLink}>🔗</ToolBtn>

        {/* Image — upload from device */}
        <ToolBtn title="Upload image from device" onClick={() => imgInputRef.current?.click()} disabled={uploading}>
          {uploading ? "⏳" : "🖼"}
        </ToolBtn>

        {/* Image — insert by URL */}
        <ToolBtn title="Insert image by URL" onClick={insertImageByUrl} disabled={uploading}>URL🖼</ToolBtn>
      </div>

      {/* ── Paint mode hint ── */}
      {isPainting && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-700 font-medium">
          🖌 Format Painter active — select the text you want to apply this format to. Click 🖌 again to cancel.
        </div>
      )}

      {/* ── Editor area ── */}
      <div className={isPainting ? "bg-white cursor-crosshair" : "bg-white"}>
        <EditorContent editor={editor} />
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-1.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        {uploading && <span className="text-xs text-[#0080ff]">Uploading image…</span>}
        <span className="text-[10px] text-gray-400 ml-auto">
          {editor.storage.characterCount?.characters?.() ?? editor.getText().length} chars
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { uploadImage(e.target.files?.[0]); e.target.value = ""; }}
      />
    </div>
    </>
  );
}