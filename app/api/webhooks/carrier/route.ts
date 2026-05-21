import { NextResponse } from 'next/server';

/**
 * Webhook handler for carrier status updates.
 * Carriers or third-party clearinghouses (simulated) send POST requests here 
 * when a claim status changes.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claim_id, status, auth_number, amount_covered } = body;

    if (!claim_id || !status) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Logic: In a real app, this would query the DB and update the record.
    // For this prototype, we log the update and return success.
    console.log(`[Webhook Received] Claim ${claim_id} updated to ${status}`);

    // If status is 'authorized', we would typically trigger the SMS notification service here.
    if (status === 'authorized') {
      console.log(`Triggering Patient SMS for claim ${claim_id}: 'Good news! Your procedure has been authorized...'`);
    }

    return NextResponse.json({ 
      received: true, 
      processed_at: new Date().toISOString(),
      action: status === 'authorized' ? 'SMS_TRIGGERED' : 'STATUS_UPDATED'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}