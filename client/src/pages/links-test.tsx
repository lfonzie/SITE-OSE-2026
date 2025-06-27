import React from 'react';
import Navigation from '@/components/navigation';

export default function LinksSimple() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Links Úteis</h1>
          <p className="text-lg text-gray-600">Esta página está funcionando!</p>
        </div>
      </section>
    </div>
  );
}