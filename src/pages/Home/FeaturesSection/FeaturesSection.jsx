import React from 'react';
import { MapPin, Clock, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
    {
        icon: MapPin,
        title: 'Location Based Reporting',
        desc: 'Report issues with exact location for faster resolution.',
    },
    {
        icon: Clock,
        title: 'Real-time Tracking',
        desc: 'Track issue status updates live from dashboard.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure System',
        desc: 'Your data is protected with modern security.',
    },
    {
        icon: Smartphone,
        title: 'Mobile Friendly',
        desc: 'Works perfectly on mobile & tablet devices.',
    },
];

const FeaturesSection = () => (
    <section className="py-20">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-secondary mb-12">
                Features
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="bg-secondary p-6 rounded-xl text-center hover:text-white hover:bg-primary transition">
                        <f.icon className="w-10 h-10 mx-auto text-primary mb-4 hover:text-white" />
                        <h3 className="text-lg font-semibold text-white">
                            {f.title}
                        </h3>
                        <p className="text-slate-300 text-sm mt-2">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturesSection;
