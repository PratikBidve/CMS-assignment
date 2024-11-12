"use client";

import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface PostFormProps {
  onSubmit: (post: { title: string; slug: string; content: string }) => void;
  initialData?: { title: string; slug: string; content: string };
  mode: "create" | "edit";
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData, mode }) => {
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
        {mode === "create" ? "Create New Post" : "Edit Post"}
      </h2>
      
      <button
        onClick={togglePreview}
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
      >
        {isPreview ? "Back to Edit" : "Preview"}
      </button>

      {isPreview ? (
        <div className="preview border p-4 rounded-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-800 mb-2"><em>Slug: {slug}</em></p>
          <div
            className="content-preview text-gray-900" // Ensures dark text color in preview
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      ) : (
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
              apiKey="xr2uk08q7hrr3cn2uylrrot6f8cadx5x5iqbilwsjjworpjr"
              initialValue={content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                  'importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request: unknown, respondWith: { string: (callback: () => Promise<string>) => void }) => 
                  respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                exportword_converter_options: { 'document': { 'size': 'Letter' } },
                importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline', 'defaults': 'inline', } },
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
      )}
    </div>
  );
};

export default PostForm;
