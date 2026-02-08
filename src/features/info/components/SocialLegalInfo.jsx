import React from 'react';
import { AlertCircle } from 'lucide-react';

const SocialLegalInfo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
        <h3 className="text-2xl font-bold text-indigo-900 mb-2">👥 사회적 트랜지션 & 법률</h3>
        <p className="text-gray-700">의료적 개입 없이도 가능한 변화들</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
        <h4 className="font-bold text-xl mb-4 text-green-900">사회적 트랜지션이란?</h4>
        
        <div className="space-y-3 text-sm">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <div className="font-semibold mb-2">호르몬이나 수술 없이도 할 수 있는 것들:</div>
            <div className="text-gray-700">
              • 이름 변경 (법적 또는 통칭)<br/>
              • 호칭 변경 (그/그녀/그들)<br/>
              • 옷, 머리 스타일, 화장<br/>
              • 친구·가족에게 커밍아웃<br/>
              • 성별 표현 방식 변화
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="font-semibold text-blue-900">
              이것도 완전한 트랜지션입니다.
            </div>
            <div className="text-gray-700 mt-2">
              의료적 개입 없이 사회적 트랜지션만 하는 것도 유효하며, 
              많은 트랜스젠더가 이 방식을 선택합니다.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100">
        <h4 className="font-bold text-xl mb-4">법적 성별정정 (선택사항)</h4>
        
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded">
            <div className="font-semibold mb-2">🎉 2024-2025 최신 동향</div>
            <div className="text-gray-700">
              ✓ 2024년 청주·서울: <strong>수술 없이도 허가</strong> 판례<br/>
              ✓ 대법원 예규 수술 요건 삭제 검토 중<br/>
              ✓ 미성년 자녀 있어도 가능 (2022 대법원)<br/>
              ✓ 부모 동의 불필요 (2019 삭제)
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2">필요 서류 (참고서면)</div>
            <div className="text-gray-700">
              1. 가족관계증명서 등 (필수)<br/>
              2. 정신과 진단서/감정서<br/>
              3. 수술 소견서 (일부 법원 면제 추세)<br/>
              4. 생식능력 결여 감정서
            </div>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
            <strong>⚠️ 법원마다 기준 다름:</strong> 한 법원 기각 후 다른 법원에서 허가받은 사례 多
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <div className="font-semibold text-green-900">법률 지원</div>
            <div className="text-gray-700 mt-1">
              <strong>공익인권변호사모임 희망법</strong> (hopeandlaw.org)<br/>
              성별정정 소송 무료 대리. 박한희 변호사(트랜스젠더 당사자)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
        <h4 className="font-bold text-xl mb-4">지원 자원</h4>
        
        <div className="space-y-3 text-sm">
          <div className="border rounded p-3 bg-orange-50">
            <div className="font-bold text-orange-900">🆘 긴급 상담</div>
            <div className="text-gray-700 mt-2">
              <strong>트로스트</strong> (trost.co.kr) - 24시간 익명 앱 상담<br/>
              <strong>청소년 성소수자 위기지원센터 띵동</strong> (ddingdong.kr) - 청소년 쉼터
            </div>
          </div>

          <div className="border rounded p-3 hover:bg-orange-50 transition-colors">
            <div className="font-semibold text-gray-900">트랜스젠더 인권단체 조각보</div>
            <div className="text-xs text-gray-600">transgender.or.kr</div>
            <div className="text-gray-700 mt-1">유일 트랜스젠더 전문 인권단체. 월 TGG 모임, 성별정정 툴킷</div>
          </div>

          <div className="border rounded p-3 hover:bg-orange-50 transition-colors">
            <div className="font-semibold text-gray-900">행동하는성소수자인권연대</div>
            <div className="text-xs text-gray-600">lgbtpride.or.kr, 02-715-9984</div>
            <div className="text-gray-700 mt-1">1997년 설립. 성별인정법 제정 활동</div>
          </div>

          <div className="border rounded p-3 hover:bg-orange-50 transition-colors">
            <div className="font-semibold text-gray-900">QALLY (다다름)</div>
            <div className="text-gray-700 mt-1">퀴어프렌들리 상담사 리스트</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
        <h4 className="font-bold text-xl mb-4">연구 데이터</h4>
        
        <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>주의:</strong> 아래 데이터는 주로 서구권 연구이며, 한국 상황과 다를 수 있습니다. 
              한국의 사회적·경제적 맥락(전액 비급여, 높은 사회적 장벽)은 서구와 크게 다르므로 
              무비판적으로 적용하지 마세요.
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
          <div className="border rounded p-4 bg-green-50">
            <div className="text-4xl font-bold text-green-700">93-98%</div>
            <div className="font-semibold text-green-900 mt-1">트랜지션 만족도</div>
            <div className="text-gray-700 mt-2 text-xs">
              코넬대: 93% 웰빙 개선<br/>
              미국 2022: 호르몬 98%, 수술 97%
            </div>
          </div>
          
          <div className="border rounded p-4 bg-blue-50">
            <div className="text-4xl font-bold text-blue-700">&lt;1%</div>
            <div className="font-semibold text-blue-900 mt-1">수술 후회율</div>
            <div className="text-gray-700 mt-2 text-xs">
              메타분석 (7,928명)<br/>
              일반 성형(5-47%)보다 낮음
            </div>
          </div>
        </div>

        <div className="border rounded p-4 bg-yellow-50 text-sm">
          <div className="font-semibold mb-2">디트랜지션</div>
          <div className="text-gray-700 text-xs">
            8% 경험하나 62%는 일시적. 주된 이유: 외부 압력(부모, 차별, 취업) 95%, 
            성별정체성 재정체화는 단 5%
          </div>
        </div>

        <div className="mt-4 border rounded p-4 bg-indigo-50 text-sm">
          <div className="font-semibold text-indigo-900 mb-2">한국 트랜스젠더 현황</div>
          <div className="text-gray-700 text-xs">
            • 우울 증상: 일반 인구 대비 6-10배<br/>
            • 자살사고: 일반 인구 대비 6-19배<br/>
            • <strong>최대 장벽: 비용</strong> (전액 비급여, 평균 3,000-7,500만 원)
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLegalInfo;
