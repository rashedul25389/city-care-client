import React from 'react';

import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-linear-to-r from-primary to-sky-600 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Report Issues, Improve City
                </h2>
                <p className="text-white mb-6">
                    Your voice matters. Help make your city better.
                </p>
                <button
                    onClick={() => navigate('/issues')}
                    className="btn bg-white text-primary font-bold px-8">
                    Report an Issue
                </button>
            </div>
        </section>
    );
};

export default CallToAction;