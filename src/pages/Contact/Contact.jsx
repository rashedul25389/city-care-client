import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';

const Contact = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const messageData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post('/contact-messages', messageData);
            Swal.fire('Success', 'Message sent successfully', 'success');
            form.reset();
        } catch (err) {
            Swal.fire('Error', 'Failed to send message', 'error', err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loading></Loading>;
    return (
        <div className="min-h-screen bg-base-100">
            {/* Header */}
            <div className="bg-primary text-black py-12">
                <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
                    <Logo />
                    <h1 className="text-4xl font-bold">Contact CityCare</h1>
                    <p className="opacity-80 text-center">
                        Report, Support & Feedback
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

                    <div className="space-y-4 text-lg">
                        <div className="flex gap-3 items-center">
                            <Mail className="text-primary" />
                            support@citycare.com
                        </div>
                        <div className="flex gap-3 items-center">
                            <Phone className="text-primary" />
                            +880 1XXX-XXXXXX
                        </div>
                        <div className="flex gap-3 items-center">
                            <MapPin className="text-primary" />
                            Dhaka, Bangladesh
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="mt-8 rounded overflow-hidden shadow">
                        <iframe
                            title="CityCare Location"
                            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                            className="w-full h-64 border-0"
                            loading="lazy"></iframe>
                    </div>
                </div>

                {/* Form */}
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body">
                        <h3 className="text-2xl font-bold mb-4">
                            Send Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                className="textarea textarea-bordered w-full h-32"
                                required
                            />

                            <button
                                className="btn btn-primary text-black w-full"
                                disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
