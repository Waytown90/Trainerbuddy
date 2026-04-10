import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <rect width="100" height="100" rx="24" fill="currentColor" />
      <path 
        d="M35 35H65M50 35V70" 
        stroke="white" 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
      <circle cx="70" cy="70" r="10" fill="#60A5FA" />
    </svg>
  );
};

export default Logo;
