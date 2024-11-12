// app/components/PostEditor.tsx

"use client";
import { useState } from 'react';
import EditorComponent from './EditorComponent';
import PreviewComponent from './PreviewComponent';

export default function PostEditor({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Edit Post</h1>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isPreview ? 'Back to Edit' : 'Preview'}
        </button>
      </header>

      <main>
        {isPreview ? (
          <PreviewComponent content={content} />
        ) : (
          <EditorComponent content={content} onChange={setContent} />
        )}
      </main>
    </div>
  );
}
