import React from 'react';

const ScoreSlider = ({ label, value, onChange, min = 0, max = 10 }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">
        {label} <span className="font-semibold">({value})</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default ScoreSlider;
