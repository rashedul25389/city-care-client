import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {
    // Dynamic links
    const links = [
        { name: 'Home', path: '/' },
        { name: 'All Issues', path: '/issues' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8">
                {/* Logo + description */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Logo></Logo>
                    </div>
                    <p className="text-slate-400">
                        A public infrastructure issue reporting system that
                        improves transparency and response time.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold text-white mb-3">
                        Quick Links
                    </h4>
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="hover:text-sky-400 transition-colors duration-200">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold text-white mb-3">Contact</h4>
                    <p>
                        Email:{' '}
                        <a
                            href="mailto:support@citycare.com"
                            className="hover:text-sky-400">
                            support@citycare.com
                        </a>
                    </p>
                    <p>
                        Phone:{' '}
                        <a
                            href="tel:+8801234567890"
                            className="hover:text-sky-400">
                            +880 1234-567890
                        </a>
                    </p>
                </div>
            </div>

            <div className="text-center py-4 border-t border-slate-700 text-slate-500 text-sm">
                © {new Date().getFullYear()} CityCare. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
