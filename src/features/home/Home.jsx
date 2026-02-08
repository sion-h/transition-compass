import React from 'react';
import { AlertCircle, BarChart3, BookOpen } from 'lucide-react';

const Home = ({ onStartAssessment, onViewInfo }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-purple-200">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">트랜지션 웰빙 나침반</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          디스포리아, 유포리아, 사회적·의료적 욕구를 평가하여
          당신에게 맞는 방향을 제안합니다.
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-red-900">안전 우선</div>
                <div className="text-sm text-red-800">
                  불안하거나 압박감을 느끼면 <strong>즉시 닫으세요</strong>.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="font-bold text-blue-900">풀 트랜지션은 필수가 아닙니다</div>
            <div className="text-sm text-blue-800">
              사회적 트랜지션만, 호르몬만, 일부 수술만 - 모두 유효합니다.
              당신이 원하는 것만 선택하세요.
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={onStartAssessment}
            className="p-8 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8" />
              <div className="font-bold text-2xl">자기 이해 평가</div>
            </div>
            <div className="text-sm opacity-90 text-left">
              디스포리아·유포리아·사회적·의료적 분석
            </div>
          </button>

          <div className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8" />
              <div className="font-bold text-2xl">정보 보기</div>
            </div>
            <div className="text-sm opacity-90 text-left mb-4">
              타임라인, 의학 정보, 비용 계산, 법률
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewInfo('mtf')}
                className="py-3 bg-pink-500 hover:bg-pink-600 rounded font-semibold transition-colors"
              >
                MTF
              </button>
              <button
                onClick={() => onViewInfo('ftm')}
                className="py-3 bg-blue-500 hover:bg-blue-600 rounded font-semibold transition-colors"
              >
                FTM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
