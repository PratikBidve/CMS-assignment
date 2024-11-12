// app/components/PreviewComponent.tsx

import React from 'react';

export default function PreviewComponent({ content }) {
  return (
    <div className="preview p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
      <div className="text-lg leading-relaxed">{content.body}</div>
    </div>
  );
}
