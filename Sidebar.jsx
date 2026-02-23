import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Audit Engine', path: '/engine', icon: '⚙️' },
        { name: 'Analytics Core', path: '/analytics', icon: '📈' },
        { name: 'Risk Intelligence', path: '/risk', icon: '🛡️' },
        { name: 'Audit History', path: '/history', icon: '📜' },
        { name: 'Reports', path: '/reports', icon: '📄' },
        { name: 'Settings', path: '/settings', icon: '🛠️' },
    ];

    return (
        <aside className="w-64 h-full glass-panel border-r border-white/10 flex flex-col z-20">
            <div className="p-8 border-b border-white/10">
                <h2 className="text-xl font-black tracking-[0.2em] text-white">AUDITAI</h2>
                <p className="text-[8px] text-cyan-400 tracking-[0.3em] uppercase mt-1">System Operator</p>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-white neon-glow-cyan'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-sm font-medium tracking-wide">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-gold-gradient" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">ADMIN_SECURE</p>
                        <p className="text-[10px] text-slate-500 truncate">LVL 4 CLEARANCE</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
