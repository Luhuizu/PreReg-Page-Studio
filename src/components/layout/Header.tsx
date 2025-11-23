import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
          <span className="text-gray-400 text-xs">Logo</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">PreReg Page Studio</h1>
      </div>
    </header>
  );
};

