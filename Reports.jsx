import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const reportMetrics = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 67 },
];

const Reports = () => {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Comparison Graph */}
                <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Efficiency Growth Summary</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={reportMetrics}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {reportMetrics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#22d3ee' : '#1e293b'} stroke={index === 5 ? 'none' : '#334155'} strokeWidth={1} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-[10px] text-slate-500 uppercase text-center tracking-widest italic">Normalized performance metrics based on system throughput</p>
                </div>

                {/* Download Section */}
                <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-bold tracking-widest uppercase mb-2 text-white text-left">Generate Reports</h4>
                        <p className="text-xs text-slate-400 mb-8">Select the format and depth of the generated financial intelligence report.</p>

                        <div className="space-y-4">
                            {[
                                { title: 'Executive Monthly Summary', type: 'PDF', size: '2.4 MB' },
                                { title: 'Detailed Risk Analysis (Q1)', type: 'PDF', size: '14.8 MB' },
                                { title: 'Raw Dataset Export', type: 'CSV', size: '42.1 MB' },
                                { title: 'Vendor Anomaly Mapping', type: 'JSON', size: '1.2 MB' },
                            ].map((report, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-lg group-hover:scale-110 transition-transform">📄</div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase">{report.title}</p>
                                            <p className="text-[10px] text-slate-500">{report.type} • {report.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black text-cyan-500 hover:text-white border border-cyan-500/30 px-4 py-2 rounded-lg transition-all hover:bg-cyan-500/10">DOWNLOAD</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Auto-generate scheduled for 01-MAR</span>
                        <button className="text-[10px] font-bold text-yellow-500 hover:underline">CONFIGURE_SCHEDULER</button>
                    </div>
                </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Variance Score', value: '4.2%', desc: 'Decrease from last month' },
                    { label: 'Auto-Capture Rate', value: '92.4%', desc: 'Successful OCR validations' },
                    { label: 'Audit Velocity', value: '0.8s', desc: 'Average process speed' },
                ].map((m, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl">
                        <p className="text-[10px] text-cyan-400/80 uppercase font-mono tracking-widest">{m.label}</p>
                        <h5 className="text-3xl font-black text-white mt-2 mb-1">{m.value}</h5>
                        <p className="text-[10px] text-slate-500 uppercase">{m.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
