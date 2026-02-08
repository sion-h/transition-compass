/**
 * 평균 계산
 */
export const calculateAverage = (obj) => {
  const values = Object.values(obj);
  return values.reduce((a, b) => a + b, 0) / values.length;
};

/**
 * 임계값 이상 항목 추출
 */
export const getHighItems = (obj, threshold = 7) => {
  return Object.entries(obj)
    .filter(([_, v]) => v >= threshold)
    .map(([k]) => k);
};

/**
 * 임계값 이하 항목 추출
 */
export const getLowItems = (obj, threshold = 3) => {
  return Object.entries(obj)
    .filter(([_, v]) => v <= threshold)
    .map(([k]) => k);
};

/**
 * 중요 항목 추출 (7점 이상)
 */
export const getCriticalItems = (obj) => {
  return Object.entries(obj)
    .filter(([_, v]) => v >= 7)
    .map(([k, v]) => ({ key: k, value: v }));
};

/**
 * 사회적 위험도 계산
 */
export const calculateSocialRisk = (context) => {
  const { occupation, familySupport, friendSupport, physicalSafety } = context;
  return (occupation + (10 - familySupport) + (10 - friendSupport) + (10 - physicalSafety)) / 4;
};

/**
 * 비용 계산
 */
export const calculateCosts = (costs) => {
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

  return { totalCost, monthlyCost, firstYearCost };
};
