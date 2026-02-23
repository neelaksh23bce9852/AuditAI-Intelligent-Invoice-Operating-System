import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RiskIntelligence = () => {
    // Dummy gauge data
    const gaugeData = [{ value: 72 }, { value: 28 }];
    const COLORS = ['#ef4444', '#1e293b'];

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Risk Score Gauge */}
                <div className="lg:col-span-1 glass-panel p-8 rounded-2xl flex flex-col items-center justify-center relative min-h-[400px]">
                    <h4 className="absolute top-8 text-sm font-bold tracking-widest uppercase text-white">System Threat Level</h4>
                    <div className="w-full h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gaugeData}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill="#ef4444" />
                                    <Cell fill="#1e293b" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                            <span className="text-5xl font-black text-white">72</span>
                            <span className="text-[10px] text-red-500 font-bold tracking-widest">HIGH_RISK</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-xs text-slate-400">Scan intensity indexed at 94%</p>
                    </div>
                </div>

                {/* High Risk Alert Panel */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border-t-4 border-red-500/50">
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white flex items-center gap-3">
                        <span className="animate-pulse">⚠️</span> CRITICAL_ALERTS
                    </h4>
                    <div className="space-y-4">
                        {[
                            { id: 'AL-102', vendor: 'Global Tech', issue: 'Possible Duplicate Payment Attempt', amount: '$4,200.00', confidence: '98%' },
                            { id: 'AL-104', vendor: 'Cyber Port', issue: 'Price Surcharge Pattern Detected', amount: '$1,150.00', confidence: '82%' },
                            { id: 'AL-105', vendor: 'ABC Supplies', issue: 'Unverified Delivery Source', amount: '$850.00', confidence: '75%' },
                        ].map((alert, i) => (
                            <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 border border-red-500/30 rounded">{alert.id}</span>
                                        <span className="text-sm font-bold text-white">{alert.vendor}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{alert.issue}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-white">{alert.amount}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Confidence: {alert.confidence}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Heat Map Style Grid */}
            <div className="glass-panel p-8 rounded-2xl">
                <h4 className="text-sm font-bold tracking-widest uppercase mb-6 text-white">Geospatial Risk Distribution</h4>
                <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
                    {Array.from({ length: 120 }).map((_, i) => {
                        const intensity = Math.random();
                        return (
                            <div
                                key={i}
                                className="aspect-square rounded-sm border border-white/5 transition-colors hover:border-cyan-500"
                                style={{
                                    backgroundColor: intensity > 0.9 ? 'rgba(239, 68, 68, 0.6)' :
                                        intensity > 0.7 ? 'rgba(239, 68, 68, 0.3)' :
                                            intensity > 0.4 ? 'rgba(34, 211, 238, 0.2)' :
                                                'rgba(255, 255, 255, 0.05)'
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-end items-center gap-4 mt-6">
                    <span className="text-[8px] text-slate-500 tracking-widest uppercase">Risk Density:</span>
                    <div className="flex items-center gap-1 text-[8px] text-slate-400">
                        <div className="w-2 h-2 bg-white/5 rounded-sm" /> <span>Low</span>
                        <div className="w-2 h-2 bg-red-500/60 rounded-sm ml-2" /> <span>High</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskIntelligence;
