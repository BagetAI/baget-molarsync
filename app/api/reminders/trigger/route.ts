import { NextResponse } from 'next/server';
import { generateReminderMessage } from '@/lib/reminder-logic';

/**
 * MolarSync Appointment Reminder Service
 * 
 * POST /api/reminders/trigger
 * Triggers the reminder engine for a specific appointment or all upcoming visits.
 * 
 * Logic:
 * 1. Fetches appointment and patient data (mocked).
 * 2. Processes CDT codes to generate context-specific instructions.
 * 3. Queues a mock SMS payload.
 */

interface MockAppointment {
  id: string;
  patient_name: string;
  appointment_time: string;
  cdt_codes: string[];
  phone: string;
}

const mockAppointments: MockAppointment[] = [
  {
    id: 'appt_001',
    patient_name: 'John Miller',
    appointment_time: 'May 22, 2026 at 10:00 AM',
    cdt_codes: ['D1110'], // Cleaning
    phone: '+15551234567'
  },
  {
    id: 'appt_002',
    patient_name: 'Sarah Smith',
    appointment_time: 'May 22, 2026 at 2:30 PM',
    cdt_codes: ['D2740'], // Crown
    phone: '+15559876543'
  },
  {
    id: 'appt_003',
    patient_name: 'David Wilson',
    appointment_time: 'May 23, 2026 at 9:00 AM',
    cdt_codes: ['D0150', 'D1110'], // Comprehensive Exam + Cleaning
    phone: '+15551112222'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { appointmentId } = body;

    const appointmentsToProcess = appointmentId 
      ? mockAppointments.filter(a => a.id === appointmentId)
      : mockAppointments;

    if (appointmentsToProcess.length === 0) {
      return NextResponse.json({ error: 'No appointments found to remind' }, { status: 404 });
    }

    const results = appointmentsToProcess.map(appt => {
      const message = generateReminderMessage({
        patientName: appt.patient_name,
        appointmentTime: appt.appointment_time,
        cdtCodes: appt.cdt_codes
      });

      // Simulation: Queuing the SMS payload
      // In production, this would insert into 'appointment_reminders' table 
      // and trigger a background worker (e.g. Inngest or Upstash Qstash)
      console.log(`[Reminders] Queuing SMS for ${appt.id}:`);
      console.log(`To: ${appt.phone}`);
      console.log(`Body: ${message}`);

      return {
        appointment_id: appt.id,
        status: 'queued',
        recipient: appt.phone,
        message: message,
        queued_at: new Date().toISOString()
      };
    });

    return NextResponse.json({
      success: true,
      reminders_processed: results.length,
      data: results
    });

  } catch (error) {
    console.error('Reminder trigger error:', error);
    return NextResponse.json({ error: 'Failed to process reminders' }, { status: 500 });
  }
}

/**
 * GET handler to check the status of upcoming reminders
 */
export async function GET() {
  return NextResponse.json({
    message: 'MolarSync Reminder Engine is active.',
    next_batch_scan: '2026-05-21T18:00:00Z',
    supported_channels: ['SMS', 'Email']
  });
}
