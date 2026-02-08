import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep4 = () => {
  const { state, updateMentalHealth, updateContext } = useAssessment();
  const { mentalHealth, judgmentClarity, timePattern, timePressure } = state;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">4단계: 맥락 및 판단 명료성</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">현재 정신건강 (해당사항 모두 체크)</h3>
        <div className="space-y-2">
          {Object.entries(mentalHealth).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateMentalHealth(key, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{key}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          정신건강 문제가 있어도 트랜지션 가능합니다. 추가 지원이 필요할 수 있습니다.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">판단 명료성 ({judgmentClarity}/10)</h3>
        <p className="text-sm text-gray-600 mb-2">
          지금 당신의 판단이 얼마나 명료하고 확신이 있나요?
          혼란스럽거나 외부 압력이 있다면 낮은 점수를 주세요.
        </p>
        <ScoreSlider
          label="판단 명료성"
          value={judgmentClarity}
          onChange={(value) => updateContext('judgmentClarity', value)}
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">시간 경과</h3>
        <select
          value={timePattern}
          onChange={(e) => updateContext('timePattern', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="stable">일관됨 (수년간 비슷)</option>
          <option value="increasing">점점 강해짐</option>
          <option value="fluctuating">오락가락함</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">시간 압박 ({timePressure}/10)</h3>
        <p className="text-sm text-gray-600 mb-2">
          트랜지션을 얼마나 급하게 시작하고 싶나요? (1=서두르지 않음, 10=매우 급함)
        </p>
        <ScoreSlider
          label="시간 압박"
          value={timePressure}
          onChange={(value) => updateContext('timePressure', value)}
          min={1}
          max={10}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>2-3년+</span>
          <span>1-2년</span>
          <span>6-12개월</span>
          <span>즉시</span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep4;
