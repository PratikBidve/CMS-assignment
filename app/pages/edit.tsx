// app/pages/edit.tsx

import PostEditor from '../components/PostEditor';

export default function EditPage() {
  // Simulate initial content (could be fetched from an API or database)
  const initialContent = {
    title: "Sample Post",
    body: "This is the content of the sample post. Start editing to see changes."
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <PostEditor initialContent={initialContent} />
    </div>
  );
}
