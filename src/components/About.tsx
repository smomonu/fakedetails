import React from 'react';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Fake Detail
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About</h1>
          <p className="text-gray-700 leading-relaxed">
                          Fake Detail is a suite of handy generators for developers and designers. Build more, mock faster—without real data.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About; 