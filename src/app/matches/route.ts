import { NextResponse } from 'next/server';
import { getMutualMatches } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const matches = getMutualMatches();
    return NextResponse.json(
      {
        matches,
        totalMatches: matches.length,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
