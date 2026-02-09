import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep2 = () => {
  const { state, updateScore } = useAssessment();
  const { t, tLabel } = useLanguage();
  const { euphoria } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('step2Title')}</h2>
      <p className="text-sm text-gray-600 mb-4">{t('step2Desc')}</p>

      <div className="space-y-4">
        {Object.entries(euphoria).map(([key, value]) => (
          <ScoreSlider
            key={key}
            label={tLabel(key)}
            value={value}
            onChange={(newValue) => updateScore('euphoria', key, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentStep2;
