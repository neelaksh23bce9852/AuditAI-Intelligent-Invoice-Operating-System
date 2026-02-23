import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

const dataPie = [
    { name: 'High Risk', value: 18 },
    { name: 'Moderate Risk', value: 34 },
    { name: 'Low Risk', value: 48 },
];

const dataLine = [
    { name: 'Mon', audits: 12 },
    { name: 'Tue', audits: 19 },
    { name: 'Wed', audits: 15 },
    { name: 'Thu', audits: 22 },
    { name: 'Fri', audits: 30 },
    { name: 'Sat', audits: 10 },
    { name: 'Sun', audits: 8 },
];

const COLORS = ['#ef4444', '#facc15', '#22d3ee'];

const MainDashboard = () => {
    return (
        <div className="space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Audits', value: '1,248', trend: '+12%', color: 'border-blue-500' },
                    { label: 'High Risk Cases', value: '92', trend: '+8%', color: 'border-red-500' },
                    { label: 'Leakage Prevented', value: '₹4.3M', trend: '+15%', color: 'border-green-500' },
                    { label: 'Avg Time Reduced', value: '78%', trend: '+22%', color: 'border-cyan-500' },
                ].map((stat, i) => (
                    <div key={i} className={`glass-panel p-6 rounded-2xl border-l-4 ${stat.color} hover:translate-y-[-4px] transition-transform`}>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">{stat.label}</p>
                        <div className="flex items-baseline justify-between mt-2">
                            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                            <span className="text-[10px] text-green-400 font-bold">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Risk Distribution Chart */}
                <div className="lg:col-span-1 glass-panel p-8 rounded-2xl flex flex-col items-center">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white text-center w-full">Risk Distribution</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataPie}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dataPie.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-4 mt-4">
                        {dataPie.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-[10px] text-slate-400 uppercase">{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Trends Chart */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Daily Audit Throughput</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataLine} margin={{ bottom: 20, left: 10 }}>
                                <defs>
                                    <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Operational Week", position: "insideBottom", offset: -10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Audit Count", angle: -90, position: "insideLeft", offset: 10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    formatter={(value) => `${value ?? 0} Audits`}
                                    contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
                                <Area name="System Throughput" type="monotone" dataKey="audits" stroke="#22d3ee" fillOpacity={1} fill="url(#colorAudits)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Live Activity Feed */}
            <div className="glass-panel p-8 rounded-2xl">
                <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Live System Activity</h4>
                <div className="space-y-4">
                    {[
                        { time: '14:20:05', msg: 'Audit complete for Vendor: ABC Supplies - DISCREPANCY DETECTED ($200.00)', type: 'error' },
                        { time: '14:18:22', msg: 'New purchase order ingested: PO-9921', type: 'info' },
                        { time: '14:15:10', msg: 'Risk intelligence scan complete - Vendor score updated: XYZ Corp', type: 'warning' },
                        { time: '14:12:45', msg: 'Three-way match successful: INV-4412', type: 'success' },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs border-b border-white/5 pb-3">
                            <span className="font-mono text-cyan-400/60">{log.time}</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${log.type === 'error' ? 'bg-red-500' : log.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                            <span className="text-slate-300 flex-1">{log.msg}</span>
                            <button className="text-[10px] text-cyan-500 hover:underline">VIEW_LTM</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
