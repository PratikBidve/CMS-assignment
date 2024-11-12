"use client";

import React, { useEffect, useState } from 'react';
import PostForm from '../../PostForm';
import { useRouter, useParams } from 'next/navigation';

const EditPostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<{ title: string; slug: string; content: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (updatedPost: { title: string; slug: string; content: string }) => {
    try {
      const response = await fetch(`/api/posts/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      alert('Post updated successfully');
      router.push('/posts');
    } catch (error) {
      alert(error.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm onSubmit={handleUpdate} initialData={post} mode="edit" />
    </div>
  );
};

export default EditPostPage;
