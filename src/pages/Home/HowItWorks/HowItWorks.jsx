import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, LayoutGroup } from 'framer-motion';
import {
    MapPin,
    ShieldCheck,
    Wrench,
    CheckCircle,
    Bell,
    Crown,
} from 'lucide-react';

const steps = [
    {
        icon: MapPin,
        title: 'Report an Issue',
        desc: 'Citizens report problems with photos, description, and exact location.',
    },
    {
        icon: ShieldCheck,
        title: 'Admin Review',
        desc: 'Admins validate reports and assign them to the right department.',
    },
    {
        icon: Wrench,
        title: 'Staff Action',
        desc: 'Assigned staff verify the issue and begin on-ground resolution.',
    },
    {
        icon: CheckCircle,
        title: 'Issue Resolved',
        desc: 'Status updates transparently until the issue is fully closed.',
    },
    {
        icon: Bell,
        title: 'Live Tracking',
        desc: 'Citizens receive notifications and track progress in real time.',
    },
    {
        icon: Crown,
        title: 'Premium Priority',
        desc: 'Premium citizens enjoy faster response and priority handling.',
        premium: true,
    },
];

const HowItWorks = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                        How the System Works
                    </h2>
                </div>

                <LayoutGroup>
                    <div
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        onMouseLeave={() => setHovered(null)}>
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const active = hovered === idx;

                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHovered(idx)}
                                    className="relative rounded-3xl overflow-hidden">
                                    {/* CARD CONTENT */}
                                    <div className="relative rounded-3xl border bg-white p-8 border-slate-200 shadow-md">
                                        {/* FLOWING HOVER BACKGROUND */}
                                        {active && (
                                            <motion.div
                                                layoutId="hover-bg"
                                                className={`absolute inset-0 rounded-3xl
                          ${step.premium ? 'bg-secondary' : 'bg-primary'}`}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 180,
                                                    damping: 26,
                                                }}
                                            />
                                        )}

                                        {/* Step number */}
                                        <div
                                            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs shadow-md z-10
                        ${
                            active
                                ? step.premium
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-teal-700 text-white'
                                : 'text-black'
                        }`}>
                                            {idx + 1}
                                        </div>

                                        {/* Icon */}
                                        <div
                                            className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl z-10 relative transition-all duration-300
                        ${
                            active
                                ? 'bg-white text-secondary'
                                : step.premium
                                ? 'bg-amber-400 text-white'
                                : 'bg-primary text-white'
                        }`}>
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        {/* Text */}
                                        <h3
                                            className={`mb-3 text-xl font-semibold z-10 relative transition-colors duration-300
                        ${active ? 'text-white' : 'text-slate-900'}`}>
                                            {step.title}
                                        </h3>
                                        <p
                                            className={`text-sm leading-relaxed z-10 relative transition-colors duration-300
                        ${active ? 'text-white/80' : 'text-slate-600'}`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
};

export default HowItWorks;
