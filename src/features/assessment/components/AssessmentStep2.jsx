import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep2 = () => {
  const { state, updateScore } = useAssessment();
  const { euphoria } = state.scores;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">2단계: 유포리아 (젠더 표현 시 기쁨)</h2>
      <p className="text-sm text-gray-600 mb-4">
        원하는 젠더로 표현될 때 느끼는 기쁨이나 안도감을 평가하세요 (0=전혀 없음, 10=큰 기쁨)
      </p>

      <div className="space-y-4">
        {Object.entries(euphoria).map(([key, value]) => (
          <ScoreSlider
            key={key}
            label={key}
            value={value}
            onChange={(newValue) => updateScore('euphoria', key, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentStep2;
