import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-2xl p-3 mr-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Personal Finance Tracker
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2">
              <span className="text-white font-semibold text-sm">Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
