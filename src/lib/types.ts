export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos?: string[];
  bio: string;
  city: string;
  college: string;
  interests: string[];
  job?: string;
  hasLikedUser?: boolean; // Internal backend only; stripped in public feed
}

export type SwipeAction = 'like' | 'pass';

export interface SwipeRecord {
  profileId: string;
  action: SwipeAction;
  timestamp: string;
  isMatch: boolean;
}

export interface MatchRecord {
  profileId: string;
  matchedAt: string;
}

export interface SwipeRequest {
  profileId: string;
  action: SwipeAction;
}

export interface SwipeResponse {
  success: boolean;
  action: SwipeAction;
  isMatch: boolean;
  match?: Profile;
  message?: string;
}

export interface FeedResponse {
  profiles: Profile[];
  totalRemaining: number;
  totalSwiped: number;
}

export interface MatchesResponse {
  matches: (Profile & { matchedAt: string })[];
  totalMatches: number;
}
