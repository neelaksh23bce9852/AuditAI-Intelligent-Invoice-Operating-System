import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';

const trendData = [
    { month: 'Jan', amount: 4000, risk: 240 },
    { month: 'Feb', amount: 3000, risk: 139 },
    { month: 'Mar', amount: 2000, risk: 980 },
    { month: 'Apr', amount: 2780, risk: 390 },
    { month: 'May', amount: 1890, risk: 480 },
    { month: 'Jun', monthShort: 'Jun', amount: 2390, risk: 380 },
    { month: 'Jul', amount: 3490, risk: 430 },
];

const vendorData = [
    { name: 'ABC Supplies', score: 85 },
    { name: 'Global Tech', score: 42 },
    { name: 'Swift Logistics', score: 92 },
    { name: 'Apex Industrials', score: 65 },
    { name: 'Cyber Port', score: 28 },
];

const classificationData = [
    { name: 'Price Variance', value: 35 },
    { name: 'Quantity Mismatch', value: 45 },
    { name: 'Missing Docs', value: 15 },
    { name: 'Duplicate Entry', value: 5 },
];

const COLORS = ['#22d3ee', '#818cf8', '#facc15', '#f87171'];

const AnalyticsCore = () => {
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Monthly Audit Trend */}
                <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Monthly Audit Trend</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ bottom: 20, left: 10 }}>
                                <XAxis
                                    dataKey="month"
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Reporting Period", position: "insideBottom", offset: -10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Audit Volume (₹)", angle: -90, position: "insideLeft", offset: 10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    formatter={(value) => `₹ ${value ?? 0}`}
                                    contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
                                <Line name="Audit Amount" type="monotone" dataKey="amount" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee', strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Amount Discrepancy Trend */}
                <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Anomaly Detection (Volume)</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ bottom: 20, left: 10 }}>
                                <XAxis
                                    dataKey="month"
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Temporal Scale", position: "insideBottom", offset: -10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Risk Incidents", angle: -90, position: "insideLeft", offset: 10, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    formatter={(value) => `${value ?? 0} Flags`}
                                    contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
                                <Area name="Detected Anomalies" type="monotone" dataKey="risk" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Vendor Risk Breakdown */}
                <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Vendor Reliability Index</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={vendorData} layout="vertical" margin={{ left: -20, bottom: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="#94a3b8"
                                    fontSize={10}
                                    width={100}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: "Vendor Entity", angle: -90, position: "insideLeft", offset: -40, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
                                <Bar dataKey="score" name="Reliability Score" radius={[0, 4, 4, 0]}>
                                    {vendorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={(entry.score ?? 0) > 70 ? '#22d3ee' : (entry.score ?? 0) > 40 ? '#facc15' : '#ef4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Classification Pie */}
                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white text-center w-full">Mismatch Classification</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={classificationData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {classificationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(5, 7, 13, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                        {classificationData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-[10px] text-slate-400 uppercase">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCore;
