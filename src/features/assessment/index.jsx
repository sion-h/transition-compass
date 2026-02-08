import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAssessment } from '../../contexts/AssessmentContext';
import ProgressBar from '../../shared/components/ProgressBar';
import AssessmentStep1 from './components/AssessmentStep1';
import AssessmentStep2 from './components/AssessmentStep2';
import AssessmentStep3 from './components/AssessmentStep3';
import AssessmentStep4 from './components/AssessmentStep4';
import AssessmentStep5 from './components/AssessmentStep5';
import AssessmentResults from './components/AssessmentResults';

const Assessment = ({ onNavigateHome }) => {
  const { state, setStep } = useAssessment();
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

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
};

export default Assessment;
