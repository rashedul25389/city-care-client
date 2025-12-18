import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const CreateIssue = () => {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: { supportType: 'free' },
    });
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const supportType = useWatch({ control, name: 'supportType' });
    const isPaid = supportType === 'paid';

    // Wait until Firebase auth is ready
    useEffect(() => {
        if (!loading && !user) {
            // optionally redirect or notify if needed
        }
    }, [loading, user]);

    const onSubmit = async (data) => {
        if (!user) {
            await Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'Please login to report an issue.',
            });
            navigate('/login', { state: { from: '/create-issue' } });
            return;
        }

        let imageURL = data.imageUrl || '';

        // handle uploaded image
        if (data.imageFile && data.imageFile[0]) {
            const formData = new FormData();
            formData.append('image', data.imageFile[0]);
            try {
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_image_host_key
                    }`,
                    formData
                );
                imageURL = imgRes.data.data.url;
            } catch (err) {
                console.error(err);
                await Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'Please try again.',
                });
                return;
            }
        }

        const issueData = {
            title: data.title,
            category: data.category,
            location: data.location,
            image: imageURL,
            description: data.description,
            supportType: data.supportType,
            paymentAmount: isPaid ? 200 : 0,
            priority: isPaid ? 'high' : 'normal',
            reporterRole: isPaid ? 'premium' : 'citizen',
            status: 'reported',
            upvotes: 0,
            reportedBy: user.email,
            reporterName: user.displayName,
            createdAt: new Date(),
        };

        if (isPaid) {
            const confirm = await Swal.fire({
                title: 'Premium Priority Support',
                text: 'Pay 200 taka to get high priority support?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Pay & Submit',
                cancelButtonText: 'Cancel',
            });
            if (!confirm.isConfirmed) return;
        }

        try {
            const res = await axiosSecure.post('/issues', issueData);

            console.log('ISSUE RESPONSE:', res.data);

            if (res.data.insertedId) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Issue Reported Successfully',
                    confirmButtonText: 'Go to My Issues',
                });

                reset(); // 🔥 now works
                navigate('/dashboard/my-issues'); // 🔥 now works
            }
        } catch (err) {
            console.error('ISSUE ERROR:', err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err?.response?.data?.message || 'Server error',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
            <h2 className="text-4xl font-bold mb-6 text-center text-sky-600">
                Report a Public Issue
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="label font-medium text-slate-700">
                        Issue Title
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        className="input w-full border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
                        placeholder="e.g. Broken streetlight near school"
                        required
                    />
                </div>

                <div>
                    <label className="label font-medium text-slate-700">
                        Category
                    </label>
                    <select
                        {...register('category')}
                        className="select w-full border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200">
                        <option value="road">Road</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="waste">Garbage</option>
                        <option value="footpath">Footpath</option>
                    </select>
                </div>

                <div>
                    <label className="label font-medium text-slate-700">
                        Support Type
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="free"
                                {...register('supportType')}
                                className="radio radio-primary"
                                defaultChecked
                            />
                            Free Support
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="paid"
                                {...register('supportType')}
                                className="radio radio-warning"
                            />
                            Premium Priority (৳200)
                        </label>
                    </div>
                    {isPaid && (
                        <p className="text-sm text-warning mt-2">
                            Premium issues get higher priority & faster
                            resolution
                        </p>
                    )}
                </div>

                <div>
                    <label className="label font-medium text-slate-700">
                        Location
                    </label>
                    <input
                        type="text"
                        {...register('location', { required: true })}
                        className="input w-full border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
                        placeholder="Area, road name, landmark"
                        required
                    />
                </div>

                <div>
                    <label className="label font-medium text-slate-700">
                        Upload Issue Photo
                    </label>
                    <input
                        type="file"
                        {...register('imageFile')}
                        className="file-input w-full border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Or enter image URL below (optional)
                    </p>
                    <input
                        type="text"
                        {...register('imageUrl')}
                        className="input w-full mt-1 border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
                        placeholder="https://image-url.com"
                    />
                </div>

                <div>
                    <label className="label font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        className="textarea w-full border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200"
                        placeholder="Describe the issue in detail"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Submit Issue
                </button>
            </form>
        </div>
    );
};

export default CreateIssue;
