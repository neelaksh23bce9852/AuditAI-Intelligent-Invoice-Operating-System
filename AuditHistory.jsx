import React, { useState } from 'react';

const AuditHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const historyData = [
        { id: 'ADT-9021', date: '2026-02-20', vendor: 'ABC Supplies', amount: '$12,000.00', status: 'DISCREPANCY', risk: 'HIGH' },
        { id: 'ADT-9018', date: '2026-02-18', vendor: 'Global Tech', amount: '$45,200.00', status: 'MATCHED', risk: 'LOW' },
        { id: 'ADT-8995', date: '2026-02-17', vendor: 'Swift Logistics', amount: '$2,400.00', status: 'MATCHED', risk: 'LOW' },
        { id: 'ADT-8972', date: '2026-02-15', vendor: 'Cyber Port', amount: '$1,150.00', status: 'DISCREPANCY', risk: 'MEDIUM' },
        { id: 'ADT-8960', date: '2026-02-14', vendor: 'Apex Industrials', amount: '$8,200.00', status: 'MATCHED', risk: 'LOW' },
        { id: 'ADT-8944', date: '2026-02-12', vendor: 'Global Tech', amount: '$22,000.00', status: 'AUTO_RESOLVED', risk: 'LOW' },
        { id: 'ADT-8921', date: '2026-02-10', vendor: 'ABC Supplies', amount: '$6,000.00', status: 'MATCHED', risk: 'LOW' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-widest">AUDIT_HISTORY</h2>
                    <p className="text-xs text-slate-500 uppercase mt-1">LTM Ledger Access Granted</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="SEARCH_ID_OR_VENDOR..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-xs w-64 focus:border-cyan-500/50 outline-none transition-all"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                    </div>
                    <button className="glass-panel px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all border border-white/20">
                        EXPORT_CSV
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Audit ID</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Timestamp</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Subject</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Valuation</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Result</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">Threat</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-400 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {historyData.map((adt, i) => (
                            <tr key={adt.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-mono text-xs text-cyan-400">{adt.id}</td>
                                <td className="px-6 py-4 text-xs text-slate-500">{adt.date}</td>
                                <td className="px-6 py-4 text-xs font-bold text-white">{adt.vendor}</td>
                                <td className="px-6 py-4 text-xs font-mono text-white">{adt.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${adt.status === 'MATCHED' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                                            adt.status === 'DISCREPANCY' ? 'border-red-500/30 text-red-400 bg-red-500/5' :
                                                'border-blue-500/30 text-blue-400 bg-blue-500/5'
                                        }`}>
                                        {adt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${adt.risk === 'LOW' ? 'bg-green-500' :
                                                adt.risk === 'MEDIUM' ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
                                            }`} />
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">{adt.risk}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[10px] font-black text-cyan-500 hover:text-white transition-colors tracking-tighter uppercase">Query_Logs</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono uppercase tracking-widest px-4">
                <span>Total Entries: 124</span>
                <div className="flex items-center gap-6">
                    <button className="opacity-50 hover:opacity-100">Previous</button>
                    <span className="text-white">Page 1 / 12</span>
                    <button className="hover:opacity-100">Next</button>
                </div>
            </div>
        </div>
    );
};

export default AuditHistory;
