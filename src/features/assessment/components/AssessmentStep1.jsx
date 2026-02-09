import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep1 = () => {
  const { state, updateScore } = useAssessment();
  const { t, tLabel } = useLanguage();
  const { dysphoria } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('step1Title')}</h2>
      <p className="text-sm text-gray-600 mb-4">{t('step1Desc')}</p>

      <div className="space-y-4">
        {Object.entries(dysphoria).map(([key, value]) => (
          <ScoreSlider
            key={key}
            label={tLabel(key)}
            value={value}
            onChange={(newValue) => updateScore('dysphoria', key, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentStep1;
