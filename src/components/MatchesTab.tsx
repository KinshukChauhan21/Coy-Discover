'use client';

import React, { useState } from 'react';
import { Profile } from '@/lib/types';
import { Heart, MessageCircle, MapPin, GraduationCap, X, Send, Compass } from 'lucide-react';
import Image from 'next/image';

interface MatchesTabProps {
  matches: (Profile & { matchedAt: string })[];
  onGoToDiscover: () => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ matches, onGoToDiscover }) => {
  const [activeChatProfile, setActiveChatProfile] = useState<(Profile & { matchedAt: string }) | null>(null);
  const [messages, setMessages] = useState<Record<string, { sender: 'user' | 'match'; text: string; time: string }[]>>({});
  const [inputText, setInputText] = useState('');

  const formatMatchTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const handleOpenChat = (match: Profile & { matchedAt: string }) => {
    setActiveChatProfile(match);
    if (!messages[match.id]) {
      setMessages((prev) => ({
        ...prev,
        [match.id]: [
          {
            sender: 'match',
            text: `Hey! I secretly had a crush on you. So glad you swiped right on Coy! 😊`,
            time: 'Just now',
          },
        ],
      }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatProfile) return;

    const userMsg = inputText.trim();
    const matchId = activeChatProfile.id;
    const now = 'Just now';

    setMessages((prev) => ({
      ...prev,
      [matchId]: [
        ...(prev[matchId] || []),
        { sender: 'user', text: userMsg, time: now },
      ],
    }));

    setInputText('');

    // Simulated reply after 1.2s
    setTimeout(() => {
      const replies = [
        "Haha totally! What are you up to this weekend?",
        "I was hoping you'd match back! Are you free for coffee sometime?",
        "No way, I've had the biggest crush on you since forever!",
        "Love your bio by the way. Let's hang out soon!",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => ({
        ...prev,
        [matchId]: [
          ...(prev[matchId] || []),
          { sender: 'match', text: randomReply, time: 'Just now' },
        ],
      }));
    }, 1200);
  };

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
          <Heart className="w-8 h-8 text-rose-500/50" />
        </div>

        <h2 className="text-xl font-bold text-slate-100 tracking-tight mb-2">
          No Matches Yet
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
          Matches only appear when someone you like also likes you back. Zero awkwardness, 100% mutual privacy.
        </p>

        <button
          onClick={onGoToDiscover}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-xs shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all"
        >
          <Compass className="w-4 h-4" />
          Start Swiping on Discover
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-md mx-auto p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Mutual Matches
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
              {matches.length}
            </span>
          </h2>
          <span className="text-[11px] text-slate-400">
            Double-blind revealed
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          These people liked you and you liked them back.
        </p>
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            onClick={() => handleOpenChat(match)}
            className="group relative flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer shadow-sm hover:shadow-md hover:shadow-rose-950/30"
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-rose-500/40 flex-shrink-0">
              <Image
                src={match.photo}
                alt={match.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="56px"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-100 text-sm truncate">
                  {match.name}, <span className="font-normal text-slate-400">{match.age}</span>
                </h3>
                <span className="text-[10px] text-rose-400/90 font-medium">
                  {formatMatchTime(match.matchedAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  {match.city}
                </span>
                {match.college && (
                  <span className="flex items-center gap-1 truncate">
                    • <GraduationCap className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    {match.college}
                  </span>
                )}
              </div>

              {/* Interests Snippet */}
              <div className="flex items-center gap-1 mt-1.5 overflow-hidden">
                {match.interests.slice(0, 2).map((interest, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 truncate"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Chat Action Icon */}
            <div className="w-8 h-8 rounded-full bg-rose-500/10 group-hover:bg-rose-500 text-rose-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Chat Dialog */}
      {activeChatProfile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md h-[85vh] sm:h-[600px] bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-rose-500/50">
                  <Image
                    src={activeChatProfile.photo}
                    alt={activeChatProfile.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-100 leading-tight">
                    {activeChatProfile.name}
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Matched on Coy
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveChatProfile(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="text-center my-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400/80 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                  Double-Blind Match Confirmed 🎉
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  You both added each other to your crush lists
                </p>
              </div>

              {(messages[activeChatProfile.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-rose-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-750 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Message ${activeChatProfile.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-800 text-slate-100 text-xs rounded-full px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
