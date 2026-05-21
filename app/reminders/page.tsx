import React from 'react';

/**
 * MolarSync Reminder Engine Monitor
 * Internal tool for Office Managers to see the status of automated notifications.
 */
export default function RemindersMonitor() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">Reminder Engine Monitor</h1>
            <p className="text-slate-500 mt-2">Automated 24h/2h patient notifications.</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
              Engine Active
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Sent Today" value="42" change="+12%" />
          <StatCard title="Queued" value="18" />
          <StatCard title="Confirmed" value="85%" />
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-lg">Next Scheduled Batch</h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">Force Manual Scan</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Reminder Type</th>
                <th className="px-6 py-3">Procedure</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <TableRow 
                name="Alice Johnson" 
                type="24-Hour" 
                procedure="Cleaning" 
                status="Sent" 
                time="10:24 AM" 
              />
              <TableRow 
                name="Bob Smith" 
                type="2-Hour" 
                procedure="Crown" 
                status="Queued" 
                time="12:24 PM" 
              />
              <TableRow 
                name="Charlie Brown" 
                type="24-Hour" 
                procedure="New Patient Exam" 
                status="Pending" 
                time="Tomorrow" 
              />
            </tbody>
          </table>
        </section>

        <div className="mt-8 p-6 bg-navy-900 rounded-xl text-white">
          <h3 className="font-bold mb-2">Technical Engine Logic</h3>
          <p className="text-sm opacity-80 mb-4">
            The engine scans for appointments within a ±30 minute window of the 24-hour and 2-hour marks. 
            It automatically pulls procedure-specific instructions (CDT codes) to provide pre-op guidance.
          </p>
          <div className="bg-black/30 p-4 rounded-md font-mono text-xs text-teal-400">
            GET /api/reminders/engine?testTime=2026-05-21T10:24:00Z
          </div>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto mt-20 text-center text-slate-400 text-xs">
        &copy; 2026 MolarSync Zero-IT Operational Layer. All notifications logged for HIPAA audit trails.
      </footer>
    </div>
  );
}

function StatCard({ title, value, change }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-navy-900">{value}</span>
        {change && <span className="text-xs font-bold text-teal-600">{change}</span>}
      </div>
    </div>
  );
}

function TableRow({ name, type, procedure, status, time }: any) {
  const statusStyles: any = {
    'Sent': 'bg-teal-100 text-teal-700',
    'Queued': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-slate-100 text-slate-500'
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-bold text-navy-900">{name}</td>
      <td className="px-6 py-4 text-slate-600">{type}</td>
      <td className="px-6 py-4 text-slate-500">{procedure}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[status]}`}>
            {status}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">{time}</span>
        </div>
      </td>
    </tr>
  );
}
