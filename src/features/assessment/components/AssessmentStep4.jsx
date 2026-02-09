import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep4 = () => {
  const { state, updateMentalHealth, updateContext } = useAssessment();
  const { t, tLabel } = useLanguage();
  const { mentalHealth, judgmentClarity, timePattern, timePressure } = state;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('step4Title')}</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">{t('step4MentalTitle')}</h3>
        <div className="space-y-2">
          {Object.entries(mentalHealth).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateMentalHealth(key, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{tLabel(key)}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">{t('step4MentalNote')}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">{t('step4ClarityTitle')} ({judgmentClarity}/10)</h3>
        <p className="text-sm text-gray-600 mb-2">{t('step4ClarityDesc')}</p>
        <ScoreSlider
          label={t('step4ClarityTitle')}
          value={judgmentClarity}
          onChange={(value) => updateContext('judgmentClarity', value)}
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">{t('step4TimeTitle')}</h3>
        <select
          value={timePattern}
          onChange={(e) => updateContext('timePattern', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="stable">{t('step4TimeStable')}</option>
          <option value="increasing">{t('step4TimeIncreasing')}</option>
          <option value="fluctuating">{t('step4TimeFluctuating')}</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t('step4PressureTitle')} ({timePressure}/10)</h3>
        <p className="text-sm text-gray-600 mb-2">{t('step4PressureDesc')}</p>
        <ScoreSlider
          label={t('step4PressureTitle')}
          value={timePressure}
          onChange={(value) => updateContext('timePressure', value)}
          min={1}
          max={10}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {t('step4PressureLabels').split(' / ').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep4;
