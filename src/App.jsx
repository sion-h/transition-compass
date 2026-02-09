import React, { useState } from 'react';
import { AssessmentProvider, useAssessment } from './contexts/AssessmentContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Home from './features/home/Home';
import Assessment from './features/assessment/index';
import Info from './features/info/index';

const AppContent = () => {
  const [mode, setMode] = useState(null); // null | 'assessment' | 'info'
  const { setPathway, reset } = useAssessment();

  const handleNavigateHome = () => {
    setMode(null);
    reset();
  };

  const handleStartAssessment = () => {
    setMode('assessment');
  };

  const handleViewInfo = (pathway) => {
    setPathway(pathway);
    setMode('info');
  };

  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 py-8 relative">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => setLanguage('ko')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            language === 'ko' ? 'bg-purple-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-gray-100'
          }`}
        >
          {t('langKo')}
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            language === 'en' ? 'bg-purple-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-gray-100'
          }`}
        >
          {t('langEn')}
        </button>
      </div>
      {!mode && (
        <Home
          onStartAssessment={handleStartAssessment}
          onViewInfo={handleViewInfo}
        />
      )}
      {mode === 'assessment' && (
        <Assessment onNavigateHome={handleNavigateHome} />
      )}
      {mode === 'info' && (
        <Info
          onNavigateHome={handleNavigateHome}
          onStartAssessment={handleStartAssessment}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AssessmentProvider>
        <AppContent />
      </AssessmentProvider>
    </LanguageProvider>
  );
};

export default App;
