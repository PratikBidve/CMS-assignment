// app/posts/new/page.tsx

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../PostForm';

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const handleCreate = async (newPost: { title: string; slug: string; content: string }) => {
    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Navigate back to posts list after successful creation
      router.push('/posts');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <PostForm onSubmit={handleCreate} mode="create" />
    </div>
  );
};

export default CreatePostPage;
