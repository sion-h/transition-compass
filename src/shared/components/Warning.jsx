import React from 'react';
import { AlertCircle } from 'lucide-react';

const Warning = ({ title, message, type = 'warning' }) => {
  const colorClasses = {
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    danger: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    success: 'bg-green-50 border-green-400 text-green-800'
  };

  const iconColors = {
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
    success: 'text-green-600'
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[type]}`}>
      <div className="flex items-start gap-2">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[type]}`} />
        <div>
          {title && <div className="font-bold mb-1">{title}</div>}
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
