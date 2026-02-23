import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Main Dot */}
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                }}
            />
            {/* Outer Pulse Ring */}
            <div
                className={`fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${isPointer ? 'scale-150 bg-cyan-500/10' : 'scale-100'
                    }`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                }}
            />
            {/* Soft Glow */}
            <div
                className="fixed top-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none z-[9997]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                }}
            />
        </>
    );
};

export default CustomCursor;
