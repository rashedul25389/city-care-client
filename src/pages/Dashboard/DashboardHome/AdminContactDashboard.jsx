// =========================
// AdminContactDashboard.jsx
// =========================
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminContactDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const [replyText, setReplyText] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const { data: messages = [], refetch } = useQuery({
        queryKey: ['contact-messages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact-messages');
            return res.data;
        },
    });

    const markRead = async (id) => {
        await axiosSecure.patch(`/contact-messages/read/${id}`);
        refetch();
    };

    const sendReply = async () => {
        await axiosSecure.patch(`/contact-messages/reply/${selectedId}`, {
            reply: replyText,
        });
        setReplyText('');
        setSelectedId(null);
        refetch();
    };

    const remove = async (id) => {
        await axiosSecure.delete(`/contact-messages/${id}`);
        refetch();
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`p-4 rounded-xl shadow border ${
                            msg.isRead ? 'bg-base-100' : 'bg-yellow-50'
                        }`}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">{msg.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {msg.email}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {!msg.isRead && (
                                    <button
                                        onClick={() => markRead(msg._id)}
                                        className="btn btn-xs btn-success">
                                        Mark Read
                                    </button>
                                )}
                                <button
                                    onClick={() => remove(msg._id)}
                                    className="btn btn-xs btn-error">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <p className="mt-3">{msg.message}</p>

                        {msg.adminReply && (
                            <p className="mt-2 text-green-600">
                                <strong>Reply:</strong> {msg.adminReply}
                            </p>
                        )}

                        <div className="mt-3">
                            <textarea
                                placeholder="Reply message"
                                className="textarea textarea-bordered w-full"
                                value={selectedId === msg._id ? replyText : ''}
                                onChange={(e) => {
                                    setSelectedId(msg._id);
                                    setReplyText(e.target.value);
                                }}></textarea>
                            <button
                                onClick={sendReply}
                                className="btn btn-primary btn-sm mt-2">
                                Send Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminContactDashboard;
