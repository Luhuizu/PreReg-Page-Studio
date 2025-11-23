import React from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
};

