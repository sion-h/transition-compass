import React, { useState } from 'react';
import { AlertCircle, Heart, DollarSign, FileText, MapPin, TrendingUp, Home, BookOpen, ChevronRight, ChevronLeft, Phone, BarChart3, Lightbulb, Users, Pill } from 'lucide-react';

const TransitionCompassKR = () => {
  const [mode, setMode] = useState(null);
  const [pathway, setPathway] = useState(null); // Only for info section
  const [infoSection, setInfoSection] = useState('timeline');
  const [step, setStep] = useState(1);

  // 4-dimensional assessment (pathway-independent)
  const [dysphoria, setDysphoria] = useState({
    신체: 5, 목소리: 5, 가슴: 5, 성기: 5, 체모: 5,
    피부: 5, 얼굴: 5, 키체형: 5
  });
  
  const [euphoria, setEuphoria] = useState({
    원하는몸상상: 5,
    옷머리화장: 5,
    거울사진속자신: 5,
    원하는젠더인식: 5,
    미래자신상상: 5
  });
  
  const [socialDesire, setSocialDesire] = useState({
    이름변경: 5, 호칭변경: 5, 외모표현변경: 5,
    성별표기변경: 5, 커밍아웃: 5
  });
  
  const [medicalDesire, setMedicalDesire] = useState({
    호르몬치료: 5,
    상부수술: 5,
    하부수술: 5,
    얼굴수술: 5,
    음성수술: 5
  });

  const [timePattern, setTimePattern] = useState('stable');
  const [timePressure, setTimePressure] = useState(5); // 1-10 scale
  const [mentalHealth, setMentalHealth] = useState({
    우울증: false, 불안장애: false, 트라우마: false,
    정신증: false, 중독: false, 섭식장애: false, 해당없음: true
  });
  const [judgmentClarity, setJudgmentClarity] = useState(7);
  
  // Context
  const [occupation, setOccupation] = useState(5);
  const [savingsMonths, setSavingsMonths] = useState(6);
  const [familySupport, setFamilySupport] = useState(5);
  const [friendSupport, setFriendSupport] = useState(5);
  const [physicalSafety, setPhysicalSafety] = useState(5); // Will be labeled as 물리적 안전(치안)

  // Cost calculator
  const [costs, setCosts] = useState({
    diagnosis: 400000,
    hormones_monthly: 100000,
    hormones_months: 12,
    laser_session: 0,
    laser_sessions: 0,
    top_surgery: 0,
    bottom_surgery: 0,
    ffs: 0,
    vfs: 0,
    other: 0
  });

  // Update default costs when pathway changes
  React.useEffect(() => {
    if (pathway === 'mtf') {
      setCosts(prev => ({
        ...prev,
        laser_session: 200000,
        laser_sessions: 12,
        top_surgery: 10000000,
        bottom_surgery: 20000000,
        ffs: 10000000,
        vfs: 5000000
      }));
    } else if (pathway === 'ftm') {
      setCosts(prev => ({
        ...prev,
        laser_session: 0,
        laser_sessions: 0,
        top_surgery: 6000000,
        bottom_surgery: 25000000,
        ffs: 0,
        vfs: 0
      }));
    }
  }, [pathway]);

  // Calculations
  const avgDysphoria = Object.values(dysphoria).reduce((a, b) => a + b, 0) / Object.values(dysphoria).length;
  const avgEuphoria = Object.values(euphoria).reduce((a, b) => a + b, 0) / Object.values(euphoria).length;
  const avgSocial = Object.values(socialDesire).reduce((a, b) => a + b, 0) / Object.values(socialDesire).length;
  const avgMedical = Object.values(medicalDesire).reduce((a, b) => a + b, 0) / Object.values(medicalDesire).length;
  const socialRisk = (occupation + (10 - familySupport) + (10 - friendSupport) + (10 - physicalSafety)) / 4;

  const getHighItems = (obj, threshold = 7) => {
    return Object.entries(obj).filter(([k, v]) => v >= threshold).map(([k]) => k);
  };

  const getLowItems = (obj, threshold = 3) => {
    return Object.entries(obj).filter(([k, v]) => v <= threshold).map(([k]) => k);
  };

  const getCriticalItems = (obj) => {
    return Object.entries(obj).filter(([k, v]) => v >= 7).map(([k, v]) => ({key: k, value: v}));
  };

  const getPersonalizedSolution = () => {
    const solutions = [];
    const warnings = [];
    
    // Get critical items (7+)
    const criticalDysphoria = getCriticalItems(dysphoria);
    const criticalEuphoria = getCriticalItems(euphoria);
    const criticalSocial = getCriticalItems(socialDesire);
    const criticalMedical = getCriticalItems(medicalDesire);
    
    // 1. JUDGMENT CLARITY (highest priority)
    if (judgmentClarity < 4) {
      return {
        primary: "지금은 결정을 내리기에 적절한 시기가 아닐 수 있습니다",
        reason: `판단 명료성이 낮습니다 (${judgmentClarity}/10). 마음이 혼란스럽거나 외부 압력이 있을 때는 중요한 결정을 미루는 것이 현명합니다.`,
        recommendations: [
          "시간을 가지고 천천히 생각하세요",
          "정신건강 전문가와 상담을 고려하세요",
          "신뢰할 수 있는 사람과 대화하세요",
          "스스로에게 압박을 주지 마세요"
        ],
        warnings: [],
        type: "wait"
      };
    }

    // 2. TIME PATTERN CHECK
    if (timePattern === 'fluctuating') {
      warnings.push({
        title: "시간 패턴 주의",
        message: "감정이 오락가락한다면, 더 관찰하는 시간이 필요할 수 있습니다. 일관된 패턴이 나타날 때까지 기다리는 것도 현명합니다."
      });
    }

    // 3. MENTAL HEALTH CHECK
    const hasSeriousMentalHealth = mentalHealth.정신증 || mentalHealth.중독;
    const hasMildMentalHealth = mentalHealth.우울증 || mentalHealth.불안장애 || mentalHealth.트라우마;
    
    if (hasSeriousMentalHealth) {
      warnings.push({
        title: "정신건강 최우선",
        message: "정신증이나 중독 문제가 있을 때는 정신과 전문의와 반드시 상담해야 합니다. 트랜지션 결정은 증상이 안정된 후에 하는 것이 안전합니다."
      });
    } else if (hasMildMentalHealth) {
      warnings.push({
        title: "정신건강 병행 치료",
        message: "우울증, 불안, 트라우마가 있다면 트랜지션과 별도로 치료를 병행하세요. 트랜지션이 정신건강 문제를 자동으로 해결하지는 않습니다."
      });
    }

    // 4. INDIVIDUAL SOCIAL RISK FACTORS
    if (occupation >= 8) {
      warnings.push({
        title: "직업 위험 높음",
        message: "직장에서 트랜지션 시 위험이 큽니다. 스텔스 전략, 이직 준비, 또는 법적 대비를 고려하세요."
      });
    }
    
    if (familySupport <= 2) {
      warnings.push({
        title: "가족 지지 매우 낮음",
        message: "가족 관계가 단절되거나 매우 부정적입니다. 독립적 생활 기반을 먼저 마련하거나, 대안적 지지 네트워크를 구축하세요."
      });
    }
    
    if (physicalSafety <= 2) {
      warnings.push({
        title: "물리적 안전 위험",
        message: "주변 환경이 매우 위험합니다. 안전이 최우선입니다. 이사, 보호 계획, 또는 스텔스 트랜지션을 고려하세요."
      });
    }

    // 5. CRITICAL ITEMS (평균의 함정 방지)
    if (criticalDysphoria.length > 0) {
      const items = criticalDysphoria.map(i => i.key).join(', ');
      warnings.push({
        title: "특정 부위 디스포리아 심각",
        message: `${items} 디스포리아가 특히 심각합니다 (7+). 전체 트랜지션보다 이 부분에 집중한 해결책이 효과적일 수 있습니다.`
      });
    }
    
    if (criticalMedical.length > 0 && avgMedical < 6) {
      const items = criticalMedical.map(i => i.key).join(', ');
      warnings.push({
        title: "특정 의료적 개입 욕구 높음",
        message: `${items}에 대한 욕구가 높습니다. 전체 의료적 트랜지션보다 이 부분만 선택적으로 고려할 수 있습니다.`
      });
    }

    // 6. CONTRADICTIONS (모순 감지)
    if (avgDysphoria >= 7 && avgMedical < 4) {
      solutions.push({
        primary: "신체 불편함은 크지만 의료적 개입은 원하지 않으시는군요",
        reason: `디스포리아는 높지만(${avgDysphoria.toFixed(1)}/10) 의료적 욕구는 낮습니다(${avgMedical.toFixed(1)}/10). 이유를 탐색해보세요.`,
        recommendations: [
          "의료적 개입을 원하지 않는 이유: 두려움? 비용? 건강 리스크? 접근성?",
          "비의료적 대처법 탐색 (의복, 바인더, 패킹, 메이크업 등)",
          "상담을 통해 장벽 확인",
          "의료적 개입은 선택이며, 하지 않아도 완전히 유효합니다"
        ],
        type: "contradiction"
      });
    }

    if (avgEuphoria >= 7 && avgSocial < 4) {
      solutions.push({
        primary: "다른 표현에서 기쁨을 느끼지만 타인에게 보이고 싶지 않으시군요",
        reason: `유포리아는 높지만(${avgEuphoria.toFixed(1)}/10) 사회적 욕구는 낮습니다(${avgSocial.toFixed(1)}/10).`,
        recommendations: [
          "프라이버시를 중시하는 것은 완전히 타당합니다",
          "의료적 변화만 하고 사회적으로는 스텔스 유지 가능",
          "선택적 커밍아웃 (친한 친구에게만)",
          "혼자 있을 때 표현하는 것만으로도 충분할 수 있습니다"
        ],
        type: "stealth"
      });
    }

    // 7. STANDARD PATTERNS (기존 로직)
    if (avgEuphoria >= 7 && avgMedical < 5 && solutions.length === 0) {
      solutions.push({
        primary: "사회적 트랜지션만으로도 충분히 만족스러울 수 있습니다",
        reason: `유포리아는 높지만(${avgEuphoria.toFixed(1)}/10) 의료적 욕구는 낮습니다(${avgMedical.toFixed(1)}/10).`,
        recommendations: [
          "이름, 호칭, 옷차림 변화부터 시작",
          "옷, 머리 스타일 등 외모 표현 실험",
          "친한 친구들과 새로운 정체성 공유",
          "의료적 개입은 필수가 아니며, 나중에 원하면 고려 가능"
        ],
        type: "social"
      });
    }

    if (avgDysphoria >= 7 && avgMedical >= 7 && solutions.length === 0) {
      solutions.push({
        primary: "의료적 트랜지션이 불편함을 크게 줄일 수 있습니다",
        reason: `신체 디스포리아가 높고(${avgDysphoria.toFixed(1)}/10) 의료적 개입 욕구도 높습니다(${avgMedical.toFixed(1)}/10).`,
        recommendations: [
          "트랜스젠더 친화적 의료진 상담",
          "호르몬 치료 정보 수집",
          "필요한 수술 정보 확인",
          "모든 수술이 필수는 아닙니다. 당신이 원하는 것만 선택하세요"
        ],
        type: "medical"
      });
    }

    if (avgDysphoria < 5 && avgEuphoria >= 7 && solutions.length === 0) {
      solutions.push({
        primary: "탐색과 실험이 도움이 될 것 같습니다",
        reason: `현재 불편함은 크지 않지만(${avgDysphoria.toFixed(1)}/10) 다른 젠더 표현에서 큰 기쁨을 느낍니다(${avgEuphoria.toFixed(1)}/10).`,
        recommendations: [
          "안전한 공간에서 다양한 표현 실험",
          "급하게 결정할 필요 없음",
          "자신의 페이스대로 진행",
          "디스포리아가 없어도 트랜스젠더일 수 있습니다"
        ],
        type: "explore"
      });
    }

    if (avgDysphoria >= 7 && avgEuphoria < 5 && solutions.length === 0) {
      solutions.push({
        primary: "정신건강 지원과 함께 천천히 접근하세요",
        reason: `불편함이 크지만(${avgDysphoria.toFixed(1)}/10) 대안적 표현에서 큰 기쁨을 아직 경험하지 못했습니다(${avgEuphoria.toFixed(1)}/10).`,
        recommendations: [
          "트랜스젠더 친화적 상담사와 대화",
          "안전한 환경에서 점진적으로 다른 표현 시도",
          "우울/불안 증상이 있다면 치료 병행",
          "서두르지 말고 자신의 감정을 탐색하세요"
        ],
        type: "support"
      });
    }

    if (avgDysphoria < 5 && avgEuphoria < 5 && avgSocial < 5 && avgMedical < 5 && solutions.length === 0) {
      solutions.push({
        primary: "지금은 관찰하고 생각하는 시기일 수 있습니다",
        reason: "모든 차원에서 욕구가 강하지 않습니다. 이것도 괜찮습니다.",
        recommendations: [
          "스스로에게 시간을 주세요",
          "성급한 결정을 하지 마세요",
          "젠더 관련 정보를 계속 접하면서 자신을 이해하세요",
          "나중에 변화가 있다면 그때 다시 생각해도 됩니다"
        ],
        type: "wait"
      });
    }

    if (solutions.length === 0) {
      solutions.push({
        primary: "다차원적 접근이 필요할 것 같습니다",
        reason: `사회적, 의료적 욕구가 모두 있으며, 각자의 페이스에 맞춰 진행하면 됩니다.`,
        recommendations: [
          "사회적 트랜지션과 의료적 트랜지션을 독립적으로 고려",
          "하나가 다른 하나의 전제조건이 아닙니다",
          "당신이 원하는 것만 선택하세요",
          "트랜지션에 정해진 순서나 '풀 코스'는 없습니다"
        ],
        type: "comprehensive"
      });
    }

    return {
      ...solutions[0],
      warnings
    };
  };

  // ============ INFO COMPONENTS ============

  const TimelineInfo = () => (
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

  const MedicalInfo = () => (
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

  const CostCalculator = () => {
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
                  onChange={(e) => setCosts({...costs, diagnosis: Number(e.target.value)})}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="text-xs text-gray-500 mt-1">평균: 30-50만 원</div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-semibold">호르몬 치료 (월, ₩)</label>
                <input 
                  type="number"
                  value={costs.hormones_monthly}
                  onChange={(e) => setCosts({...costs, hormones_monthly: Number(e.target.value)})}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="text-xs text-gray-500 mt-1">평균: 5-15만 원</div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-semibold">호르몬 기간 (개월)</label>
                <input 
                  type="number"
                  value={costs.hormones_months}
                  onChange={(e) => setCosts({...costs, hormones_months: Number(e.target.value)})}
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
                      onChange={(e) => setCosts({...costs, laser_session: Number(e.target.value)})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <div className="text-xs text-gray-500 mt-1">평균: 10-30만 원</div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">레이저 횟수</label>
                    <input 
                      type="number"
                      value={costs.laser_sessions}
                      onChange={(e) => setCosts({...costs, laser_sessions: Number(e.target.value)})}
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
                  onChange={(e) => setCosts({...costs, top_surgery: Number(e.target.value)})}
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
                  onChange={(e) => setCosts({...costs, bottom_surgery: Number(e.target.value)})}
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
                      onChange={(e) => setCosts({...costs, ffs: Number(e.target.value)})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <div className="text-xs text-gray-500 mt-1">평균: 500-1,500만+ 원 (선택)</div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">음성여성화수술 (₩)</label>
                    <input 
                      type="number"
                      value={costs.vfs}
                      onChange={(e) => setCosts({...costs, vfs: Number(e.target.value)})}
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
                  onChange={(e) => setCosts({...costs, other: Number(e.target.value)})}
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

  const SocialLegalInfo = () => (
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

  // ============ ASSESSMENT COMPONENTS ============

  const AssessmentStep1 = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">1단계: 디스포리아 (현재 불편함)</h2>
      <p className="text-sm text-gray-600 mb-4">
        현재 신체나 젠더 표현에서 느끼는 불편함을 평가하세요 (0=전혀 없음, 10=극도로 심함)
      </p>
      
      <div className="space-y-4">
        {Object.keys(dysphoria).map(key => (
          <div key={key}>
            <label className="block text-sm mb-1">
              {key} <span className="font-semibold">({dysphoria[key]})</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={dysphoria[key]}
              onChange={(e) => setDysphoria({...dysphoria, [key]: Number(e.target.value)})}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const AssessmentStep2 = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">2단계: 유포리아 (젠더 표현 시 기쁨)</h2>
      <p className="text-sm text-gray-600 mb-4">
        원하는 젠더로 표현될 때 느끼는 기쁨이나 안도감을 평가하세요 (0=전혀 없음, 10=큰 기쁨)
      </p>
      
      <div className="space-y-4">
        {Object.keys(euphoria).map(key => (
          <div key={key}>
            <label className="block text-sm mb-1">
              {key} <span className="font-semibold">({euphoria[key]})</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={euphoria[key]}
              onChange={(e) => setEuphoria({...euphoria, [key]: Number(e.target.value)})}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const AssessmentStep3 = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">3단계: 사회적 & 의료적 욕구</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-3">사회적 트랜지션 욕구</h3>
        <p className="text-sm text-gray-600 mb-3">
          이름, 호칭, 외모 변화 등에 대한 욕구 (0=전혀 없음, 10=매우 강함)
        </p>
        <div className="space-y-4">
          {Object.keys(socialDesire).map(key => (
            <div key={key}>
              <label className="block text-sm mb-1">
                {key} <span className="font-semibold">({socialDesire[key]})</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={socialDesire[key]}
                onChange={(e) => setSocialDesire({...socialDesire, [key]: Number(e.target.value)})}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">의료적 트랜지션 욕구</h3>
        <p className="text-sm text-gray-600 mb-3">
          호르몬, 수술 등 의료적 개입에 대한 욕구 (0=전혀 없음, 10=매우 강함)
        </p>
        <div className="space-y-4">
          {Object.keys(medicalDesire).map(key => (
            <div key={key}>
              <label className="block text-sm mb-1">
                {key} <span className="font-semibold">({medicalDesire[key]})</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={medicalDesire[key]}
                onChange={(e) => setMedicalDesire({...medicalDesire, [key]: Number(e.target.value)})}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AssessmentStep4 = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">4단계: 맥락 및 판단 명료성</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-3">현재 정신건강 (해당사항 모두 체크)</h3>
        <div className="space-y-2">
          {Object.keys(mentalHealth).map(key => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={mentalHealth[key]}
                onChange={(e) => setMentalHealth({...mentalHealth, [key]: e.target.checked})}
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
        <input
          type="range"
          min="0"
          max="10"
          value={judgmentClarity}
          onChange={(e) => setJudgmentClarity(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">시간 경과</h3>
        <select 
          value={timePattern}
          onChange={(e) => setTimePattern(e.target.value)}
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
        <input
          type="range"
          min="1"
          max="10"
          value={timePressure}
          onChange={(e) => setTimePressure(Number(e.target.value))}
          className="w-full"
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

  const AssessmentStep5 = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">5단계: 사회적 위험 프로파일</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">직업 위험도 ({occupation}/10)</label>
          <p className="text-sm text-gray-600 mb-2">현재 직장/학교에서 트랜지션 시 예상되는 위험도</p>
          <input type="range" min="0" max="10" value={occupation}
            onChange={(e) => setOccupation(Number(e.target.value))} className="w-full" />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">비상 생활비 ({savingsMonths}개월)</label>
          <p className="text-sm text-gray-600 mb-2">수입 없이 생활 가능한 기간 (월세, 식비 등)</p>
          <input type="range" min="0" max="24" value={savingsMonths}
            onChange={(e) => setSavingsMonths(Number(e.target.value))} className="w-full" />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">가족 지지도 ({familySupport}/10)</label>
          <input type="range" min="0" max="10" value={familySupport}
            onChange={(e) => setFamilySupport(Number(e.target.value))} className="w-full" />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">친구 지지도 ({friendSupport}/10)</label>
          <input type="range" min="0" max="10" value={friendSupport}
            onChange={(e) => setFriendSupport(Number(e.target.value))} className="w-full" />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">물리적 안전(치안) ({physicalSafety}/10)</label>
          <p className="text-sm text-gray-600 mb-2">주변 환경에서 폭력, 차별, 괴롭힘 위험도</p>
          <input type="range" min="0" max="10" value={physicalSafety}
            onChange={(e) => setPhysicalSafety(Number(e.target.value))} className="w-full" />
        </div>
      </div>
    </div>
  );

  const AssessmentResults = () => {
    const solution = getPersonalizedSolution();
    const highDysphoria = getHighItems(dysphoria, 7);
    const lowDysphoria = getLowItems(dysphoria, 3);
    const highEuphoria = getHighItems(euphoria, 7);
    const highMedical = getHighItems(medicalDesire, 7);
    const lowMedical = getLowItems(medicalDesire, 3);

    return (
      <div className="space-y-6">
        {/* Judgment Clarity Warning */}
        {judgmentClarity < 5 && (
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-400">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-yellow-900 text-lg mb-2">판단 명료성 주의</div>
                <div className="text-yellow-800">
                  현재 판단 명료성이 낮습니다 ({judgmentClarity}/10). 
                  혼란스럽거나 외부 압력이 있을 때는 중요한 결정을 서두르지 마세요.
                  시간을 가지고 천천히 생각하는 것이 현명합니다.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Scores */}
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

        {/* Warnings */}
        {solution.warnings && solution.warnings.length > 0 && (
          <div className="space-y-3">
            {solution.warnings.map((warning, idx) => (
              <div key={idx} className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-orange-900">{warning.title}</div>
                    <div className="text-sm text-orange-800 mt-1">{warning.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Personalized Solution */}
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

        {/* Context */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-4">맥락 정보</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border rounded p-3">
              <div className="text-sm text-gray-600">사회적 위험도</div>
              <div className="text-2xl font-bold text-orange-700">{socialRisk.toFixed(1)}/10</div>
            </div>
            <div className="border rounded p-3">
              <div className="text-sm text-gray-600">비상 생활비</div>
              <div className="text-2xl font-bold text-green-700">{savingsMonths}개월</div>
            </div>
            <div className="border rounded p-3">
              <div className="text-sm text-gray-600">판단 명료성</div>
              <div className="text-2xl font-bold text-purple-700">{judgmentClarity}/10</div>
            </div>
            <div className="border rounded p-3">
              <div className="text-sm text-gray-600">시간 압박</div>
              <div className="text-2xl font-bold text-indigo-700">{timePressure}/10</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-purple-800">
              <strong>기억하세요:</strong> 이 결과는 제안일 뿐 처방이 아닙니다. 
              당신이 원하는 것을 선택하세요. 트랜지션에 정해진 경로는 없습니다.
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ MAIN RENDER ============

  const renderHome = () => (
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
            onClick={() => setMode('assessment')}
            className="p-8 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8" />
              <div className="font-bold text-2xl">자기 이해 평가</div>
            </div>
            <div className="text-sm opacity-90 text-left">
              디스포리아·유포리아·사회적·의료적 분석<br/>
              경로 선택 없이 바로 시작
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
                onClick={() => { setPathway('mtf'); setMode('info'); }}
                className="py-3 bg-pink-500 hover:bg-pink-600 rounded font-semibold transition-colors"
              >
                MTF
              </button>
              <button
                onClick={() => { setPathway('ftm'); setMode('info'); }}
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

  const renderInfo = () => {
    const sections = [
      { id: 'timeline', label: '타임라인', icon: Phone },
      { id: 'medical', label: '의학 정보', icon: Pill },
      { id: 'cost', label: '비용 계산', icon: DollarSign },
      { id: 'social', label: '사회·법률', icon: Users }
    ];
    
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {pathway === 'mtf' ? 'MTF' : 'FTM'} 정보
            </h2>
            <button
              onClick={() => setMode(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              처음으로
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setInfoSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-sm ${
                    infoSection === section.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div>
          {infoSection === 'timeline' && <TimelineInfo />}
          {infoSection === 'medical' && <MedicalInfo />}
          {infoSection === 'cost' && <CostCalculator />}
          {infoSection === 'social' && <SocialLegalInfo />}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setMode('assessment')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 shadow-lg text-lg font-semibold"
          >
            자기 이해 평가 시작 →
          </button>
        </div>
      </div>
    );
  };

  const renderAssessment = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">
            진행: {step}/6
          </div>
          <button
            onClick={() => setMode(null)}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            처음으로
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>
      
      {step === 1 && <AssessmentStep1 />}
      {step === 2 && <AssessmentStep2 />}
      {step === 3 && <AssessmentStep3 />}
      {step === 4 && <AssessmentStep4 />}
      {step === 5 && <AssessmentStep5 />}
      {step === 6 && <AssessmentResults />}
      
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
          이전
        </button>
        
        {step < 6 && (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            다음
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 py-8">
      {!mode && renderHome()}
      {mode === 'info' && renderInfo()}
      {mode === 'assessment' && renderAssessment()}
    </div>
  );
};

export default TransitionCompassKR;