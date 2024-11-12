"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TinyMCE editor component to load only on the client side
const Editor = dynamic(() => import('@tinymce/tinymce-react').then((mod) => mod.Editor), {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, slug, content });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {mode === "create" ? "Create New Page" : "Edit Page"}
      </h2>
      
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
          apiKey="xr2uk08q7hrr3cn2uylrrot6f8cadx5x5iqbilwsjjworpjr"  // Your TinyMCE API key
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
          onEditorChange={(newContent) => setContent(newContent)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        {mode === "create" ? "Submit" : "Update"}
      </button>
    </form>
  );
};

export default PageForm;
