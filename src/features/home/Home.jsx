import React from 'react';
import { AlertCircle, BarChart3, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Home = ({ onStartAssessment, onViewInfo }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-trans-blue">
        <h1 className="text-3xl font-bold mb-4">
          <span className="inline-block bg-gradient-to-r from-[#d45080] to-[#1a90d0] bg-clip-text text-transparent">{t('homeTitle')}</span>
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">{t('homeDesc')}</p>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-red-900">{t('homeSafetyTitle')}</div>
                <div className="text-sm text-red-800">
                  {t('homeSafetyMsg')}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-sky-50 border border-trans-blue rounded">
            <div className="font-bold text-sky-800">{t('homeNotRequiredTitle')}</div>
            <div className="text-sm text-sky-700">
              {t('homeNotRequiredMsg')}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={onStartAssessment}
            className="p-8 bg-trans-blue text-gray-800 rounded-lg hover:opacity-90 shadow-lg transition-opacity"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8" />
              <div className="font-bold text-2xl">{t('homeAssessmentTitle')}</div>
            </div>
            <div className="text-sm opacity-90 text-left">
              {t('homeAssessmentDesc')}
            </div>
          </button>

          <div className="p-8 bg-trans-pink text-gray-800 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8" />
              <div className="font-bold text-2xl">{t('homeInfoTitle')}</div>
            </div>
            <div className="text-sm opacity-90 text-left mb-4">
              {t('homeInfoDesc')}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewInfo('mtf')}
                className="py-3 bg-white hover:bg-white/80 rounded font-semibold transition-colors text-gray-800"
              >
                MTF
              </button>
              <button
                onClick={() => onViewInfo('ftm')}
                className="py-3 bg-white hover:bg-white/80 rounded font-semibold transition-colors text-gray-800"
              >
                FTM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
