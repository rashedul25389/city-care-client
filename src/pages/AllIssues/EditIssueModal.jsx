import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditIssueModal = ({ issue, onClose, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // সমাধান: useEffect ব্যবহার না করে, সরাসরি useState-এ issue prop থেকে ডেটা ইনিশিয়ালাইজ করা হলো।
    // এই Modal-টি যখন রেন্ডার হয়, issue prop-এর ডেটা দিয়েই প্রাথমিক state সেট হবে।
    const [formData, setFormData] = useState({
        title: issue?.title || '',
        description: issue?.description || '',
        category: issue?.category || '',
        location: issue?.location || '',
        image: issue?.image || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // ফর্ম পরিবর্তন হলে শুধু এখান থেকেই formData আপডেট হবে
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.patch(`/issues/${issue._id}`, formData);
            toast.success('Issue updated successfully');

            // React Query Cache Invalidation
            queryClient.invalidateQueries({ queryKey: ['issue', issue._id] });
            queryClient.invalidateQueries({ queryKey: ['issues'] });

            refetch?.(); // যদি prop হিসেবে refetch ফাংশন দেওয়া থাকে
            onClose(); // Modal বন্ধ করা
        } catch (err) {
            console.error('Error updating issue:', err);
            toast.error('Failed to update issue');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Issue</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Title Input */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Description Textarea */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full"
                        required
                    />

                    {/* Category Input */}
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Location Input */}
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Image URL Input */}
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditIssueModal;
