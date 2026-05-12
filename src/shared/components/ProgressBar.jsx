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
            className="px-3 py-1 text-sm bg-white border border-trans-pink text-rose-700 rounded flex items-center gap-1 hover:bg-trans-pink/10 transition-colors"
          >
            <Home className="w-3 h-3" />
            {t('home')}
          </button>
        )}
      </div>
      <div className="w-full bg-white/50 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-trans-blue to-trans-pink h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
