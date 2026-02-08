import React from 'react';
import { AlertCircle } from 'lucide-react';

const MedicalInfo = ({ pathway }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">💊 의학 정보</h3>
        <p className="text-gray-700">의료적 트랜지션을 선택한다면 참고하세요</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
        <h4 className="font-bold text-xl mb-4">{pathway === 'mtf' ? 'MTF 호르몬' : 'FTM 호르몬'}</h4>
        
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold mb-2">약물 종류</div>
            {pathway === 'mtf' ? (
              <div className="text-gray-700">
                • <strong>에스트로겐:</strong> 17β-estradiol 2-6mg/일 (경구/설하), 패치 0.1-0.4mg 주 2회<br/>
                • <strong>항안드로겐:</strong> spironolactone 100-200mg/일, cyproterone 10-50mg/일<br/>
                • <strong>목표 수치:</strong> 에스트라디올 100-200pg/mL, 테스토스테론 &lt;50ng/dL
              </div>
            ) : (
              <div className="text-gray-700">
                • <strong>테스토스테론:</strong> 예나스테론(주사 1-2주), 네비도(주사 10-12주), 토스트렉스겔(매일)<br/>
                • <strong>목표 수치:</strong> 400-700ng/dL (한국 내분비학회 기준)
              </div>
            )}
          </div>

          <div>
            <div className="font-semibold mb-2">주요 효과 타임라인</div>
            <div className="space-y-2">
              {pathway === 'mtf' ? (
                <>
                  <div className="border-l-4 border-pink-300 pl-3 py-1">
                    <strong>3-6개월:</strong> 유방 발달 시작, 피부 연화, 지방 재분배 시작
                  </div>
                  <div className="border-l-4 border-pink-400 pl-3 py-1">
                    <strong>6-12개월:</strong> 체모 감소 시작, 근육량 감소
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3 py-1">
                    <strong>2-3년:</strong> 유방 최대 (A-소B컵), 지방·근육 변화 최대
                  </div>
                </>
              ) : (
                <>
                  <div className="border-l-4 border-blue-300 pl-3 py-1">
                    <strong>1-6개월:</strong> 피부 지성화·여드름 (6개월 81%), 생리 중단 시작
                  </div>
                  <div className="border-l-4 border-blue-400 pl-3 py-1">
                    <strong>3-12개월:</strong> 목소리 저음화 (6개월 72%, 12개월 97%, 24개월 100%)
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <strong>6-12개월:</strong> 클리토리스 성장, 근육 증가, 체모·수염 증가
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-yellow-800">
                {pathway === 'mtf' ? (
                  <><strong>중요:</strong> 에스트로겐은 목소리를 변화시키지 않으며, 골격 구조도 변하지 않습니다. 음성 여성화는 별도 치료 필요.</>
                ) : (
                  <><strong>중요:</strong> 목소리 저음화, 클리토리스 성장, 수염·체모 증가, 남성형 탈모는 비가역적 변화입니다.</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reversibility */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
        <h4 className="font-bold text-xl mb-4 text-purple-800">가역성</h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="border rounded p-4 bg-red-50">
            <div className="font-semibold text-red-900 mb-2">비가역적 (영구적)</div>
            <div className="text-gray-700">
              {pathway === 'mtf' ? (
                <>• 유방 발달<br/>• 장기 복용 후 생식능력</>
              ) : (
                <>• 목소리 저음화<br/>• 클리토리스 성장<br/>• 수염·체모 증가<br/>• 남성형 탈모</>
              )}
            </div>
          </div>
          
          <div className="border rounded p-4 bg-green-50">
            <div className="font-semibold text-green-900 mb-2">가역적 (중단 시 복구)</div>
            <div className="text-gray-700">
              {pathway === 'mtf' ? (
                <>• 피부 질감<br/>• 지방 분포<br/>• 근육량<br/>• 체모 (완전히는 아님)<br/>• 성기능</>
              ) : (
                <>• 생리 재개<br/>• 지방 분포<br/>• 근육량<br/>• 피부 지성</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Surgery */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100">
        <h4 className="font-bold text-xl mb-4">수술 옵션 (모두 선택사항)</h4>
        
        <div className="space-y-3 text-sm">
          {pathway === 'mtf' ? (
            <>
              <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50">
                <div className="font-semibold">질성형술 (1,500-3,000만 원)</div>
                <div className="text-gray-700">
                  음경피부반전법 (표준), 4-6시간 수술<br/>
                  합병증률 20-32.5%, 만족도 88-93%<br/>
                  평생 딜레이션(질확장) 필요
                </div>
              </div>
              <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50">
                <div className="font-semibold">안면여성화수술 FFS (500-1,500만+ 원)</div>
                <div className="text-gray-700">
                  이마 윤곽, 코, 턱·하악, 광대, 입술<br/>
                  회복 1-2주, 6주 부기 80% 해소
                </div>
              </div>
              <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50">
                <div className="font-semibold">음성여성화수술 VFS (300-800만 원)</div>
                <div className="text-gray-700">
                  성대 수술로 기본 주파수 상승 (평균 50Hz)<br/>
                  회복 2-4주, 음성 치료 병행 필수
                </div>
              </div>
              <div className="border-l-4 border-pink-400 pl-4 py-2 bg-pink-50">
                <div className="font-semibold">유방확대술 (100-2,000만 원)</div>
                <div className="text-gray-700">
                  HRT 1-2년 후 고려. 회복 4-6주<br/>
                  HRT만으로 만족한다면 불필요
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50">
                <div className="font-semibold">상부수술 (400-800만 원)</div>
                <div className="text-gray-700">
                  이중절개법 (표준), 3-4시간<br/>
                  회복 2-4주, 재수술률 12.5-63.1%
                </div>
              </div>
              <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50">
                <div className="font-semibold">음경성형술 Phalloplasty (1,800-3,700만 원)</div>
                <div className="text-gray-700">
                  전완피판 (75%), 2-4단계, 1-2년 소요<br/>
                  합병증률 76.5%, 만족도 95%<br/>
                  평균 길이 12.3cm
                </div>
              </div>
              <div className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50">
                <div className="font-semibold">메토이디오플라스티</div>
                <div className="text-gray-700">
                  테스토스테론으로 커진 클리토리스 이용<br/>
                  평균 크기 5.6cm, 합병증 낮음
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-sm">
          <strong>중요:</strong> 모든 수술은 선택사항입니다. 일부만 해도, 안 해도 괜찮습니다.
          "풀 트랜지션"이라는 개념은 없습니다.
        </div>
      </div>

      {/* Risks */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
        <h4 className="font-bold text-xl mb-4 text-red-800">주요 리스크</h4>
        
        <div className="space-y-2 text-sm">
          {pathway === 'mtf' ? (
            <>
              <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50">
                <strong>정맥혈전색전증 (VTE):</strong> 1.6-2% (2.2배). 40세 이상·흡연자는 패치 권장
              </div>
              <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                <strong>뇌졸중:</strong> 1.8% (1.3배 증가)
              </div>
              <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50">
                <strong>생식능력:</strong> 장기 복용 시 영구적 무정자증 가능. 미리 정자 보관 권장
              </div>
            </>
          ) : (
            <>
              <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50">
                <strong>적혈구증가증:</strong> 헤마토크릿 50% 초과 11-22%. 1년 10%, 10년 38% 누적
              </div>
              <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                <strong>여드름:</strong> 사실상 100% 발생. 심한 경우 영구 흉터
              </div>
              <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                <strong>심혈관 위험:</strong> 심근경색 위험 3.7배 (남성 수준으로 증가)
              </div>
              <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                <strong>남성형 탈모:</strong> 24개월째 29%. 비가역적
              </div>
            </>
          )}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <strong>모니터링:</strong> 첫 해 3개월마다 혈액검사, 이후 6-12개월 간격
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;
