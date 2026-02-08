import React from 'react';
import { AlertCircle, Lightbulb, Users, Pill, ChevronRight } from 'lucide-react';
import { useAssessment } from '../../../contexts/AssessmentContext';
import { calculateAverage, getHighItems, getLowItems, calculateSocialRisk } from '../../../shared/utils/calculations';
import { getPersonalizedSolution } from '../../../shared/utils/recommendations';
import Warning from '../../../shared/components/Warning';

const AssessmentResults = () => {
  const { state } = useAssessment();
  const { scores, mentalHealth, judgmentClarity, timePattern, context } = state;

  // 평균 계산
  const avgDysphoria = calculateAverage(scores.dysphoria);
  const avgEuphoria = calculateAverage(scores.euphoria);
  const avgSocial = calculateAverage(scores.socialDesire);
  const avgMedical = calculateAverage(scores.medicalDesire);
  const socialRisk = calculateSocialRisk(context);

  // 높음/낮음 항목
  const highDysphoria = getHighItems(scores.dysphoria, 7);
  const lowDysphoria = getLowItems(scores.dysphoria, 3);
  const highEuphoria = getHighItems(scores.euphoria, 7);
  const highMedical = getHighItems(scores.medicalDesire, 7);
  const lowMedical = getLowItems(scores.medicalDesire, 3);

  // 맞춤 솔루션
  const solution = getPersonalizedSolution(scores, context, mentalHealth, judgmentClarity, timePattern);

  return (
    <div className="space-y-6">
      {/* 판단 명료성 경고 */}
      {judgmentClarity < 5 && (
        <Warning
          type="warning"
          title="판단 명료성 주의"
          message={`현재 판단 명료성이 낮습니다 (${judgmentClarity}/10). 혼란스럽거나 외부 압력이 있을 때는 중요한 결정을 서두르지 마세요. 시간을 가지고 천천히 생각하는 것이 현명합니다.`}
        />
      )}

      {/* 분석 점수 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">분석 결과</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded p-4 bg-red-50">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-700" />
              <div className="font-bold text-red-900">디스포리아</div>
            </div>
            <div className="text-3xl font-bold text-red-700 mb-2">{avgDysphoria.toFixed(1)}/10</div>
            {highDysphoria.length > 0 && (
              <div className="text-sm text-red-800">
                <strong>높은 항목:</strong> {highDysphoria.join(', ')}
              </div>
            )}
            {lowDysphoria.length > 0 && (
              <div className="text-sm text-red-600 mt-1">
                <strong>낮은 항목:</strong> {lowDysphoria.join(', ')}
              </div>
            )}
          </div>

          <div className="border rounded p-4 bg-yellow-50">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-yellow-700" />
              <div className="font-bold text-yellow-900">유포리아</div>
            </div>
            <div className="text-3xl font-bold text-yellow-700 mb-2">{avgEuphoria.toFixed(1)}/10</div>
            {highEuphoria.length > 0 && (
              <div className="text-sm text-yellow-800">
                <strong>높은 항목:</strong> {highEuphoria.join(', ')}
              </div>
            )}
          </div>

          <div className="border rounded p-4 bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-700" />
              <div className="font-bold text-green-900">사회적 욕구</div>
            </div>
            <div className="text-3xl font-bold text-green-700">{avgSocial.toFixed(1)}/10</div>
          </div>

          <div className="border rounded p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-5 h-5 text-blue-700" />
              <div className="font-bold text-blue-900">의료적 욕구</div>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">{avgMedical.toFixed(1)}/10</div>
            {highMedical.length > 0 && (
              <div className="text-sm text-blue-800">
                <strong>높은 항목:</strong> {highMedical.join(', ')}
              </div>
            )}
            {lowMedical.length > 0 && (
              <div className="text-sm text-blue-600 mt-1">
                <strong>낮은 항목:</strong> {lowMedical.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 경고들 */}
      {solution.warnings && solution.warnings.length > 0 && (
        <div className="space-y-3">
          {solution.warnings.map((warning, idx) => (
            <Warning
              key={idx}
              type="warning"
              title={warning.title}
              message={warning.message}
            />
          ))}
        </div>
      )}

      {/* 맞춤 솔루션 */}
      <div className={`p-6 rounded-lg border-2 ${
        solution.type === 'wait' ? 'bg-yellow-50 border-yellow-400' :
        solution.type === 'social' ? 'bg-green-50 border-green-400' :
        solution.type === 'medical' ? 'bg-blue-50 border-blue-400' :
        solution.type === 'explore' ? 'bg-purple-50 border-purple-400' :
        'bg-indigo-50 border-indigo-400'
      }`}>
        <h3 className="text-2xl font-bold mb-3">{solution.primary}</h3>
        <p className="text-gray-700 mb-4">{solution.reason}</p>

        <div className="space-y-2">
          <div className="font-semibold">제안:</div>
          <ul className="space-y-1">
            {solution.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 맥락 정보 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-4">맥락 정보</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="border rounded p-3">
            <div className="text-sm text-gray-600">사회적 위험도</div>
            <div className="text-2xl font-bold text-orange-700">{socialRisk.toFixed(1)}/10</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-600">비상 생활비</div>
            <div className="text-2xl font-bold text-green-700">{context.savingsMonths}개월</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-600">판단 명료성</div>
            <div className="text-2xl font-bold text-purple-700">{judgmentClarity}/10</div>
          </div>
          <div className="border rounded p-3">
            <div className="text-sm text-gray-600">시간 압박</div>
            <div className="text-2xl font-bold text-indigo-700">{state.timePressure}/10</div>
          </div>
        </div>
      </div>

      <Warning
        type="info"
        message="이 결과는 제안일 뿐 처방이 아닙니다. 당신이 원하는 것을 선택하세요. 트랜지션에 정해진 경로는 없습니다."
      />
    </div>
  );
};

export default AssessmentResults;
