import React, { useState } from 'react';
import { AssessmentProvider, useAssessment } from './contexts/AssessmentContext';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 py-8">
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
    <AssessmentProvider>
      <AppContent />
    </AssessmentProvider>
  );
};

export default App;
