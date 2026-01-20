
import React from 'react';
import { STYLE_OPTIONS } from '../constants';
import { ImageStyle } from '../types';

interface StyleGridProps {
  selected: ImageStyle;
  onSelect: (style: ImageStyle) => void;
}

const StyleGrid: React.FC<StyleGridProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {STYLE_OPTIONS.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
            selected === style.id
              ? 'bg-blue-600/20 border-blue-500 text-blue-400'
              : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'
          }`}
        >
          <div className={`text-xl mb-2 ${selected === style.id ? 'scale-110' : ''} transition-transform`}>
            {style.icon}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider">{style.label}</span>
        </button>
      ))}
    </div>
  );
};

export default StyleGrid;
