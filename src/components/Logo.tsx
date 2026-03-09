import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <span className="font-bold text-2xl tracking-tight">
        <span className="text-blue-900">Desk</span>
        <span className="text-red-500 mx-1">&</span>
        <span className="text-blue-900">Net</span>
      </span>
    </div>
  );
};

export default Logo;
