import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { claim_id, status, auth_number } = req.body;

  if (!claim_id || !status) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  console.log(`[Webhook] Claim ${claim_id} updated to ${status} (Auth: ${auth_number || 'N/A'})`);

  return res.status(200).json({
    received: true,
    processed_at: new Date().toISOString(),
    status_updated: status
  });
}