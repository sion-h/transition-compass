import { calculateAverage, getCriticalItems } from './calculations';

/**
 * 판단 명료성 체크
 */
const checkJudgmentClarity = (judgmentClarity) => {
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
  return null;
};

/**
 * 시간 패턴 경고
 */
const checkTimePattern = (timePattern) => {
  if (timePattern === 'fluctuating') {
    return {
      title: "시간 패턴 주의",
      message: "감정이 오락가락한다면, 더 관찰하는 시간이 필요할 수 있습니다. 일관된 패턴이 나타날 때까지 기다리는 것도 현명합니다."
    };
  }
  return null;
};

/**
 * 정신건강 경고
 */
const checkMentalHealth = (mentalHealth) => {
  const warnings = [];
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

  return warnings;
};

/**
 * 개별 사회적 위험 요인 체크
 */
const checkSocialRiskFactors = (context) => {
  const warnings = [];
  const { occupation, familySupport, physicalSafety } = context;

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

  return warnings;
};

/**
 * 중요 항목 경고
 */
const checkCriticalItems = (scores) => {
  const warnings = [];
  const { dysphoria, medicalDesire } = scores;
  const avgMedical = calculateAverage(medicalDesire);

  const criticalDysphoria = getCriticalItems(dysphoria);
  const criticalMedical = getCriticalItems(medicalDesire);

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

  return warnings;
};

/**
 * 모순 패턴 분석
 */
const analyzeContradictions = (scores) => {
  const { dysphoria, euphoria, socialDesire, medicalDesire } = scores;
  const avgDysphoria = calculateAverage(dysphoria);
  const avgEuphoria = calculateAverage(euphoria);
  const avgSocial = calculateAverage(socialDesire);
  const avgMedical = calculateAverage(medicalDesire);

  const solutions = [];

  // 높은 디스포리아 + 낮은 의료적 욕구
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

  // 높은 유포리아 + 낮은 사회적 욕구
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

  return solutions;
};

/**
 * 표준 패턴 분석
 */
const analyzeStandardPatterns = (scores) => {
  const { dysphoria, euphoria, socialDesire, medicalDesire } = scores;
  const avgDysphoria = calculateAverage(dysphoria);
  const avgEuphoria = calculateAverage(euphoria);
  const avgSocial = calculateAverage(socialDesire);
  const avgMedical = calculateAverage(medicalDesire);

  const solutions = [];

  // 높은 유포리아 + 낮은 의료적 욕구
  if (avgEuphoria >= 7 && avgMedical < 5) {
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

  // 높은 디스포리아 + 높은 의료적 욕구
  if (avgDysphoria >= 7 && avgMedical >= 7) {
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

  // 낮은 디스포리아 + 높은 유포리아
  if (avgDysphoria < 5 && avgEuphoria >= 7) {
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

  // 높은 디스포리아 + 낮은 유포리아
  if (avgDysphoria >= 7 && avgEuphoria < 5) {
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

  // 모든 차원 낮음
  if (avgDysphoria < 5 && avgEuphoria < 5 && avgSocial < 5 && avgMedical < 5) {
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

  return solutions;
};

/**
 * 기본 종합 솔루션
 */
const getDefaultSolution = () => {
  return {
    primary: "다차원적 접근이 필요할 것 같습니다",
    reason: "사회적, 의료적 욕구가 모두 있으며, 각자의 페이스에 맞춰 진행하면 됩니다.",
    recommendations: [
      "사회적 트랜지션과 의료적 트랜지션을 독립적으로 고려",
      "하나가 다른 하나의 전제조건이 아닙니다",
      "당신이 원하는 것만 선택하세요",
      "트랜지션에 정해진 순서나 '풀 코스'는 없습니다"
    ],
    type: "comprehensive"
  };
};

/**
 * 메인 추천 함수
 */
export const getPersonalizedSolution = (scores, context, mentalHealth, judgmentClarity, timePattern) => {
  // 1. 판단 명료성 체크 (최우선)
  const clarityCheck = checkJudgmentClarity(judgmentClarity);
  if (clarityCheck) return clarityCheck;

  // 2. 경고 수집
  const warnings = [];

  // 시간 패턴
  const timeWarning = checkTimePattern(timePattern);
  if (timeWarning) warnings.push(timeWarning);

  // 정신건강
  warnings.push(...checkMentalHealth(mentalHealth));

  // 사회적 위험
  warnings.push(...checkSocialRiskFactors(context));

  // 중요 항목
  warnings.push(...checkCriticalItems(scores));

  // 3. 솔루션 찾기
  let solutions = [];

  // 모순 패턴 확인
  solutions = analyzeContradictions(scores);

  // 표준 패턴 확인
  if (solutions.length === 0) {
    solutions = analyzeStandardPatterns(scores);
  }

  // 기본 솔루션
  if (solutions.length === 0) {
    solutions.push(getDefaultSolution());
  }

  return {
    ...solutions[0],
    warnings
  };
};
