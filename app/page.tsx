import React from 'react';

/**
 * MolarSync Insurance Command Center
 * Modern High-Fidelity UI for Independent Dental Practices
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background font-sans text-navy-900">
      {/* Navigation */}
      <nav className="bg-navy-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center font-bold">M</div>
          <span className="text-xl font-bold tracking-tight">MolarSync</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium opacity-90">
          <a href="#" className="hover:text-teal-500 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-teal-500 transition-colors">Patients</a>
          <a href="#" className="border-b-2 border-teal-500 pb-1">Insurance Tracker</a>
          <a href="#" className="hover:text-teal-500 transition-colors">Settings</a>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs border border-white/20">
            DR
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Insurance Command Center</h1>
            <p className="text-slate-600">Recovering 10+ hours per week of administrative phone tag.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md shadow-sm text-sm font-semibold hover:bg-slate-50 transition-colors">
              Export Log
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-semibold hover:bg-blue-700 transition-all">
              Manual Add Claim
            </button>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="mb-12 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
          <img 
            src="images/high-fidelity-ui-dashboard-for-a-dental-.png" 
            alt="MolarSync Insurance Tracker Dashboard Preview" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Kanban Board Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KanbanColumn title="Draft" count={2} status="bg-slate-200 text-slate-700">
            <ClaimCard name="Alice Johnson" code="D2740" status="Missing Narrative" urgency="high" />
            <ClaimCard name="Bob Smith" code="D6010" status="Ready to Submit" urgency="low" />
          </KanbanColumn>
          
          <KanbanColumn title="Submitted" count={4} status="bg-blue-100 text-blue-700">
            <ClaimCard name="Charlie Brown" code="D3330" carrier="Delta Dental" time="2d ago" />
            <ClaimCard name="Diana Prince" code="D2740" carrier="Cigna" time="5d ago" />
          </KanbanColumn>

          <KanbanColumn title="Action Required" count={1} status="bg-yellow-100 text-yellow-700">
            <ClaimCard name="Edward Norton" code="D6010" carrier="MetLife" status="Need X-Ray" urgency="high" />
          </KanbanColumn>

          <KanbanColumn title="Authorized" count={3} status="bg-teal-100 text-teal-700">
            <ClaimCard name="Fiona Apple" code="D2740" amount="$1,250" status="Ready to Book" authorized />
            <ClaimCard name="George Miller" code="D3330" amount="$800" status="Ready to Book" authorized />
          </KanbanColumn>
        </div>

        {/* Claim Detail Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Claim Detail View</h2>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xl max-w-5xl mx-auto">
             <img 
              src="images/detailed-ui-modal-window-overlay-for-a-d.png" 
              alt="MolarSync Claim Detail Modal Preview" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mobile View Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8">Optimized for Front-Desk Tablets</h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden">
             <img 
              src="images/mobile-responsive-ui-design-of-the-molar.png" 
              alt="MolarSync Mobile View Preview" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>

      <footer className="py-12 mt-20 border-t border-slate-200 bg-white text-center">
        <p className="text-sm text-slate-500">&copy; 2026 MolarSync. Clinical Efficiency for Independent Dental.</p>
      </footer>
    </div>
  );
}

function KanbanColumn({ title, count, children, status }: any) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">{title}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status}`}>{count}</span>
      </div>
      <div className="bg-slate-100/50 p-2 rounded-lg flex-1 border border-slate-200/50 min-h-[400px]">
        {children}
      </div>
    </div>
  );
}

function ClaimCard({ name, code, carrier, time, status, urgency, authorized, amount }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card border border-slate-200 mb-3 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-navy-900 group-hover:text-blue-600 transition-colors">{name}</h4>
        {urgency === 'high' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
      </div>
      <div className="text-xs text-slate-600 mb-3">
        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-navy-900">{code}</span>
        {carrier && <span className="ml-2">• {carrier}</span>}
      </div>
      <div className="flex justify-between items-center">
        {status ? (
          <span className={`text-[10px] font-bold px-2 py-1 rounded ${authorized ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {status}
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">{time}</span>
        )}
        {amount && <span className="text-xs font-bold text-teal-600">{amount}</span>}
      </div>
    </div>
  );
}
