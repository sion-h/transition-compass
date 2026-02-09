import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep5 = () => {
  const { state, updateContext } = useAssessment();
  const { t } = useLanguage();
  const { context } = state;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('step5Title')}</h2>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">{t('step5Occupation')} ({context.occupation}/10)</label>
          <p className="text-sm text-gray-600 mb-2">{t('step5OccupationDesc')}</p>
          <ScoreSlider
            label={t('step5OccupationLabel')}
            value={context.occupation}
            onChange={(value) => updateContext('context', { ...context, occupation: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">{t('step5Savings')} ({context.savingsMonths}{t('months')})</label>
          <p className="text-sm text-gray-600 mb-2">{t('step5SavingsDesc')}</p>
          <ScoreSlider
            label={t('step5SavingsLabel')}
            value={context.savingsMonths}
            onChange={(value) => updateContext('context', { ...context, savingsMonths: value })}
            min={0}
            max={24}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">{t('step5Family')} ({context.familySupport}/10)</label>
          <ScoreSlider
            label={t('step5FamilyLabel')}
            value={context.familySupport}
            onChange={(value) => updateContext('context', { ...context, familySupport: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">{t('step5Friend')} ({context.friendSupport}/10)</label>
          <ScoreSlider
            label={t('step5FriendLabel')}
            value={context.friendSupport}
            onChange={(value) => updateContext('context', { ...context, friendSupport: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">{t('step5Safety')} ({context.physicalSafety}/10)</label>
          <p className="text-sm text-gray-600 mb-2">{t('step5SafetyDesc')}</p>
          <ScoreSlider
            label={t('step5SafetyLabel')}
            value={context.physicalSafety}
            onChange={(value) => updateContext('context', { ...context, physicalSafety: value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep5;
