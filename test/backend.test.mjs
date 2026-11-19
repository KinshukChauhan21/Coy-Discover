import assert from 'node:assert';
import { getFeedProfiles, recordSwipe, getMutualMatches, resetDatabase, getDb } from '../src/lib/db.ts';

console.log('🧪 Starting Coy Discover Backend & Privacy Test Suite...\n');

// Step 1: Reset database
resetDatabase();
console.log('✓ Database reset successfully.');

// Step 2: Feed check
const initialFeed = getFeedProfiles();
assert.strictEqual(initialFeed.profiles.length, 32, 'Initial feed should contain 32 profiles');
console.log(`✓ GET /feed returned ${initialFeed.profiles.length} profiles.`);

// Step 3: Privacy check - Never reveal hasLikedUser
for (const p of initialFeed.profiles) {
  assert.strictEqual(
    Object.prototype.hasOwnProperty.call(p, 'hasLikedUser'),
    false,
    `PRIVACY VIOLATION: Profile ${p.id} leaked hasLikedUser to client!`
  );
}
console.log('✓ Privacy Guarantee verified: ZERO profiles leaked "hasLikedUser" in feed.');

// Step 4: Swipe PASS on prof_02 (Rohan Mehta)
const passResult = recordSwipe('prof_02', 'pass');
assert.strictEqual(passResult.success, true);
assert.strictEqual(passResult.isMatch, false, 'Pass action must never generate a match');
console.log('✓ POST /swipe with PASS recorded correctly (isMatch = false).');

// Verify prof_02 is removed from feed
const feedAfterPass = getFeedProfiles();
assert.strictEqual(feedAfterPass.profiles.length, 31, 'Feed must have 31 profiles remaining after 1 swipe');
assert.strictEqual(feedAfterPass.profiles.some(p => p.id === 'prof_02'), false, 'Swiped profile must never appear in feed again');
console.log('✓ Profile swiped on never appears in feed again.');

// Step 5: Swipe LIKE on prof_04 (Kabir Verma - hasLikedUser: false)
const likeNoMatch = recordSwipe('prof_04', 'like');
assert.strictEqual(likeNoMatch.success, true);
assert.strictEqual(likeNoMatch.isMatch, false, 'Like without mutual crush must not generate a match');
console.log('✓ POST /swipe with LIKE without mutual like does NOT create match (Double-blind upheld).');

// Step 6: Swipe LIKE on prof_01 (Ananya Sharma - hasLikedUser: true)
const likeMatch = recordSwipe('prof_01', 'like');
assert.strictEqual(likeMatch.success, true);
assert.strictEqual(likeMatch.isMatch, true, 'Mutual like MUST generate a match');
assert.ok(likeMatch.match, 'Match payload must be returned on mutual match');
assert.strictEqual(likeMatch.match.name, 'Ananya Sharma');
assert.strictEqual(
  Object.prototype.hasOwnProperty.call(likeMatch.match, 'hasLikedUser'),
  false,
  'Match profile must also be sanitized'
);
console.log('✓ POST /swipe with mutual LIKE triggered "It\'s a match!" successfully.');

// Step 7: Check GET /matches
const matches = getMutualMatches();
assert.strictEqual(matches.length, 1, 'There should be exactly 1 mutual match');
assert.strictEqual(matches[0].id, 'prof_01');
assert.ok(matches[0].matchedAt, 'Match must have matchedAt timestamp');
console.log(`✓ GET /matches returned ${matches.length} mutual match (${matches[0].name}).`);

// Step 8: Persistence check in db.json
const rawDb = getDb();
assert.strictEqual(rawDb.swipes.length, 3, 'DB should persist 3 swipes');
assert.strictEqual(rawDb.matches.length, 1, 'DB should persist 1 match');
console.log('✓ Data persistence across sessions/reloads verified.');

// Step 9: Reset DB check
resetDatabase();
const resetFeed = getFeedProfiles();
assert.strictEqual(resetFeed.profiles.length, 32, 'Reset should restore all 32 profiles');
const resetMatches = getMutualMatches();
assert.strictEqual(resetMatches.length, 0, 'Reset should clear all matches');
console.log('✓ Reset functionality restored 32 mock profiles cleanly.\n');

console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! 100% compliance with requirements.');
