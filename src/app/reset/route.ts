import { NextResponse } from 'next/server';
import { resetDatabase, getFeedProfiles } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    resetDatabase();
    const feed = getFeedProfiles();
    return NextResponse.json(
      {
        success: true,
        message: 'Database reset to initial mock profiles successfully',
        ...feed,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || 'Failed to reset database' },
      { status: 500 }
    );
  }
}
