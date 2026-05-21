import { ReminderContext, generateReminderMessage } from './reminder-logic';

/**
 * MolarSync Reminder Engine
 * Handles scanning, window logic, and mock delivery for patient reminders.
 */

export interface AppointmentWithPatient {
  id: string;
  patient_name: string;
  phone: string;
  start_time: string;
  cdt_codes: string[];
}

export interface ReminderResult {
  appointmentId: string;
  type: '24h' | '2h';
  message: string;
  recipient: string;
  status: 'sent' | 'skipped';
  reason?: string;
}

// Mock Database of Appointments
// In production, these would be queried from PostgreSQL based on the time window.
const mockAppointments: AppointmentWithPatient[] = [
  {
    id: 'appt_24h_test',
    patient_name: 'Alice Johnson',
    phone: '+15550001111',
    // Exactly 24 hours from "now" (simulated as May 21, 2026, 10:24 AM)
    start_time: '2026-05-22T10:24:00Z', 
    cdt_codes: ['D1110'] // Cleaning
  },
  {
    id: 'appt_2h_test',
    patient_name: 'Bob Smith',
    phone: '+15550002222',
    // Exactly 2 hours from "now"
    start_time: '2026-05-21T12:24:00Z',
    cdt_codes: ['D2740'] // Crown
  },
  {
    id: 'appt_future',
    patient_name: 'Charlie Brown',
    phone: '+15550003333',
    start_time: '2026-05-25T09:00:00Z',
    cdt_codes: ['D0150']
  }
];

// Mock state of sent reminders to prevent duplicates
const sentRemindersLog: Set<string> = new Set();

/**
 * Scans for appointments within specific time windows and triggers notifications.
 */
export async function runReminderScan(currentTime: Date): Promise<ReminderResult[]> {
  const results: ReminderResult[] = [];

  for (const appt of mockAppointments) {
    const apptTime = new Date(appt.start_time);
    const diffMs = apptTime.getTime() - currentTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    let type: '24h' | '2h' | null = null;

    // 24-hour window logic (23.5 to 24.5 hours)
    if (diffHours >= 23.5 && diffHours <= 24.5) {
      type = '24h';
    } 
    // 2-hour window logic (1.5 to 2.5 hours)
    else if (diffHours >= 1.5 && diffHours <= 2.5) {
      type = '2h';
    }

    if (type) {
      const logKey = `${appt.id}_${type}`;
      
      if (sentRemindersLog.has(logKey)) {
        results.push({
          appointmentId: appt.id,
          type,
          message: "",
          recipient: appt.phone,
          status: 'skipped',
          reason: 'Already sent'
        });
        continue;
      }

      const message = generateReminderMessage({
        patientName: appt.patient_name,
        appointmentTime: apptTime.toLocaleString('en-US', { 
          month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
        }),
        cdtCodes: appt.cdt_codes
      });

      // Mock Delivery Service
      await mockDeliveryService(appt.phone, message, type);
      
      sentRemindersLog.add(logKey);
      
      results.push({
        appointmentId: appt.id,
        type,
        message,
        recipient: appt.phone,
        status: 'sent'
      });
    }
  }

  return results;
}

/**
 * Mock Service for SMS/Email Delivery
 */
async function mockDeliveryService(to: string, body: string, type: string) {
  console.log(`[MOCK DELIVERY - ${type.toUpperCase()}]`);
  console.log(`To: ${to}`);
  console.log(`Body: ${body}`);
  // Simulate network latency
  return new Promise(resolve => setTimeout(resolve, 50));
}
