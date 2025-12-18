import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const CityScanLoader = ({
    message = 'Scanning city infrastructure...',
    className = '',
}) => {
    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white ${className}`}>
            {/* Outer scanning ring */}
            <motion.div
                className="relative w-20 h-20 rounded-full border border-blue-500/40 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
                {/* Inner pulse ring */}
                <motion.div
                    className="absolute w-24 h-24 rounded-full border-2 border-cyan-400"
                    animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeOut',
                    }}
                />

                {/* Core dot */}
                <motion.div
                    className="w-4 h-4 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                />
            </motion.div>

            {/* Heartbeat wave */}
            <div className="flex gap-1 mt-10">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 bg-cyan-400 rounded-full"
                        animate={{ height: [10, 40, 10] }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Text */}
            <p className="mt-8 text-cyan-300 tracking-widest uppercase text-sm">
                {message}
            </p>
        </div>
    );
};

export default CityScanLoader;
