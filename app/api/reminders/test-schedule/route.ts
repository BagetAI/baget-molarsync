import { NextResponse } from 'next/server';

/**
 * MolarSync Reminder Test Schedule
 * Returns a set of appointments designed to trigger the reminder engine
 * across different windows (24h, 2h, and future).
 */

export async function GET() {
  const baseTime = new Date('2026-05-21T10:24:00Z');
  
  const schedule = [
    {
      patient: "Alice Johnson",
      procedure: "Dental Cleaning (D1110)",
      time: new Date(baseTime.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      expected_trigger: "24-Hour Reminder",
      status: "Trigger Ready"
    },
    {
      patient: "Bob Smith",
      procedure: "Porcelain Crown (D2740)",
      time: new Date(baseTime.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      expected_trigger: "2-Hour Reminder",
      status: "Trigger Ready"
    },
    {
      patient: "Charlie Brown",
      procedure: "Comprehensive Exam (D0150)",
      time: new Date(baseTime.getTime() + 48 * 60 * 60 * 1000).toISOString(),
      expected_trigger: "None (Too far out)",
      status: "Waiting"
    },
    {
      patient: "David Wilson",
      procedure: "Deep Cleaning (D4341)",
      time: new Date(baseTime.getTime() + 1 * 60 * 60 * 1000).toISOString(),
      expected_trigger: "None (Too close/Window missed)",
      status: "Missed/Manual"
    }
  ];

  return NextResponse.json({
    base_system_time: baseTime.toISOString(),
    test_schedule: schedule,
    engine_endpoint: "/api/reminders/engine"
  });
}
