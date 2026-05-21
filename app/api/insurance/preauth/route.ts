import { NextResponse } from 'next/server';

// Mock database storage for pre-authorizations
// In a production environment, this would interface with the provisioned PostgreSQL DB.
// Using a simple in-memory structure for the prototype logic.

interface PreAuth {
  id: string;
  patient_id: string;
  patient_name: string;
  cdt_codes: string[];
  status: 'draft' | 'submitted' | 'pending' | 'authorized' | 'denied';
  carrier: string;
  amount?: number;
  submitted_at: string;
  last_updated: string;
}

const preAuths: PreAuth[] = [
  {
    id: 'pa_123',
    patient_id: 'pat_456',
    patient_name: 'P. Miller',
    cdt_codes: ['D3330'], // Root Canal
    status: 'submitted',
    carrier: 'Delta Dental',
    submitted_at: '2026-05-19T10:00:00Z',
    last_updated: '2026-05-19T10:00:00Z'
  },
  {
    id: 'pa_124',
    patient_id: 'pat_789',
    patient_name: 'S. Smith',
    cdt_codes: ['D6010'], // Implant
    status: 'authorized',
    carrier: 'Cigna',
    amount: 1200.00,
    submitted_at: '2026-05-15T09:00:00Z',
    last_updated: '2026-05-20T14:30:00Z'
  }
];

export async function GET() {
  return NextResponse.json({ data: preAuths });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.patient_name || !body.cdt_codes || !body.carrier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPreAuth: PreAuth = {
      id: `pa_${Math.random().toString(36).substr(2, 9)}`,
      patient_id: body.patient_id || 'unknown',
      patient_name: body.patient_name,
      cdt_codes: body.cdt_codes,
      status: 'submitted',
      carrier: body.carrier,
      submitted_at: new Date().toISOString(),
      last_updated: new Date().toISOString()
    };

    // In-memory push for simulation
    preAuths.push(newPreAuth);

    return NextResponse.json({ 
      message: 'Pre-authorization submitted successfully', 
      data: newPreAuth 
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
       return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const index = preAuths.findIndex(pa => pa.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Pre-auth not found' }, { status: 404 });
    }

    preAuths[index].status = status;
    preAuths[index].last_updated = new Date().toISOString();

    return NextResponse.json({ 
      message: `Status updated to ${status}`, 
      data: preAuths[index] 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}