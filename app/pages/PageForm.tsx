"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TinyMCE editor component for client-side only
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor as any), {
  ssr: false,
});

interface PageFormProps {
  onSubmit: (page: { title: string; slug: string; content: string }) => void;
  initialData?: { title: string; slug: string; content: string };
  mode: "create" | "edit";
}

const PageForm: React.FC<PageFormProps> = ({ onSubmit, initialData, mode }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, slug, content });
  };

  const togglePreview = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {mode === "create" ? "Create New Page" : "Edit Page"}
      </h2>

      {/* Preview Button */}
      <button
        onClick={togglePreview}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
      >
        {isPreview ? "Back to Edit" : "Preview"}
      </button>

      {isPreview ? (
        // Preview Mode Content
        <div className="preview border p-4 rounded-md">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-2"><em>Slug: {slug}</em></p>
          <div
            className="content-preview text-gray-800"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        // Form for Page Creation/Editing
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-2">Content</label>
            <Editor
              apiKey="xr2uk08q7hrr3cn2uylrrot6f8cadx5x5iqbilwsjjworpjr"  // TinyMCE API key
              initialValue={content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={(newContent: string) => setContent(newContent)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            {mode === "create" ? "Submit" : "Update"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PageForm;
