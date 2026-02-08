import React from 'react';
import { AlertCircle } from 'lucide-react';

const TimelineInfo = ({ pathway }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-900 mb-4">📅 타임라인</h3>
        <p className="text-gray-700">
          의료적 트랜지션을 선택한다면 참고하세요. 이것은 평균적인 타임라인이며, 
          개인차가 큽니다.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
        <h4 className="font-bold text-xl text-orange-900 mb-4">예상 타임라인</h4>
        
        <div className="space-y-4 text-sm">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 font-bold text-orange-700">1개월</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">정신과 진단 과정</div>
              <div className="text-gray-600 mt-1">
                • 전체 심리검사 (4시간 정도)<br/>
                • 상담 2-6회 (병원마다 다름)<br/>
                • F64.0 진단서 발급<br/>
                • 예상 비용: 30-50만 원
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 font-bold text-orange-700">2-3개월</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">호르몬 시작</div>
              <div className="text-gray-600 mt-1">
                • 진단서 제출 → 기본 혈액검사<br/>
                • 호르몬 처방 (월 5-15만 원)<br/>
                • 첫 변화 시작 (피부, 기분 등)
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 font-bold text-orange-700">6개월</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">초기 변화 확인</div>
              <div className="text-gray-600 mt-1">
                {pathway === 'mtf' ? (
                  <>• 유방 발달 시작<br/>• 피부 연화<br/>• 체모 감소 시작</>
                ) : (
                  <>• 목소리 변화 시작 (72%)<br/>• 생리 중단 시작 (53%)<br/>• 여드름 발생</>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 font-bold text-orange-700">12개월</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">주요 변화 진행</div>
              <div className="text-gray-600 mt-1">
                {pathway === 'mtf' ? (
                  <>• 지방 재분배, 근육 감소<br/>• 유방 Tanner 2-3단계</>
                ) : (
                  <>• 목소리 완전 저음화 (97%)<br/>• 생리 완전 중단 (78%)<br/>• 근육량 증가</>
                )}
                <div className="mt-2 text-indigo-700 font-semibold">
                  • 수술 고려 시작 가능 (원한다면)
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 font-bold text-orange-700">2-3년</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">최대 효과 도달</div>
              <div className="text-gray-600 mt-1">
                {pathway === 'mtf' ? (
                  <>• 유방 발달 완료 (A-소B컵)<br/>• 지방·근육 변화 최대</>
                ) : (
                  <>• 체모·수염 최대<br/>• 근육 발달 최대</>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded text-sm">
          <AlertCircle className="w-4 h-4 text-purple-600 inline mr-2" />
          <strong>중요:</strong> 이 타임라인은 평균치이며, 개인차가 매우 큽니다. 
          또한 모든 단계가 필수는 아닙니다.
        </div>
      </div>
    </div>
  );
};

export default TimelineInfo;
