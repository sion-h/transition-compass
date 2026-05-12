import React, { useState } from 'react';
import { Home, Phone, Pill, DollarSign, Users } from 'lucide-react';
import { useAssessment } from '../../contexts/AssessmentContext';
import TimelineInfo from './components/TimelineInfo';
import MedicalInfo from './components/MedicalInfo';
import CostCalculator from './components/CostCalculator';
import SocialLegalInfo from './components/SocialLegalInfo';

const Info = ({ onNavigateHome, onStartAssessment }) => {
  const { state } = useAssessment();
  const { pathway } = state;
  const [infoSection, setInfoSection] = useState('timeline');

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
            onClick={onNavigateHome}
            className="px-4 py-2 bg-white border border-trans-pink text-rose-700 rounded flex items-center gap-2 hover:bg-trans-pink/10 transition-colors"
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
                    ? 'bg-trans-blue text-gray-800'
                    : 'bg-white/60 hover:bg-white/80 text-gray-700'
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
        {infoSection === 'timeline' && <TimelineInfo pathway={pathway} />}
        {infoSection === 'medical' && <MedicalInfo pathway={pathway} />}
        {infoSection === 'cost' && <CostCalculator pathway={pathway} />}
        {infoSection === 'social' && <SocialLegalInfo />}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onStartAssessment}
          className="px-8 py-4 bg-trans-blue text-gray-800 rounded-lg hover:opacity-90 shadow-lg text-lg font-semibold transition-opacity"
        >
          자기 이해 평가 시작 →
        </button>
      </div>
    </div>
  );
};

export default Info;
