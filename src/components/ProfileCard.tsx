'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Profile, SwipeAction } from '@/lib/types';
import { MapPin, GraduationCap, Briefcase, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface ProfileCardProps {
  profile: Profile;
  isTopCard: boolean;
  onSwipe: (action: SwipeAction) => void;
  isExiting: SwipeAction | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isTopCard,
  onSwipe,
  isExiting,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const photos = profile.photos && profile.photos.length > 0 ? profile.photos : [profile.photo];

  // Motion values for smooth drag physics
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-18, 18]);

  // Opacities for LIKE and PASS stamps
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isTopCard) return;

    const threshold = 90;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('pass');
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : prev));
  };

  return (
    <motion.div
      style={
        isTopCard
          ? {
              x,
              rotate,
              zIndex: 20,
            }
          : {
              scale: 0.95,
              y: 12,
              zIndex: 10,
              opacity: 0.65,
            }
      }
      drag={isTopCard && !isExiting ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      animate={
        isExiting === 'like'
          ? { x: 500, rotate: 25, opacity: 0 }
          : isExiting === 'pass'
          ? { x: -500, rotate: -25, opacity: 0 }
          : {}
      }
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/60 bg-slate-900 border border-slate-800 touch-none select-none cursor-grab active:cursor-grabbing"
    >
      {/* Photo with Next/Prev Tap zones */}
      <div className="relative w-full h-full">
        <Image
          src={photos[photoIndex]}
          alt={profile.name}
          fill
          priority={isTopCard}
          className="object-cover pointer-events-none"
          sizes="(max-width: 640px) 100vw, 420px"
        />

        {/* Story-style photo indicator bars */}
        {photos.length > 1 && (
          <div className="absolute top-2.5 left-3 right-3 z-20 flex gap-1.5">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === photoIndex ? 'bg-white shadow-sm' : 'bg-white/35'
                }`}
              />
            ))}
          </div>
        )}

        {/* Tap areas for photo gallery navigation */}
        {photos.length > 1 && (
          <>
            <div
              onClick={handlePrevPhoto}
              className="absolute left-0 top-0 bottom-40 w-1/3 z-10 cursor-pointer"
            />
            <div
              onClick={handleNextPhoto}
              className="absolute right-0 top-0 bottom-40 w-1/3 z-10 cursor-pointer"
            />
          </>
        )}

        {/* LIKE Stamp overlay */}
        {isTopCard && (
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-10 left-6 z-30 pointer-events-none border-4 border-emerald-400 bg-emerald-950/60 backdrop-blur-sm rounded-xl px-4 py-1.5 -rotate-12 shadow-lg shadow-emerald-900/50"
          >
            <span className="text-emerald-400 font-black tracking-widest text-2xl uppercase">
              LIKE
            </span>
          </motion.div>
        )}

        {/* PASS / NOPE Stamp overlay */}
        {isTopCard && (
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-10 right-6 z-30 pointer-events-none border-4 border-rose-500 bg-rose-950/60 backdrop-blur-sm rounded-xl px-4 py-1.5 rotate-12 shadow-lg shadow-rose-900/50"
          >
            <span className="text-rose-500 font-black tracking-widest text-2xl uppercase">
              PASS
            </span>
          </motion.div>
        )}

        {/* Dark gradient for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent pointer-events-none" />

        {/* Card Content & Details */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end text-left pointer-events-auto">
          {/* Privacy badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-750 text-slate-300 text-[10px] font-medium w-fit mb-2 backdrop-blur">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Double-Blind Encrypted</span>
          </div>

          {/* Name & Age */}
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
              {profile.name}
            </h2>
            <span className="text-xl font-normal text-slate-300 drop-shadow">
              {profile.age}
            </span>
          </div>

          {/* College & City */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 mt-1">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              {profile.city}
            </span>
            {profile.college && (
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                {profile.college}
              </span>
            )}
            {profile.job && (
              <span className="flex items-center gap-1 text-slate-400">
                <Briefcase className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                {profile.job}
              </span>
            )}
          </div>

          {/* Interests Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/70 text-slate-200 backdrop-blur-sm"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Bio (Expandable) */}
          <div className="mt-2.5">
            <p
              className={`text-xs text-slate-300 leading-relaxed ${
                isBioExpanded ? '' : 'line-clamp-2'
              }`}
            >
              {profile.bio}
            </p>
            {profile.bio.length > 80 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBioExpanded(!isBioExpanded);
                }}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-medium flex items-center gap-0.5 mt-1 transition-colors"
              >
                <span>{isBioExpanded ? 'Show less' : 'Read more'}</span>
                {isBioExpanded ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
