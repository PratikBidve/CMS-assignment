// app/pages/edit/[id]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageForm from '../../PageForm';

const EditPage: React.FC = () => {
  const [pageData, setPageData] = useState<{ title: string; slug: string; content: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`/api/pages/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch page data');
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (id) {
      fetchPageData();
    }
  }, [id]);

  const handleUpdate = async (updatedPage: { title: string; slug: string; content: string }) => {
    try {
      const response = await fetch(`/api/pages/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPage),
      });

      if (!response.ok) {
        throw new Error('Failed to update page');
      }

      router.push('/pages');
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!pageData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Page</h1>
      <PageForm onSubmit={handleUpdate} initialData={pageData} mode="edit" />
    </div>
  );
};

export default EditPage;
