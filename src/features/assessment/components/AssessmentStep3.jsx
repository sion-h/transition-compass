import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep3 = () => {
  const { state, updateScore } = useAssessment();
  const { t, tLabel } = useLanguage();
  const { socialDesire, medicalDesire } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('step3Title')}</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">{t('step3SocialTitle')}</h3>
        <p className="text-sm text-gray-600 mb-3">{t('step3SocialDesc')}</p>
        <div className="space-y-4">
          {Object.entries(socialDesire).map(([key, value]) => (
            <ScoreSlider
              key={key}
              label={tLabel(key)}
              value={value}
              onChange={(newValue) => updateScore('socialDesire', key, newValue)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t('step3MedicalTitle')}</h3>
        <p className="text-sm text-gray-600 mb-3">{t('step3MedicalDesc')}</p>
        <div className="space-y-4">
          {Object.entries(medicalDesire).map(([key, value]) => (
            <ScoreSlider
              key={key}
              label={tLabel(key)}
              value={value}
              onChange={(newValue) => updateScore('medicalDesire', key, newValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep3;
