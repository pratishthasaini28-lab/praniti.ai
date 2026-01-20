
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
      <div className="relative flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Type your idea here (Hindi/English)... e.g. 'एक प्यारा सा बिल्ली का बच्चा' or 'A futuristic flying car'"
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[100px] resize-none text-lg placeholder:text-slate-500 transition-all"
            disabled={disabled}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-slate-500 pointer-events-none">
            <span>Press Enter to Generate</span>
            <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">↵</kbd>
          </div>
        </div>
        <button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="md:w-32 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {disabled ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <>
              <span>Create</span>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
