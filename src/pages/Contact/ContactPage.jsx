// =========================
// ContactPage.jsx (Public Contact Page)
// =========================
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo-1.png';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/contact-messages', form);
            setSuccess('Message sent successfully!');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-Linear-to-br from-primary to-secondary">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="flex items-center gap-3 mb-6">
                    <img src={logo} alt="CityCare" className="w-10" />
                    <h2 className="text-2xl font-bold text-primary">Contact CityCare</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Your Message"
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    <button className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    {success && <p className="text-green-600 text-center">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactPage;


