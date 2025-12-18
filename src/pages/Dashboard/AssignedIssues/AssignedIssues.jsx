// import React from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';

// const AssignedIssues = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     // Fetch assigned issues
//     const { isLoading, data: issues = [] } = useQuery({
//         queryKey: ['assigned-issues', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(
//                 `/issues/staff?staffEmail=${user.email}`
//             );
//             return res.data;
//         },
//         refetchOnWindowFocus: true,
//     });

//     const handleChangeStatus = async (
//         issueId,
//         newStatus,
//         staffId,
//         trackingId
//     ) => {
//         try {
//             await axiosSecure.patch(`/issues/${issueId}/status`, {
//                 issueStatus: newStatus,
//                 staffId,
//                 trackingId,
//             });
//             toast.success('Status updated');
//             queryClient.invalidateQueries(['assigned-issues', user.email]);
//         } catch (err) {
//             console.log(err);
//             toast.error('Failed to update status');
//         }
//     };

//     if (isLoading)
//         return <span className="loading loading-spinner loading-lg"></span>;

//     if (issues.length === 0)
//         return (
//             <p className="text-center text-xl mt-10">No assigned issues yet.</p>
//         );

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">
//                 Assigned Issues ({issues.length})
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Category</th>
//                             <th>Status</th>
//                             <th>Priority</th>
//                             <th>Location</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {issues.map((issue, idx) => (
//                             <tr key={issue._id}>
//                                 <th>{idx + 1}</th>
//                                 <td>{issue.title}</td>
//                                 <td>{issue.category}</td>
//                                 <td>
//                                     <span
//                                         className={`badge ${
//                                             issue.status === 'pending'
//                                                 ? 'badge-warning'
//                                                 : issue.status === 'in-progress'
//                                                 ? 'badge-info'
//                                                 : issue.status === 'working'
//                                                 ? 'badge-primary'
//                                                 : issue.status === 'resolved'
//                                                 ? 'badge-success'
//                                                 : 'badge-error'
//                                         }`}>
//                                         {issue.status}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <span
//                                         className={`badge ${
//                                             issue.priority === 'high'
//                                                 ? 'badge-primary'
//                                                 : 'badge-secondary'
//                                         }`}>
//                                         {issue.priority || 'normal'}
//                                     </span>
//                                 </td>
//                                 <td>{issue.location}</td>
//                                 <td>
//                                     <select
//                                         className="select select-bordered select-sm"
//                                         defaultValue={issue.status}
//                                         onChange={(e) =>
//                                             handleChangeStatus(
//                                                 issue._id,
//                                                 e.target.value,
//                                                 user._id,
//                                                 issue.trackingId
//                                             )
//                                         }>
//                                         <option value="pending">Pending</option>
//                                         <option value="in-progress">
//                                             In-Progress
//                                         </option>
//                                         <option value="working">Working</option>
//                                         <option value="resolved">
//                                             Resolved
//                                         </option>
//                                         <option value="closed">Closed</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AssignedIssues;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';

const AssignedIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: issues = [], refetch, isLoading } = useQuery({
        queryKey: ['issues', user.email, 'staff_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs/my-issues`);
            return res.data.filter((i) => i.status === 'staff_assigned');
        },
    });

    const handleIssueStatusUpdate = (issue, status) => {
        axiosSecure
            .patch(`/issues/${issue._id}/status`, { status })
            .then((res) => {
                if (res.data.success) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Issue updated to ${status}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };
    if (isLoading) return <Loading></Loading>;
    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">
                Assigned Issues ({issues.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Issue Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, i) => (
                            <tr key={issue._id}>
                                <th>{i + 1}</th>
                                <td>{issue.issueName}</td>
                                <td>{issue.status}</td>
                                <td className="flex gap-2">
                                    {issue.status === 'staff_assigned' && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleIssueStatusUpdate(
                                                        issue,
                                                        'staff_arriving'
                                                    )
                                                }
                                                className="btn btn-primary btn-sm">
                                                Accept
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleIssueStatusUpdate(
                                                        issue,
                                                        'pending'
                                                    )
                                                }
                                                className="btn btn-warning btn-sm">
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleIssueStatusUpdate(
                                                issue,
                                                'issue_resolve_started'
                                            )
                                        }
                                        className="btn btn-info btn-sm">
                                        Mark Started
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleIssueStatusUpdate(
                                                issue,
                                                'issue_resolved'
                                            )
                                        }
                                        className="btn btn-success btn-sm">
                                        Mark Resolved
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

export default AssignedIssues;
