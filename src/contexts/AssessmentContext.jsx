import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DEFAULT_SCORES, DEFAULT_MENTAL_HEALTH, DEFAULT_COSTS } from '../shared/constants/defaults';

const AssessmentContext = createContext();

// Action Types
const ActionTypes = {
  UPDATE_SCORE: 'UPDATE_SCORE',
  UPDATE_MENTAL_HEALTH: 'UPDATE_MENTAL_HEALTH',
  UPDATE_CONTEXT: 'UPDATE_CONTEXT',
  UPDATE_COSTS: 'UPDATE_COSTS',
  SET_PATHWAY: 'SET_PATHWAY',
  SET_STEP: 'SET_STEP',
  RESET: 'RESET'
};

// Initial State
const initialState = {
  // Scores
  scores: DEFAULT_SCORES,
  
  // Mental Health & Clarity
  mentalHealth: DEFAULT_MENTAL_HEALTH,
  judgmentClarity: 7,
  timePattern: 'stable',
  timePressure: 5,
  
  // Context
  context: {
    occupation: 5,
    savingsMonths: 6,
    familySupport: 5,
    friendSupport: 5,
    physicalSafety: 5
  },
  
  // Costs
  costs: DEFAULT_COSTS.mtf,
  
  // Navigation
  pathway: null,
  step: 1
};

// Reducer
const assessmentReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SCORE:
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.category]: {
            ...state.scores[action.category],
            [action.key]: action.value
          }
        }
      };
      
    case ActionTypes.UPDATE_MENTAL_HEALTH:
      return {
        ...state,
        mentalHealth: {
          ...state.mentalHealth,
          [action.key]: action.value
        }
      };
      
    case ActionTypes.UPDATE_CONTEXT:
      return {
        ...state,
        [action.key]: action.value
      };
      
    case ActionTypes.UPDATE_COSTS:
      return {
        ...state,
        costs: {
          ...state.costs,
          ...action.costs
        }
      };
      
    case ActionTypes.SET_PATHWAY:
      return {
        ...state,
        pathway: action.pathway,
        costs: DEFAULT_COSTS[action.pathway] || state.costs
      };
      
    case ActionTypes.SET_STEP:
      return {
        ...state,
        step: action.step
      };
      
    case ActionTypes.RESET:
      return initialState;
      
    default:
      return state;
  }
};

// Provider Component
export const AssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  
  // LocalStorage persistence (optional)
  useEffect(() => {
    const saved = localStorage.getItem('assessment-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Restore state if needed
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('assessment-state', JSON.stringify(state));
  }, [state]);
  
  const value = {
    state,
    dispatch,
    
    // Helper functions
    updateScore: (category, key, value) => {
      dispatch({ type: ActionTypes.UPDATE_SCORE, category, key, value });
    },
    
    updateMentalHealth: (key, value) => {
      dispatch({ type: ActionTypes.UPDATE_MENTAL_HEALTH, key, value });
    },
    
    updateContext: (key, value) => {
      dispatch({ type: ActionTypes.UPDATE_CONTEXT, key, value });
    },
    
    updateCosts: (costs) => {
      dispatch({ type: ActionTypes.UPDATE_COSTS, costs });
    },
    
    setPathway: (pathway) => {
      dispatch({ type: ActionTypes.SET_PATHWAY, pathway });
    },
    
    setStep: (step) => {
      dispatch({ type: ActionTypes.SET_STEP, step });
    },
    
    reset: () => {
      dispatch({ type: ActionTypes.RESET });
    }
  };
  
  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Custom Hook
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};
