import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep3 = () => {
  const { state, updateScore } = useAssessment();
  const { socialDesire, medicalDesire } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">3단계: 사회적 & 의료적 욕구</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">사회적 트랜지션 욕구</h3>
        <p className="text-sm text-gray-600 mb-3">
          이름, 호칭, 외모 변화 등에 대한 욕구 (0=전혀 없음, 10=매우 강함)
        </p>
        <div className="space-y-4">
          {Object.entries(socialDesire).map(([key, value]) => (
            <ScoreSlider
              key={key}
              label={key}
              value={value}
              onChange={(newValue) => updateScore('socialDesire', key, newValue)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">의료적 트랜지션 욕구</h3>
        <p className="text-sm text-gray-600 mb-3">
          호르몬, 수술 등 의료적 개입에 대한 욕구 (0=전혀 없음, 10=매우 강함)
        </p>
        <div className="space-y-4">
          {Object.entries(medicalDesire).map(([key, value]) => (
            <ScoreSlider
              key={key}
              label={key}
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
