import React from 'react';

const Settings = () => {
    return (
        <div className="space-y-10 max-w-4xl">
            <div>
                <h2 className="text-3xl font-black text-white tracking-widest uppercase">System Controls</h2>
                <p className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase mt-1">Kernel Configuration / Preferences</p>
            </div>

            <div className="space-y-6">
                {[
                    { title: 'Processing Intelligence', desc: 'AI confidence threshold for auto-matching', value: '0.85', unit: 'σ' },
                    { title: 'Encryption Protocol', desc: 'Data-at-rest security algorithm', value: 'AES-256-GCM', unit: 'STD' },
                    { title: 'UI Refresh Rate', desc: 'Real-time telemetry update frequency', value: '60ms', unit: 'CLK' },
                ].map((s, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-2 border-transparent hover:border-cyan-500 transition-all">
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white uppercase">{s.title}</h4>
                            <p className="text-xs text-slate-500">{s.desc}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xl font-mono text-cyan-400">{s.value}</span>
                            <span className="ml-2 text-[10px] text-slate-600 font-mono">{s.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-red-500/10">
                <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">Danger Zone</h4>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-300 font-bold">Purge System Datasets</p>
                        <p className="text-[10px] text-slate-500 mt-1">Irreversibly delete all ingested POs and Invoices.</p>
                    </div>
                    <button className="px-6 py-2 border border-red-500/30 text-[10px] font-black text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">TERMINATE_ALL</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
