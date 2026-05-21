import React from 'react';

/**
 * MolarSync Alpha Dashboard
 * Converting the original landing page concept into a functional Next.js Page.
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4ECD8] text-[#4A3728] font-sans selection:bg-[#6B2D3E] selection:text-[#F4ECD8]">
      {/* Background Noise Simulation */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

      <header className="py-12 border-b-2 border-[#4A3728] mb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-[#6B2D3E] font-serif mb-2">MolarSync</h1>
          <p className="italic opacity-80 text-lg">The Zero-IT Operational Layer for Independent Dental</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-serif text-[#6B2D3E] leading-tight mb-8">Operational Control Center</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Automating the administrative "phone tag" so you can focus on patient care.
          </p>
        </section>

        {/* Insurance Kanban Section */}
        <h3 className="text-2xl font-serif text-[#6B2D3E] mb-6 border-l-4 border-[#6B2D3E] pl-4">Insurance Pre-Auth Tracker</h3>
        <div className="bg-[#fdfdfd] border border-[#4A3728] p-6 rounded-md flex gap-4 overflow-x-auto shadow-md mb-16">
          <KanbanColumn title="Draft" cards={[]} />
          <KanbanColumn title="Submitted" cards={[
            { name: 'P. Miller', code: 'D3330 - Root Canal', status: 'Sent 2d ago', type: 'pending' },
            { name: 'J. Doe', code: 'D2740 - Crown', status: 'Sent 5d ago', type: 'pending' }
          ]} />
          <KanbanColumn title="Authorized" cards={[
            { name: 'S. Smith', name_full: 'Sarah Smith', code: 'D6010 - Implant', status: 'Ready to Book', type: 'success' }
          ]} />
          <KanbanColumn title="Action Required" cards={[]} />
        </div>

        {/* Reminders Section */}
        <h3 className="text-2xl font-serif text-[#6B2D3E] mb-6 border-l-4 border-[#38B2AC] pl-4">Automated Reminders</h3>
        <div className="bg-white border border-[#4A3728] rounded-md p-6 mb-16 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-bold text-gray-600">Patient</th>
                  <th className="pb-3 font-bold text-gray-600">Appointment</th>
                  <th className="pb-3 font-bold text-gray-600">CDT Codes</th>
                  <th className="pb-3 font-bold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <ReminderRow name="John Miller" time="May 22, 10:00 AM" codes="D1110" status="Queued" />
                <ReminderRow name="Sarah Smith" time="May 22, 2:30 PM" codes="D2740" status="Ready" />
                <ReminderRow name="David Wilson" time="May 23, 9:00 AM" codes="D0150" status="Pending" />
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-[#38B2AC] text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
              Trigger Reminder Sync
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Feature title="CDT-Aware SMS" description="Reminders automatically adjust for specific procedures. Crowns get prep-instructions; Cleanings get flossing tips." />
          <Feature title="Zero-IT Sync" description="Background processes poll carrier FHIR APIs every 24 hours to update your board automatically." />
        </section>

        <section className="bg-[#2C3E50] text-[#F4ECD8] p-12 rounded-lg text-center">
          <h3 className="text-3xl font-serif mb-6 text-[#F4ECD8]">Developer Testing</h3>
          <p className="mb-4 opacity-90">Test the reminder engine by triggering a mock SMS queue for an appointment.</p>
          <div className="bg-[#1a252f] p-4 rounded text-left font-mono text-sm overflow-x-auto border border-[#4A3728] mb-8 text-[#38B2AC]">
            {`curl -X POST /api/reminders/trigger \\
-H "Content-Type: application/json" \\
-d '{"appointmentId": "appt_002"}'`}
          </div>
          <p className="mb-4 opacity-90">Test the carrier webhook:</p>
          <div className="bg-[#1a252f] p-4 rounded text-left font-mono text-sm overflow-x-auto border border-[#4A3728] text-[#38B2AC]">
            {`curl -X POST /api/webhooks/carrier \\
-H "Content-Type: application/json" \\
-d '{"claim_id": "pa_123", "status": "authorized", "auth_number": "AUTH-7788"}'`}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-[#4A3728] opacity-70 text-center text-sm">
        <p>&copy; 2026 MolarSync. Built for independent clinics. Reminders & Insurance Tracking active.</p>
      </footer>
    </div>
  );
}

function KanbanColumn({ title, cards }: { title: string, cards: any[] }) {
  return (
    <div className="flex-1 min-w-[200px] bg-[#eee] p-3 rounded-sm border border-dashed border-[#4A3728]">
      <h4 className="text-xs uppercase font-bold text-[#2C3E50] mb-4 tracking-wider">{title}</h4>
      {cards.length === 0 ? (
        <div className="text-xs italic opacity-40 text-center py-4">No claims</div>
      ) : (
        cards.map((card, i) => (
          <div key={i} className="bg-white p-3 mb-3 border border-[#ccc] text-sm shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer">
            <strong className="block mb-1">{card.name}</strong>
            <span className="text-xs text-gray-600 block mb-2">{card.code}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded text-white ${card.type === 'success' ? 'bg-[#38B2AC]' : 'bg-[#d69e2e]'}`}>
              {card.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

function ReminderRow({ name, time, codes, status }: { name: string, time: string, codes: string, status: string }) {
  return (
    <tr>
      <td className="py-4 font-medium">{name}</td>
      <td className="py-4 text-gray-600">{time}</td>
      <td className="py-4"><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{codes}</code></td>
      <td className="py-4">
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${status === 'Queued' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function Feature({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white p-8 border border-[#4A3728] rounded shadow-[4px_4px_0_rgba(74,55,40,0.1)]">
      <h3 className="text-xl font-serif text-[#6B2D3E] mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
