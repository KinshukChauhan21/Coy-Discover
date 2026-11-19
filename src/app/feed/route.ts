import { NextResponse } from 'next/server';
import { getFeedProfiles } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feed = getFeedProfiles();
    return NextResponse.json(feed, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}
