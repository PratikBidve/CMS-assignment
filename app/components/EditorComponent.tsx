// app/components/EditorComponent.tsx

import React from 'react';

export default function EditorComponent({ content, onChange }) {
  const handleContentChange = (event) => {
    const updatedContent = { ...content, body: event.target.value };
    onChange(updatedContent);
  };

  return (
    <div>
      <input
        type="text"
        value={content.title}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 mb-4 text-2xl font-semibold border border-gray-300 rounded-lg"
      />
      <textarea
        value={content.body}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        className="w-full h-80 p-2 text-lg border border-gray-300 rounded-lg"
      />
    </div>
  );
}
