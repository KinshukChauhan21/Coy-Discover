import fs from 'fs';
import path from 'path';
import type { Profile, SwipeRecord, MatchRecord, SwipeAction } from './types.ts';
import { INITIAL_PROFILES } from './mockData.ts';

interface DatabaseSchema {
  profiles: Profile[];
  swipes: SwipeRecord[];
  matches: MatchRecord[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure DB directory and file exist
function initDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      profiles: INITIAL_PROFILES,
      swipes: [],
      matches: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    // Ensure all keys are present
    if (!parsed.profiles || !Array.isArray(parsed.profiles)) {
      parsed.profiles = INITIAL_PROFILES;
    }
    if (!parsed.swipes || !Array.isArray(parsed.swipes)) {
      parsed.swipes = [];
    }
    if (!parsed.matches || !Array.isArray(parsed.matches)) {
      parsed.matches = [];
    }
    return parsed as DatabaseSchema;
  } catch {
    const initialData: DatabaseSchema = {
      profiles: INITIAL_PROFILES,
      swipes: [],
      matches: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

export function getDb(): DatabaseSchema {
  return initDb();
}

export function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE);
}

/**
 * Strips sensitive privacy fields (e.g. hasLikedUser) from profile objects.
 * Core privacy safeguard for Coy: the client must never know if a profile has liked them
 * unless it is an established mutual match.
 */
export function sanitizeProfile(profile: Profile): Profile {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasLikedUser, ...safe } = profile;
  return safe;
}

/**
 * Returns profiles that the logged-in user has NOT swiped on yet.
 * Never includes hasLikedUser in the returned payload.
 */
export function getFeedProfiles(): { profiles: Profile[]; totalRemaining: number; totalSwiped: number } {
  const db = getDb();
  const swipedIds = new Set(db.swipes.map((s) => s.profileId));

  const unswiped = db.profiles.filter((p) => !swipedIds.has(p.id));
  const sanitized = unswiped.map(sanitizeProfile);

  return {
    profiles: sanitized,
    totalRemaining: sanitized.length,
    totalSwiped: swipedIds.size,
  };
}

/**
 * Records a swipe action (like or pass).
 * A match is generated if and only if:
 * 1. Action is 'like'
 * 2. The target profile has already liked the user (hasLikedUser === true)
 */
export function recordSwipe(profileId: string, action: SwipeAction): {
  success: boolean;
  action: SwipeAction;
  isMatch: boolean;
  match?: Profile;
  alreadySwiped?: boolean;
} {
  const db = getDb();
  const existingSwipe = db.swipes.find((s) => s.profileId === profileId);

  if (existingSwipe) {
    const targetProfile = db.profiles.find((p) => p.id === profileId);
    return {
      success: true,
      action: existingSwipe.action,
      isMatch: existingSwipe.isMatch,
      match: existingSwipe.isMatch && targetProfile ? sanitizeProfile(targetProfile) : undefined,
      alreadySwiped: true,
    };
  }

  const targetProfile = db.profiles.find((p) => p.id === profileId);
  if (!targetProfile) {
    throw new Error(`Profile with id "${profileId}" not found`);
  }

  const isMutual = action === 'like' && Boolean(targetProfile.hasLikedUser);
  const now = new Date().toISOString();

  const newSwipe: SwipeRecord = {
    profileId,
    action,
    timestamp: now,
    isMatch: isMutual,
  };

  db.swipes.push(newSwipe);

  if (isMutual) {
    const alreadyMatched = db.matches.some((m) => m.profileId === profileId);
    if (!alreadyMatched) {
      db.matches.push({
        profileId,
        matchedAt: now,
      });
    }
  }

  saveDb(db);

  return {
    success: true,
    action,
    isMatch: isMutual,
    match: isMutual ? sanitizeProfile(targetProfile) : undefined,
  };
}

/**
 * Returns all mutual matches for the user, ordered by match date descending.
 */
export function getMutualMatches(): (Profile & { matchedAt: string })[] {
  const db = getDb();
  const matchMap = new Map<string, string>();
  for (const m of db.matches) {
    matchMap.set(m.profileId, m.matchedAt);
  }

  const matchedProfiles = db.profiles
    .filter((p) => matchMap.has(p.id))
    .map((p) => ({
      ...sanitizeProfile(p),
      matchedAt: matchMap.get(p.id)!,
    }))
    .sort((a, b) => new Date(b.matchedAt).getTime() - new Date(a.matchedAt).getTime());

  return matchedProfiles;
}

/**
 * Reset helper for testing and demo purposes.
 */
export function resetDatabase(): void {
  const freshDb: DatabaseSchema = {
    profiles: INITIAL_PROFILES,
    swipes: [],
    matches: [],
  };
  saveDb(freshDb);
}
