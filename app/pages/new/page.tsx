"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PageForm from '../PageForm';

const CreatePagePage: React.FC = () => {
  const router = useRouter();

  const handleCreate = async (newPage: { title: string; slug: string; content: string }) => {
    try {
      const response = await fetch('/api/pages/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPage),
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      router.push('/pages');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Page</h1>
      <PageForm onSubmit={handleCreate} mode="create" />
    </div>
  );
};

export default CreatePagePage;
