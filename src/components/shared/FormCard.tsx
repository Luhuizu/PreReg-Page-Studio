import React from 'react';

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {children}
    </div>
  );
};

