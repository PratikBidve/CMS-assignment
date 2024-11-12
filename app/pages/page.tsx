"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import PageList to ensure client-side rendering
const PageList = dynamic(() => import('./PageList'), { ssr: false });

const PagesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <PageList />
    </div>
  );
};

export default PagesPage;
