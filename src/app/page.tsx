'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navigation, TabType } from '@/components/Navigation';
import { HomeTab } from '@/components/HomeTab';
import { DiscoverTab } from '@/components/DiscoverTab';
import { MatchesTab } from '@/components/MatchesTab';
import { MatchModal } from '@/components/MatchModal';
import { Profile } from '@/lib/types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('discover');
  const [matches, setMatches] = useState<(Profile & { matchedAt: string })[]>([]);
  const [latestMatch, setLatestMatch] = useState<Profile | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [, setRemainingCount] = useState<number>(0);

  // Load mutual matches
  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/matches');
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches || []);
      }
    } catch (err) {
      console.error('Failed to fetch matches:', err);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleMatchCreated = (matchedProfile: Profile) => {
    setLatestMatch(matchedProfile);
    fetchMatches();
  };

  const handleReset = async () => {
    try {
      setIsResetting(true);
      const res = await fetch('/reset', { method: 'POST' });
      if (res.ok) {
        await fetchMatches();
        // Reload page or force refresh components
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to reset app data:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-100 sm:py-6">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[820px] sm:max-h-[880px] bg-slate-950 sm:rounded-[36px] sm:border sm:border-slate-800/80 sm:shadow-2xl sm:shadow-rose-950/20 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <Navigation
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          matchCount={matches.length}
          onReset={handleReset}
          isResetting={isResetting}
        />

        {/* Tab Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {currentTab === 'home' && (
            <HomeTab onGoToDiscover={() => setCurrentTab('discover')} />
          )}

          {currentTab === 'discover' && (
            <DiscoverTab
              onMatchCreated={handleMatchCreated}
              onGoToMatches={() => setCurrentTab('matches')}
              onDeckUpdated={setRemainingCount}
            />
          )}

          {currentTab === 'matches' && (
            <MatchesTab
              matches={matches}
              onGoToDiscover={() => setCurrentTab('discover')}
            />
          )}
        </div>

        {/* Match Celebration Modal */}
        <MatchModal
          match={latestMatch}
          onClose={() => setLatestMatch(null)}
          onViewMatches={() => {
            setLatestMatch(null);
            setCurrentTab('matches');
          }}
        />
      </div>
    </main>
  );
}
