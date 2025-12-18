import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Staff = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const departments = ['Road', 'Garbage', 'Light', 'Water', 'Others'];

    const handleStaffApplication = async (data) => {
        try {
            const res = await axiosSecure.post('/staffs', data);
            if (res.data.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your application has been submitted. Admin will review it.',
                    showConfirmButton: false,
                    timer: 2000,
                });
                reset();
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to submit application', err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-4xl font-bold mb-6">Be a Resolver</h2>
            <form
                onSubmit={handleSubmit(handleStaffApplication)}
                className="space-y-4">
                <input
                    type="text"
                    {...register('name')}
                    defaultValue={user?.displayName}
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                />
                <input
                    type="email"
                    {...register('email')}
                    defaultValue={user?.email}
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    {...register('staffId')}
                    placeholder="Staff ID Number"
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    {...register('nid')}
                    placeholder="NID"
                    className="input input-bordered w-full"
                />
                <select
                    {...register('department')}
                    className="select select-bordered w-full">
                    <option value="">Select Department</option>
                    {departments.map((d, i) => (
                        <option key={i} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    {...register('address')}
                    placeholder="Address"
                    className="input input-bordered w-full"
                />
                <input
                    type="submit"
                    className="btn btn-primary w-full mt-2"
                    value="Apply as Resolver"
                />
            </form>
        </div>
    );
};

export default Staff;
