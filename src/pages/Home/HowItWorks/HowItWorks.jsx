import React from 'react';
const steps = [
    'Create an account & login',
    'Report a public issue with details',
    'Authority reviews the issue',
    'Problem gets resolved & updated',
];

export const HowItWorks = () => (
    <section className="pb-20">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-secondary mb-12">
                How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="bg-primary p-6 rounded-xl text-center">
                        <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-secondary text-white font-bold mb-4">
                            {i + 1}
                        </div>
                        <p className="text-slate-200">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
