import { VercelRequest, VercelResponse } from '@vercel/node';

const preAuths = [
  {
    id: 'pa_123',
    patient_name: 'P. Miller',
    cdt_codes: ['D3330'],
    status: 'submitted',
    carrier: 'Delta Dental',
    submitted_at: '2026-05-19T10:00:00Z'
  },
  {
    id: 'pa_124',
    patient_name: 'S. Smith',
    cdt_codes: ['D6010'],
    status: 'authorized',
    carrier: 'Cigna',
    amount: 1200.00,
    submitted_at: '2026-05-15T09:00:00Z'
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json({ data: preAuths });
    case 'POST':
      const { patient_name, cdt_codes, carrier } = req.body;
      if (!patient_name || !cdt_codes || !carrier) {
        return res.status(400).json({ error: 'Missing fields' });
      }
      const newClaim = {
        id: `pa_${Math.random().toString(36).substr(2, 9)}`,
        patient_name,
        cdt_codes,
        status: 'submitted',
        carrier,
        submitted_at: new Date().toISOString()
      };
      preAuths.push(newClaim);
      return res.status(201).json({ message: 'Claim created', data: newClaim });
    case 'PATCH':
      const { id, status } = req.body;
      const index = preAuths.findIndex(p => p.id === id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      preAuths[index].status = status;
      return res.status(200).json({ message: 'Status updated', data: preAuths[index] });
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}