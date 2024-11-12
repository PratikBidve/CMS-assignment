"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/all');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/posts/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
      <button
        onClick={() => router.push('/posts/new')}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Create New Post
      </button>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600">Slug: {post.slug}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => router.push(`/posts/edit/${post.id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
