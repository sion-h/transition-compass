import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, SCORE_LABELS } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ko';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, params = {}) => {
    const str = translations[language]?.[key] ?? translations.ko[key] ?? key;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
      str
    );
  };

  const tLabel = (key) => {
    return SCORE_LABELS[language]?.[key] ?? SCORE_LABELS.ko?.[key] ?? key;
  };

  const value = {
    language,
    setLanguage,
    t,
    tLabel
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
