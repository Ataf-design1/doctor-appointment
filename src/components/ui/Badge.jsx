import React from 'react';

export const Badge = ({ category, className = '' }) => {
  let colorClass = '';
  
  switch (category) {
    case 'ROUTINE_CHECKUP':
      colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      break;
    case 'SICK_VISIT':
      colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      break;
    case 'CONSULTATION':
      colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      break;
    case 'EMERGENCY':
      colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      break;
    case 'EXAMINATION':
      colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}
    >
      {category.replace('_', ' ')}
    </span>
  );
};
