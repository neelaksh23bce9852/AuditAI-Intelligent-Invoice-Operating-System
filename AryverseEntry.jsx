import React from 'react';
import { useNavigate } from 'react-router-dom';

const AryverseEntry = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#05070d] flex items-center justify-center font-sans tracking-tight">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-slate-950 to-[#000814]" />

            {/* Radar Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="absolute w-[400px] h-[400px] border border-cyan-500/20 rounded-full animate-radar" />
                <div className="absolute w-[800px] h-[800px] border border-cyan-500/10 rounded-full animate-radar" style={{ animationDelay: '2s' }} />

                {/* Radar Sweep Line */}
                <div className="absolute w-[1000px] h-[1000px] border border-cyan-500/5 rounded-full overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-[500px] h-1 bg-gradient-to-r from-transparent to-cyan-500/50 origin-left animate-radar-sweep" />
                </div>
            </div>

            {/* Volumetric Glow */}
            <div className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* HUD Elements */}
            {/* Top Left */}
            <div className="absolute top-8 left-8 flex flex-col gap-1 font-mono text-[10px] text-yellow-500/60 uppercase tracking-[0.2em]">
                <div>SYS.READY</div>
                <div>AUDIT.PROTOCOL</div>
            </div>

            {/* Top Right */}
            <div className="absolute top-8 right-8 flex flex-col gap-1 items-end font-mono text-[10px] text-yellow-500/60 uppercase tracking-[0.2em]">
                <div>CPU: OPTIMAL</div>
                <div>MEM: STABLE</div>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-8 left-8 font-mono text-[10px] text-yellow-500/60 uppercase tracking-[0.2em]">
                COORDS: [FINANCE, CORE]
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-yellow-500/60 uppercase tracking-[0.2em]">
                TARGET: DISCREPANCY
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative group">
                    <h1 className="text-7xl md:text-9xl font-black text-white tracking-[0.2em] animate-title-glow">
                        AUDITAI
                    </h1>
                    {/* Glowing Underline */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-cyan-500 blur-[2px] rounded-full opacity-50 group-hover:w-full transition-all duration-700" />
                </div>

                <p className="mt-12 text-slate-400 text-sm md:text-base font-light tracking-[0.5em] uppercase opacity-80">
                    Intelligent Invoice Operating System
                </p>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-20 group relative px-12 py-4 bg-gold-gradient rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/30"
                >
                    <span className="relative z-10 text-black font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
                        Enter The System
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
            </div>

            {/* Edge Fog */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
};

export default AryverseEntry;
