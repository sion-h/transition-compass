import React from 'react';
import { Home } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ProgressBar = ({ currentStep, totalSteps, onHomeClick }) => {
  const { t } = useLanguage();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">
          {t('progress')}: {currentStep}/{totalSteps}
        </div>
        {onHomeClick && (
          <button
            onClick={onHomeClick}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            {t('home')}
          </button>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
