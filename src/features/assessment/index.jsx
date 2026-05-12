import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAssessment } from '../../contexts/AssessmentContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ProgressBar from '../../shared/components/ProgressBar';
import AssessmentStep1 from './components/AssessmentStep1';
import AssessmentStep2 from './components/AssessmentStep2';
import AssessmentStep3 from './components/AssessmentStep3';
import AssessmentStep4 from './components/AssessmentStep4';
import AssessmentStep5 from './components/AssessmentStep5';
import AssessmentResults from './components/AssessmentResults';

const Assessment = ({ onNavigateHome }) => {
  const { state, setStep } = useAssessment();
  const { t } = useLanguage();
  const { step } = state;

  const renderStep = () => {
    switch (step) {
      case 1: return <AssessmentStep1 />;
      case 2: return <AssessmentStep2 />;
      case 3: return <AssessmentStep3 />;
      case 4: return <AssessmentStep4 />;
      case 5: return <AssessmentStep5 />;
      case 6: return <AssessmentResults />;
      default: return <AssessmentStep1 />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar
        currentStep={step}
        totalSteps={6}
        onHomeClick={onNavigateHome}
      />

      {renderStep()}

      <div className="flex justify-between mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-3">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-trans-pink text-rose-700 rounded-lg hover:bg-trans-pink/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('prev')}
        </button>

        {step < 6 && (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-trans-blue text-white rounded-lg hover:opacity-90"
          >
            {t('next')}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
