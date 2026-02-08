// 기본 점수값
export const DEFAULT_SCORES = {
  dysphoria: {
    신체: 5,
    목소리: 5,
    가슴: 5,
    성기: 5,
    체모: 5,
    피부: 5,
    얼굴: 5,
    키체형: 5
  },
  euphoria: {
    원하는몸상상: 5,
    옷머리화장: 5,
    거울사진속자신: 5,
    원하는젠더인식: 5,
    미래자신상상: 5
  },
  socialDesire: {
    이름변경: 5,
    호칭변경: 5,
    외모표현변경: 5,
    성별표기변경: 5,
    커밍아웃: 5
  },
  medicalDesire: {
    호르몬치료: 5,
    상부수술: 5,
    하부수술: 5,
    얼굴수술: 5,
    음성수술: 5
  }
};

export const DEFAULT_MENTAL_HEALTH = {
  우울증: false,
  불안장애: false,
  트라우마: false,
  정신증: false,
  중독: false,
  섭식장애: false,
  해당없음: true
};

export const DEFAULT_COSTS = {
  mtf: {
    diagnosis: 400000,
    hormones_monthly: 100000,
    hormones_months: 12,
    laser_session: 200000,
    laser_sessions: 12,
    top_surgery: 10000000,
    bottom_surgery: 20000000,
    ffs: 10000000,
    vfs: 5000000,
    other: 0
  },
  ftm: {
    diagnosis: 400000,
    hormones_monthly: 100000,
    hormones_months: 12,
    laser_session: 0,
    laser_sessions: 0,
    top_surgery: 6000000,
    bottom_surgery: 25000000,
    ffs: 0,
    vfs: 0,
    other: 0
  }
};

export const TIME_PATTERNS = {
  stable: '일관됨 (수년간 비슷)',
  increasing: '점점 강해짐',
  fluctuating: '오락가락함'
};
