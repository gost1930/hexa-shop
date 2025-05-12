import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import {
  FiBold as EditorBoldIcon,
  FiItalic as EditorItalicIcon,
  FiList as EditorListIcon,
  FiType as EditorTypeIcon,
  FiLink as EditorLinkIcon,
  FiImage as EditorImageIcon,
  FiCoffee as EditorColorIcon,
  FiCornerUpLeft as UndoIcon,
  FiCornerUpRight as RedoIcon,
} from "react-icons/fi";

const Editor: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextStyle,
      Color,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: "<p>ابدأ الكتابة هنا...</p>",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  const insertImageFromUrl = () => {
    const url = window.prompt("أدخل رابط الصورة");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertLink = () => {
    const url = window.prompt("أدخل الرابط:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <style>
        {`
          .custom-editor-content img {
            max-width: 100%;
            height: auto;
            margin: 0.5rem 0;
          }
          .ProseMirror {
            outline: none;
            min-height: 300px;
          }
        `}
      </style>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-full transition-colors ${
              editor.isActive("bold")
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="غامق"
          >
            <EditorBoldIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-full transition-colors ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="مائل"
          >
            <EditorItalicIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded-full transition-colors ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="عنوان 1"
          >
            <EditorTypeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded-full transition-colors ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="عنوان 2"
          >
            <EditorTypeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-full transition-colors ${
              editor.isActive("bulletList")
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="قائمة نقطية"
          >
            <EditorListIcon className="w-5 h-5" />
          </button>

          {/* زر إدراج صورة من رابط */}
          <button
            onClick={insertImageFromUrl}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="إدراج صورة من رابط"
          >
            <EditorImageIcon className="w-5 h-5" />
          </button>

          {/* زر رفع صورة من الجهاز */}
          <label
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
            title="رفع صورة من الجهاز"
          >
            <EditorImageIcon className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    editor
                      .chain()
                      .focus()
                      .setImage({ src: reader.result as string })
                      .run();
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </label>

          {/* Color Picker */}
          <label
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
            title="لون النص"
          >
            <EditorColorIcon className="w-5 h-5" />
            <input
              type="color"
              onChange={(e) => setTextColor(e.target.value)}
              className="absolute opacity-0 w-0 h-0"
            />
          </label>

          {/* زر إدراج رابط */}
          <button
            onClick={insertLink}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="إدراج رابط"
          >
            <EditorLinkIcon className="w-5 h-5" />
          </button>

          {/* تراجع وإعادة */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="تراجع"
          >
            <UndoIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="إعادة"
          >
            <RedoIcon className="w-5 h-5" />
          </button>
        </div>

        {/* المحرر */}
        <div className="p-6 min-h-[300px] custom-editor-content">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* المعاينة */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 custom-editor-content">
        <h3 className="text-lg font-semibold mb-2">معاينة المحتوى:</h3>
        <div
          className="custom-editor-content"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
};

export default Editor;
