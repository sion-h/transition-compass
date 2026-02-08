import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAssessment } from '../../../contexts/AssessmentContext';

const CostCalculator = ({ pathway }) => {
  const { state, updateCosts } = useAssessment();
  const { costs } = state;

  const totalCost = costs.diagnosis + 
    (costs.hormones_monthly * costs.hormones_months) +
    (costs.laser_session * costs.laser_sessions) +
    costs.top_surgery + costs.bottom_surgery +
    costs.ffs + costs.vfs + costs.other;
  
  const monthlyCost = costs.hormones_monthly + 
    (costs.laser_session * costs.laser_sessions / 12);
  
  const firstYearCost = costs.diagnosis + 
    (costs.hormones_monthly * 12) + 
    (costs.laser_session * Math.min(costs.laser_sessions, 12));
  
  const handleCostChange = (key, value) => {
    updateCosts({ [key]: Number(value) });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-2xl font-bold text-green-900 mb-2">💰 비용 계산기</h3>
        <p className="text-gray-700">실제 예상 비용을 계산해보세요</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
        <div className="flex items-start gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            한국에서 모든 트랜지션 관련 의료는 <strong>전액 비급여</strong>입니다. 
            아래는 평균 가격이며, 병원마다 최대 1,900만 원 차이가 납니다.
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">정신과 진단 (₩)</label>
              <input 
                type="number"
                value={costs.diagnosis}
                onChange={(e) => handleCostChange('diagnosis', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-gray-500 mt-1">평균: 30-50만 원</div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">호르몬 치료 (월, ₩)</label>
              <input 
                type="number"
                value={costs.hormones_monthly}
                onChange={(e) => handleCostChange('hormones_monthly', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-gray-500 mt-1">평균: 5-15만 원</div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">호르몬 기간 (개월)</label>
              <input 
                type="number"
                value={costs.hormones_months}
                onChange={(e) => handleCostChange('hormones_months', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {pathway === 'mtf' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">레이저 제모 (회당, ₩)</label>
                  <input 
                    type="number"
                    value={costs.laser_session}
                    onChange={(e) => handleCostChange('laser_session', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="text-xs text-gray-500 mt-1">평균: 10-30만 원</div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">레이저 횟수</label>
                  <input 
                    type="number"
                    value={costs.laser_sessions}
                    onChange={(e) => handleCostChange('laser_sessions', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="text-xs text-gray-500 mt-1">평균: 10-15회</div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                {pathway === 'mtf' ? '유방확대술 (₩)' : '상부수술 (₩)'}
              </label>
              <input 
                type="number"
                value={costs.top_surgery}
                onChange={(e) => handleCostChange('top_surgery', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-gray-500 mt-1">
                {pathway === 'mtf' ? '평균: 100-2,000만 원 (선택)' : '평균: 400-800만 원'}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                {pathway === 'mtf' ? '질성형술 (₩)' : '음경성형술 (₩)'}
              </label>
              <input 
                type="number"
                value={costs.bottom_surgery}
                onChange={(e) => handleCostChange('bottom_surgery', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div className="text-xs text-gray-500 mt-1">
                {pathway === 'mtf' ? '평균: 1,500-3,000만 원 (선택)' : '평균: 1,800-3,700만 원 (선택)'}
              </div>
            </div>

            {pathway === 'mtf' && (
              <>
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">안면여성화수술 (₩)</label>
                  <input 
                    type="number"
                    value={costs.ffs}
                    onChange={(e) => handleCostChange('ffs', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="text-xs text-gray-500 mt-1">평균: 500-1,500만+ 원 (선택)</div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-semibold">음성여성화수술 (₩)</label>
                  <input 
                    type="number"
                    value={costs.vfs}
                    onChange={(e) => handleCostChange('vfs', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="text-xs text-gray-500 mt-1">평균: 300-800만 원 (선택)</div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">기타 비용 (₩)</label>
              <input 
                type="number"
                value={costs.other}
                onChange={(e) => handleCostChange('other', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div className="border-t-2 pt-4 space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="font-semibold text-gray-700">첫 해 예상 (진단+호르몬+{pathway === 'mtf' ? '레이저' : '기타'})</span>
              <span className="text-xl font-bold text-orange-700">₩{firstYearCost.toLocaleString('ko-KR')}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="font-semibold text-gray-700">월 평균 (호르몬+레이저 분할)</span>
              <span className="text-lg font-bold text-blue-700">₩{Math.round(monthlyCost).toLocaleString('ko-KR')}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded border-2 border-green-300">
              <span className="font-bold text-lg text-gray-800">총 예상 비용</span>
              <span className="text-3xl font-bold text-green-700">₩{totalCost.toLocaleString('ko-KR')}</span>
            </div>

            <div className="text-xs text-gray-600 text-center p-2 bg-gray-50 rounded">
              {pathway === 'mtf' ? 
                'MTF 호르몬+필수검사만: 약 150-240만 원/년 | 모든 수술 포함 시: 3,000-7,500만+ 원' : 
                'FTM 호르몬+필수검사만: 약 150-240만 원/년 | 모든 수술 포함 시: 2,500-4,000만+ 원'
              }
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded text-sm">
          <strong>기억하세요:</strong> 모든 수술은 선택사항입니다. 
          호르몬만, 일부 수술만 - 모두 유효한 트랜지션입니다.
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
