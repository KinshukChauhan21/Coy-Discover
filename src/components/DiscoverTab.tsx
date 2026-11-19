'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Profile, SwipeAction } from '@/lib/types';
import { ProfileCard } from './ProfileCard';
import { X, Heart, RefreshCw, Compass, Sparkles, AlertCircle } from 'lucide-react';

interface DiscoverTabProps {
  onMatchCreated: (matchedProfile: Profile) => void;
  onGoToMatches: () => void;
  onDeckUpdated: (remaining: number) => void;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({
  onMatchCreated,
  onGoToMatches,
  onDeckUpdated,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exitingAction, setExitingAction] = useState<SwipeAction | null>(null);
  const [isProcessingSwipe, setIsProcessingSwipe] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/feed');
      if (!res.ok) {
        throw new Error('Failed to load feed profiles');
      }
      const data = await res.json();
      setProfiles(data.profiles || []);
      onDeckUpdated(data.profiles?.length || 0);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [onDeckUpdated]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleSwipe = useCallback(
    async (action: SwipeAction) => {
      if (profiles.length === 0 || isProcessingSwipe) return;

      const currentProfile = profiles[0];
      setIsProcessingSwipe(true);
      setExitingAction(action);

      try {
        // Optimistic UI: let exit animation run for 280ms
        const [swipeResult] = await Promise.all([
          fetch('/swipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              profileId: currentProfile.id,
              action,
            }),
          }).then((r) => r.json()),
          new Promise((resolve) => setTimeout(resolve, 280)),
        ]);

        // Pop top card
        setProfiles((prev) => {
          const updated = prev.slice(1);
          onDeckUpdated(updated.length);
          return updated;
        });

        // If it's a mutual match, notify parent to trigger MatchModal
        if (swipeResult.isMatch && swipeResult.match) {
          onMatchCreated(swipeResult.match);
        }
      } catch (err) {
        console.error('Error recording swipe:', err);
      } finally {
        setExitingAction(null);
        setIsProcessingSwipe(false);
      }
    },
    [profiles, isProcessingSwipe, onDeckUpdated, onMatchCreated]
  );

  // Keyboard navigation for desktop users (ArrowLeft = Pass, ArrowRight = Like)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (profiles.length === 0 || isProcessingSwipe) return;
      if (e.key === 'ArrowLeft') {
        handleSwipe('pass');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('like');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [profiles, isProcessingSwipe, handleSwipe]);

  const handleResetDeck = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProfiles(data.profiles || []);
        onDeckUpdated(data.profiles?.length || 0);
      }
    } catch (err) {
      console.error('Failed to reset deck:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 select-none">
        <div className="relative w-16 h-16 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
          <Heart className="w-6 h-6 text-rose-500 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-sm font-medium text-slate-300">Curating secret crushes...</p>
        <p className="text-xs text-slate-500 mt-1">Applying double-blind encryption</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-100 mb-1">Failed to load feed</h3>
        <p className="text-xs text-slate-400 mb-4 max-w-xs">{error}</p>
        <button
          onClick={fetchFeed}
          className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Clear Empty State when all cards are swiped
  if (profiles.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none animate-fade-in">
        <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-400 shadow-xl">
          <Sparkles className="w-10 h-10 text-rose-400 animate-pulse" />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
            ✓
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-1">
          You&apos;re All Caught Up!
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
          You have reviewed all 30+ mock profiles in your feed. A profile that has been swiped on will never appear again.
        </p>

        <div className="flex flex-col gap-2.5 w-full max-w-xs">
          <button
            onClick={onGoToMatches}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>View Mutual Matches</span>
          </button>

          <button
            onClick={handleResetDeck}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Deck (32 Fresh Profiles)</span>
          </button>
        </div>
      </div>
    );
  }

  const topProfile = profiles[0];
  const nextProfile = profiles[1];

  return (
    <div className="flex-1 w-full max-w-md mx-auto flex flex-col justify-between p-3 pb-20 select-none">
      {/* Top status indicator */}
      <div className="flex items-center justify-between px-2 pt-1 pb-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Compass className="w-3.5 h-3.5 text-rose-400" />
          <span>{profiles.length} profiles remaining</span>
        </span>
        <span className="text-[10px] text-slate-500">
          Desktop: Use ← / → keys or buttons below
        </span>
      </div>

      {/* Card Deck Viewport */}
      <div className="relative w-full aspect-[3/4.4] sm:aspect-[3/4.2] max-h-[580px] my-auto">
        {/* Next card in stack (preview behind top card) */}
        {nextProfile && (
          <ProfileCard
            key={nextProfile.id}
            profile={nextProfile}
            isTopCard={false}
            onSwipe={() => {}}
            isExiting={null}
          />
        )}

        {/* Top Active Card */}
        {topProfile && (
          <ProfileCard
            key={topProfile.id}
            profile={topProfile}
            isTopCard={true}
            onSwipe={handleSwipe}
            isExiting={exitingAction}
          />
        )}
      </div>

      {/* Desktop & Touch Bottom Action Buttons */}
      <div className="flex items-center justify-center gap-6 pt-3 pb-1">
        {/* Pass Button */}
        <button
          onClick={() => handleSwipe('pass')}
          disabled={isProcessingSwipe}
          aria-label="Pass profile (Swipe Left)"
          className="group w-14 h-14 rounded-full bg-slate-900/90 hover:bg-rose-950/40 border-2 border-rose-500/40 hover:border-rose-500 text-rose-400 hover:text-rose-300 flex items-center justify-center shadow-lg shadow-black/40 active:scale-90 transition-all cursor-pointer"
        >
          <X className="w-6 h-6 group-hover:scale-110 transition-transform stroke-[2.5]" />
        </button>

        {/* Deck Reset Quick Button */}
        <button
          onClick={handleResetDeck}
          title="Restart demo deck"
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-750 text-slate-400 hover:text-slate-200 flex items-center justify-center shadow-md active:scale-90 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Like Button */}
        <button
          onClick={() => handleSwipe('like')}
          disabled={isProcessingSwipe}
          aria-label="Like profile (Swipe Right)"
          className="group w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white flex items-center justify-center shadow-lg shadow-rose-950/60 active:scale-90 transition-all cursor-pointer"
        >
          <Heart className="w-6 h-6 fill-white group-hover:scale-110 transition-transform stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
