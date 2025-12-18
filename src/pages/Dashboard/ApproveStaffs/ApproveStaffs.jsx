// import React from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';

// const ApproveStaffs = () => {
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const { data: staffs = [], isLoading } = useQuery({
//         queryKey: ['staffs-pending'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/staffs?status=pending');
//             return res.data;
//         },
//     });

//     const handleApprove = async (staffId, email) => {
//         try {
//             await axiosSecure.patch(`/staffs/${staffId}`, {
//                 status: 'approved',
//                 email,
//             });
//             toast.success('Staff approved successfully');
//             queryClient.invalidateQueries(['staffs-pending']);
//         } catch (err) {
//             console.log(err);
//             toast.error('Failed to approve staff');
//         }
//     };

//     if (isLoading)
//         return <span className="loading loading-spinner loading-lg"></span>;

//     if (staffs.length === 0)
//         return (
//             <p className="text-center text-xl mt-10">
//                 No pending staff requests
//             </p>
//         );

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">Approve Staff Accounts</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {staffs.map((staff, idx) => (
//                             <tr key={staff._id}>
//                                 <th>{idx + 1}</th>
//                                 <td>{staff.name}</td>
//                                 <td>{staff.email}</td>
//                                 <td>{staff.phone}</td>
//                                 <td>
//                                     <button
//                                         className="btn btn-primary btn-sm"
//                                         onClick={() =>
//                                             handleApprove(
//                                                 staff._id,
//                                                 staff.email
//                                             )
//                                         }>
//                                         Approve
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ApproveStaffs;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveStaffs = () => {
    const axiosSecure = useAxiosSecure();

    const { data: staffs = [], refetch } = useQuery({
        queryKey: ['staffs', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staffs');
            return res.data;
        },
    });

    const updateStaffStatus = async (staff, status) => {
        try {
            const res = await axiosSecure.patch(`/staffs/${staff._id}/status`, {
                status,
            });
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Staff status updated to ${status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to update status', err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">
                Staffs Pending Approval ({staffs.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map((staff, i) => (
                            <tr key={staff._id}>
                                <th>{i + 1}</th>
                                <td>{staff.name}</td>
                                <td>{staff.email}</td>
                                <td>{staff.department}</td>
                                <td
                                    className={
                                        staff.status === 'approved'
                                            ? 'text-green-600'
                                            : staff.status === 'rejected'
                                            ? 'text-red-600'
                                            : 'text-yellow-600'
                                    }>
                                    {staff.status}
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            updateStaffStatus(staff, 'approved')
                                        }
                                        className="btn btn-success btn-sm">
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateStaffStatus(staff, 'rejected')
                                        }
                                        className="btn btn-error btn-sm">
                                        <IoPersonRemoveSharp />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveStaffs;
