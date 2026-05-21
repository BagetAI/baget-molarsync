import { NextResponse } from 'next/server';
import { runReminderScan } from '@/lib/reminder-engine';

/**
 * MolarSync Reminder Engine Endpoint
 * 
 * This endpoint is designed to be called by a CRON job (e.g., Vercel Cron, GitHub Actions).
 * It scans the appointment database for upcoming slots and triggers reminders 
 * based on the 24h and 2h lead time rules.
 */

export async function GET(request: Request) {
  try {
    // In a real scenario, we'd use the current system time.
    // For testing/demo purposes, we'll allow overriding via a query param.
    const { searchParams } = new URL(request.url);
    const testTime = searchParams.get('testTime');
    
    // Default to May 21, 2026, 10:24 AM (as per context) if not provided
    const currentTime = testTime ? new Date(testTime) : new Date('2026-05-21T10:24:00Z');

    const results = await runReminderScan(currentTime);

    const sentCount = results.filter(r => r.status === 'sent').length;
    const skippedCount = results.filter(r => r.status === 'skipped').length;

    return NextResponse.json({
      success: true,
      timestamp: currentTime.toISOString(),
      summary: {
        total_processed: results.length,
        sent: sentCount,
        skipped: skippedCount
      },
      notifications: results
    });

  } catch (error) {
    console.error('[Engine Error]', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Reminder engine failed to process.' 
    }, { status: 500 });
  }
}

/**
 * POST method to manually trigger a re-scan or force a specific window.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const currentTime = body.time ? new Date(body.time) : new Date('2026-05-21T10:24:00Z');
  
  const results = await runReminderScan(currentTime);
  
  return NextResponse.json({
    message: "Manual scan completed",
    results
  });
}
