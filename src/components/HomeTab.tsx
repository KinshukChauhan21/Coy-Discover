'use client';

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HomeTabProps {
  onGoToDiscover: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
        <Sparkles className="w-8 h-8 text-rose-400/60" />
      </div>

      <h2 className="text-xl font-bold text-slate-100 tracking-tight mb-2">
        Home
      </h2>
      <p className="text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">
        This is the placeholder Home tab as specified in the assignment requirements. The active swipe-based discovery experience lives in the Discover tab.
      </p>

      <button
        onClick={onGoToDiscover}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all"
      >
        <Compass className="w-4 h-4" />
        Open Discover Tab
      </button>
    </div>
  );
};
