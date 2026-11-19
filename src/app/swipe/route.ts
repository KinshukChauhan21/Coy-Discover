import { NextRequest, NextResponse } from 'next/server';
import { recordSwipe } from '@/lib/db';
import { SwipeAction } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileId, action } = body as { profileId: string; action: SwipeAction };

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "profileId"' },
        { status: 400 }
      );
    }

    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { error: 'Invalid "action". Must be either "like" or "pass"' },
        { status: 400 }
      );
    }

    const result = recordSwipe(profileId, action);
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    const status = error.message.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { error: error.message || 'Failed to record swipe' },
      { status }
    );
  }
}
