import { calculateAverage, getCriticalItems } from './calculations';
import { recTranslations } from '../../locales/translations';

const tr = (lang, key, params = {}) => {
  const str = recTranslations[lang]?.[key] ?? recTranslations.ko[key] ?? key;
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
    str
  );
};

/**
 * 판단 명료성 체크
 */
const checkJudgmentClarity = (judgmentClarity, lang = 'ko') => {
  if (judgmentClarity < 4) {
    return {
      primary: tr(lang, 'clarity_primary'),
      reason: tr(lang, 'clarity_reason', { val: judgmentClarity }),
      recommendations: [
        tr(lang, 'clarity_rec1'),
        tr(lang, 'clarity_rec2'),
        tr(lang, 'clarity_rec3'),
        tr(lang, 'clarity_rec4')
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
const checkTimePattern = (timePattern, lang = 'ko') => {
  if (timePattern === 'fluctuating') {
    return {
      title: tr(lang, 'time_title'),
      message: tr(lang, 'time_msg')
    };
  }
  return null;
};

/**
 * 정신건강 경고
 */
const checkMentalHealth = (mentalHealth, lang = 'ko') => {
  const warnings = [];
  const hasSeriousMentalHealth = mentalHealth.정신증 || mentalHealth.중독;
  const hasMildMentalHealth = mentalHealth.우울증 || mentalHealth.불안장애 || mentalHealth.트라우마;

  if (hasSeriousMentalHealth) {
    warnings.push({
      title: tr(lang, 'mh_serious_title'),
      message: tr(lang, 'mh_serious_msg')
    });
  } else if (hasMildMentalHealth) {
    warnings.push({
      title: tr(lang, 'mh_mild_title'),
      message: tr(lang, 'mh_mild_msg')
    });
  }

  return warnings;
};

/**
 * 개별 사회적 위험 요인 체크
 */
const checkSocialRiskFactors = (context, lang = 'ko') => {
  const warnings = [];
  const { occupation, familySupport, physicalSafety } = context;

  if (occupation >= 8) {
    warnings.push({ title: tr(lang, 'occ_title'), message: tr(lang, 'occ_msg') });
  }

  if (familySupport <= 2) {
    warnings.push({ title: tr(lang, 'family_title'), message: tr(lang, 'family_msg') });
  }

  if (physicalSafety <= 2) {
    warnings.push({ title: tr(lang, 'safety_title'), message: tr(lang, 'safety_msg') });
  }

  return warnings;
};

/**
 * 중요 항목 경고 - items는 번역된 문자열로 변환
 */
const checkCriticalItems = (scores, lang = 'ko', tLabel) => {
  const warnings = [];
  const { dysphoria, medicalDesire } = scores;
  const avgMedical = calculateAverage(medicalDesire);

  const criticalDysphoria = getCriticalItems(dysphoria);
  const criticalMedical = getCriticalItems(medicalDesire);

  if (criticalDysphoria.length > 0) {
    const items = criticalDysphoria.map(i => tLabel ? tLabel(i.key) : i.key).join(', ');
    warnings.push({
      title: tr(lang, 'dysphoria_critical_title'),
      message: tr(lang, 'dysphoria_critical_msg', { items })
    });
  }

  if (criticalMedical.length > 0 && avgMedical < 6) {
    const items = criticalMedical.map(i => tLabel ? tLabel(i.key) : i.key).join(', ');
    warnings.push({
      title: tr(lang, 'medical_critical_title'),
      message: tr(lang, 'medical_critical_msg', { items })
    });
  }

  return warnings;
};

/**
 * 모순 패턴 분석
 */
const analyzeContradictions = (scores, lang = 'ko') => {
  const { dysphoria, euphoria, socialDesire, medicalDesire } = scores;
  const avgDysphoria = calculateAverage(dysphoria);
  const avgEuphoria = calculateAverage(euphoria);
  const avgSocial = calculateAverage(socialDesire);
  const avgMedical = calculateAverage(medicalDesire);

  const solutions = [];
  const dys = avgDysphoria.toFixed(1);
  const med = avgMedical.toFixed(1);
  const euph = avgEuphoria.toFixed(1);
  const soc = avgSocial.toFixed(1);

  if (avgDysphoria >= 7 && avgMedical < 4) {
    solutions.push({
      primary: tr(lang, 'contra_primary'),
      reason: tr(lang, 'contra_reason', { dys, med }),
      recommendations: [
        tr(lang, 'contra_rec1'),
        tr(lang, 'contra_rec2'),
        tr(lang, 'contra_rec3'),
        tr(lang, 'contra_rec4')
      ],
      type: "contradiction"
    });
  }

  if (avgEuphoria >= 7 && avgSocial < 4) {
    solutions.push({
      primary: tr(lang, 'stealth_primary'),
      reason: tr(lang, 'stealth_reason', { euph, soc }),
      recommendations: [
        tr(lang, 'stealth_rec1'),
        tr(lang, 'stealth_rec2'),
        tr(lang, 'stealth_rec3'),
        tr(lang, 'stealth_rec4')
      ],
      type: "stealth"
    });
  }

  return solutions;
};

/**
 * 표준 패턴 분석
 */
const analyzeStandardPatterns = (scores, lang = 'ko') => {
  const { dysphoria, euphoria, socialDesire, medicalDesire } = scores;
  const avgDysphoria = calculateAverage(dysphoria);
  const avgEuphoria = calculateAverage(euphoria);
  const avgSocial = calculateAverage(socialDesire);
  const avgMedical = calculateAverage(medicalDesire);

  const solutions = [];
  const dys = avgDysphoria.toFixed(1);
  const euph = avgEuphoria.toFixed(1);
  const med = avgMedical.toFixed(1);

  if (avgEuphoria >= 7 && avgMedical < 5) {
    solutions.push({
      primary: tr(lang, 'social_primary'),
      reason: tr(lang, 'social_reason', { euph, med }),
      recommendations: [
        tr(lang, 'social_rec1'),
        tr(lang, 'social_rec2'),
        tr(lang, 'social_rec3'),
        tr(lang, 'social_rec4')
      ],
      type: "social"
    });
  }

  if (avgDysphoria >= 7 && avgMedical >= 7) {
    solutions.push({
      primary: tr(lang, 'medical_primary'),
      reason: tr(lang, 'medical_reason', { dys, med }),
      recommendations: [
        tr(lang, 'medical_rec1'),
        tr(lang, 'medical_rec2'),
        tr(lang, 'medical_rec3'),
        tr(lang, 'medical_rec4')
      ],
      type: "medical"
    });
  }

  if (avgDysphoria < 5 && avgEuphoria >= 7) {
    solutions.push({
      primary: tr(lang, 'explore_primary'),
      reason: tr(lang, 'explore_reason', { dys, euph }),
      recommendations: [
        tr(lang, 'explore_rec1'),
        tr(lang, 'explore_rec2'),
        tr(lang, 'explore_rec3'),
        tr(lang, 'explore_rec4')
      ],
      type: "explore"
    });
  }

  if (avgDysphoria >= 7 && avgEuphoria < 5) {
    solutions.push({
      primary: tr(lang, 'support_primary'),
      reason: tr(lang, 'support_reason', { dys, euph }),
      recommendations: [
        tr(lang, 'support_rec1'),
        tr(lang, 'support_rec2'),
        tr(lang, 'support_rec3'),
        tr(lang, 'support_rec4')
      ],
      type: "support"
    });
  }

  if (avgDysphoria < 5 && avgEuphoria < 5 && avgSocial < 5 && avgMedical < 5) {
    solutions.push({
      primary: tr(lang, 'wait_primary'),
      reason: tr(lang, 'wait_reason'),
      recommendations: [
        tr(lang, 'wait_rec1'),
        tr(lang, 'wait_rec2'),
        tr(lang, 'wait_rec3'),
        tr(lang, 'wait_rec4')
      ],
      type: "wait"
    });
  }

  return solutions;
};

/**
 * 기본 종합 솔루션
 */
const getDefaultSolution = (lang = 'ko') => {
  return {
    primary: tr(lang, 'default_primary'),
    reason: tr(lang, 'default_reason'),
    recommendations: [
      tr(lang, 'default_rec1'),
      tr(lang, 'default_rec2'),
      tr(lang, 'default_rec3'),
      tr(lang, 'default_rec4')
    ],
    type: "comprehensive"
  };
};

/**
 * 메인 추천 함수 - lang: 'ko' | 'en', tLabel: 키→표시 텍스트 번역 함수
 */
export const getPersonalizedSolution = (scores, context, mentalHealth, judgmentClarity, timePattern, lang = 'ko', tLabel = null) => {
  const clarityCheck = checkJudgmentClarity(judgmentClarity, lang);
  if (clarityCheck) return clarityCheck;

  const warnings = [];
  const timeWarning = checkTimePattern(timePattern, lang);
  if (timeWarning) warnings.push(timeWarning);

  warnings.push(...checkMentalHealth(mentalHealth, lang));
  warnings.push(...checkSocialRiskFactors(context, lang));
  warnings.push(...checkCriticalItems(scores, lang, tLabel));

  let solutions = analyzeContradictions(scores, lang);
  if (solutions.length === 0) {
    solutions = analyzeStandardPatterns(scores, lang);
  }
  if (solutions.length === 0) {
    solutions.push(getDefaultSolution(lang));
  }

  return { ...solutions[0], warnings };
};
