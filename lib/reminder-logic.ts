/**
 * MolarSync Reminder Logic
 * Generates specific patient messages based on planned CDT procedure codes.
 */

export interface ReminderContext {
  patientName: string;
  appointmentTime: string;
  cdtCodes: string[];
}

export const CDT_INSTRUCTIONS: Record<string, string> = {
  'D1110': "Remember to floss before your visit for a better clean!",
  'D2740': "For your crown appointment: Please avoid eating heavy meals 2 hours before your visit.",
  'D6010': "Implant procedure: Please ensure you have someone available to drive you home.",
  'D0150': "New patient exam: Please arrive 10 minutes early to complete your registration.",
  'D4341': "Deep cleaning: Plan for a 90-minute session today.",
};

export function generateReminderMessage(ctx: ReminderContext): string {
  const { patientName, appointmentTime, cdtCodes } = ctx;
  
  // Find the first matching special instruction
  let specialInstruction = "";
  if (cdtCodes && cdtCodes.length > 0) {
    for (const code of cdtCodes) {
      if (CDT_INSTRUCTIONS[code]) {
        specialInstruction = ` ${CDT_INSTRUCTIONS[code]}`;
        break;
      }
    }
  }

  const baseMessage = `Hi ${patientName}, this is a reminder of your dental visit at MolarSync on ${appointmentTime}.`;
  const footer = " Reply C to confirm or call to reschedule.";

  return `${baseMessage}${specialInstruction}${footer}`;
}
