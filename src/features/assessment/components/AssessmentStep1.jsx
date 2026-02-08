import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep1 = () => {
  const { state, updateScore } = useAssessment();
  const { dysphoria } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">1단계: 디스포리아 (현재 불편함)</h2>
      <p className="text-sm text-gray-600 mb-4">
        현재 신체나 젠더 표현에서 느끼는 불편함을 평가하세요 (0=전혀 없음, 10=극도로 심함)
      </p>

      <div className="space-y-4">
        {Object.entries(dysphoria).map(([key, value]) => (
          <ScoreSlider
            key={key}
            label={key}
            value={value}
            onChange={(newValue) => updateScore('dysphoria', key, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentStep1;
