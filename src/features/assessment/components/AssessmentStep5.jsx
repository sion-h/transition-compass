import React from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import ScoreSlider from '../../../shared/components/ScoreSlider';

const AssessmentStep5 = () => {
  const { state, updateContext } = useAssessment();
  const { context } = state;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">5단계: 사회적 위험 프로파일</h2>

      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">직업 위험도 ({context.occupation}/10)</label>
          <p className="text-sm text-gray-600 mb-2">현재 직장/학교에서 트랜지션 시 예상되는 위험도</p>
          <ScoreSlider
            label="직업 위험"
            value={context.occupation}
            onChange={(value) => updateContext('context', { ...context, occupation: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">비상 생활비 ({context.savingsMonths}개월)</label>
          <p className="text-sm text-gray-600 mb-2">수입 없이 생활 가능한 기간 (월세, 식비 등)</p>
          <ScoreSlider
            label="비상금"
            value={context.savingsMonths}
            onChange={(value) => updateContext('context', { ...context, savingsMonths: value })}
            min={0}
            max={24}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">가족 지지도 ({context.familySupport}/10)</label>
          <ScoreSlider
            label="가족 지지"
            value={context.familySupport}
            onChange={(value) => updateContext('context', { ...context, familySupport: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">친구 지지도 ({context.friendSupport}/10)</label>
          <ScoreSlider
            label="친구 지지"
            value={context.friendSupport}
            onChange={(value) => updateContext('context', { ...context, friendSupport: value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">물리적 안전(치안) ({context.physicalSafety}/10)</label>
          <p className="text-sm text-gray-600 mb-2">주변 환경에서 폭력, 차별, 괴롭힘 위험도</p>
          <ScoreSlider
            label="물리적 안전"
            value={context.physicalSafety}
            onChange={(value) => updateContext('context', { ...context, physicalSafety: value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep5;
