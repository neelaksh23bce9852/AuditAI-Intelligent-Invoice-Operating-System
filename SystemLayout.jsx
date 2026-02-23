import React from 'react';
import Sidebar from './Sidebar';

const SystemLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#05070d] overflow-hidden text-slate-200 font-sans">
            {/* Background Animated Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]" />

                {/* Radar background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
            </div>

            <Sidebar />

            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 glass-panel">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Location</span>
                            <span className="text-sm font-bold tracking-wider text-white">SYSTEM_CORE / {window.location.pathname.replace('/', '').toUpperCase() || 'DASHBOARD'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 font-mono text-[10px]">
                        <div className="flex flex-col items-end">
                            <span className="text-slate-500 uppercase">System Status</span>
                            <span className="text-green-400">● ONLINE</span>
                        </div>
                        <div className="flex flex-col items-end border-l border-white/10 pl-8">
                            <span className="text-slate-500 uppercase">Secure Hash</span>
                            <span className="text-yellow-500">0x882A...7E9</span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default SystemLayout;
