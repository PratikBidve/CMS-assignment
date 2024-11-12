"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
}

const PageList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages/all');
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        setPages(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    
    try {
      const response = await fetch(`/api/pages/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      setPages(pages.filter((page) => page.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pages</h1>
      <button
        onClick={() => router.push('/pages/new')}
        className="mb-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
      >
        Create New Page
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {pages.length > 0 ? (
        <ul>
          {pages.map((page) => (
            <li key={page.id} className="mb-4 p-4 bg-white border border-gray-200 rounded-md shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{page.title}</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => router.push(`/pages/edit/${page.id}`)}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">Slug: {page.slug}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No pages available.</p>
      )}
    </div>
  );
};

export default PageList;
