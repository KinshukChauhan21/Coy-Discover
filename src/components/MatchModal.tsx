'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Profile } from '@/lib/types';
import Image from 'next/image';

interface MatchModalProps {
  match: Profile | null;
  onClose: () => void;
  onViewMatches: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  match,
  onClose,
  onViewMatches,
}) => {
  useEffect(() => {
    if (!match) return;

    // Trigger confetti fireworks
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [match]);

  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-rose-500/30 p-6 text-center shadow-2xl shadow-rose-950/60 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Double-Blind Match!</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 mb-1">
          It&apos;s a Match!
        </h2>
        <p className="text-xs text-slate-300 mb-6">
          You and <span className="text-white font-semibold">{match.name}</span> secretly liked each other on Coy!
        </p>

        {/* Avatars comparison */}
        <div className="flex items-center justify-center -space-x-4 mb-6">
          {/* User placeholder avatar */}
          <div className="relative w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl ring-2 ring-rose-500/40">
            <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex flex-col items-center justify-center text-slate-300">
              <span className="text-xl font-bold">You</span>
            </div>
          </div>

          {/* Intersecting Glowing Heart */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/50 text-white animate-bounce">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          {/* Matched profile avatar */}
          <div className="relative w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden shadow-xl ring-2 ring-rose-500/40">
            <Image
              src={match.photo}
              alt={match.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </div>

        {/* Profile Info Snippet */}
        <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-750 mb-5 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm">
              {match.name}, {match.age}
            </h3>
            <span className="text-[11px] text-rose-400 font-medium">
              {match.city}
            </span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {match.bio}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Mutual privacy promise fulfilled</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onViewMatches}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>View in Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700/60 active:scale-95 transition-all"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
};
