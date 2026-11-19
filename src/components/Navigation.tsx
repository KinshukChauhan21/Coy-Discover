'use client';

import React from 'react';
import { Home, Compass, Heart, Shield, RefreshCw } from 'lucide-react';

export type TabType = 'home' | 'discover' | 'matches';

interface NavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  matchCount: number;
  onReset: () => void;
  isResetting: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  matchCount,
  onReset,
  isResetting,
}) => {
  return (
    <>
      {/* Top Header Bar */}
      <header className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-md shadow-rose-950/50">
            <span className="text-white text-xs font-black tracking-tight">coy</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 tracking-tight leading-none flex items-center gap-1.5">
              coy
              <span className="text-[10px] uppercase font-semibold tracking-wider text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-full border border-rose-500/20">
                Discover
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <Shield className="w-2.5 h-2.5 text-emerald-400" />
              Double-Blind Encrypted
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            disabled={isResetting}
            title="Reset feed to fresh 30+ mock profiles"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 border border-slate-750 rounded-full transition-colors active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isResetting ? 'animate-spin text-rose-400' : ''}`} />
            <span className="hidden sm:inline">Reset Deck</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 w-full max-w-md mx-auto border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-3 py-2 flex items-center justify-around">
        {/* Home Tab (Placeholder as per instructions) */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
            currentTab === 'home'
              ? 'text-rose-400 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Discover Tab */}
        <button
          onClick={() => onTabChange('discover')}
          className={`relative flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
            currentTab === 'discover'
              ? 'text-rose-400 scale-105 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Compass className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </div>
          <span className="text-[10px] font-medium">Discover</span>
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => onTabChange('matches')}
          className={`relative flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
            currentTab === 'matches'
              ? 'text-rose-400 scale-105 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {matchCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow">
                {matchCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Matches</span>
        </button>
      </nav>
    </>
  );
};
