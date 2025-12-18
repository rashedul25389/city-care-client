// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../components/Loading/Loading';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// // import { toast } from 'react-hot-toast';

// const IssueDetails = () => {
//     const { id } = useParams();
//     const axiosSecure = useAxiosSecure();

//     const {
//         isLoading,
//         data: issue,
//         refetch,
//         isError,
//     } = useQuery({
//         queryKey: ['issue', id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/issues/${id}`);
//             return res.data;
//         },
//         refetchOnWindowFocus: false,
//     });

//     useEffect(() => {
//         const interval = setInterval(refetch, 15000);
//         return () => clearInterval(interval);
//     }, [refetch]);

//     const handleBoost = async (user) => {
//         if (!issue || issue.priority === 'high') return;

//         try {
//             const paymentInfo = {
//                 cost: 100,
//                 issueId: issue._id,
//                 senderEmail: issue.reportedBy || user.email, // fallback
//                 issueName: issue.title,
//             };

//             console.log('Sending payment request', paymentInfo); // debug

//             const res = await axiosSecure.post(
//                 '/create-checkout-session',
//                 paymentInfo
//             );

//             console.log('Response:', res.data); // debug

//             if (res.data.url) {
//                 window.location.href = res.data.url;
//             } else {
//                 console.error('No URL in response');
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     if (isLoading) return <Loading />;
//     if (isError || !issue)
//         return <p className="text-red-500 text-center mt-4">Issue not found</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
//             {issue.image && (
//                 <img
//                     src={issue.image}
//                     alt={issue.title}
//                     className="w-full rounded mb-4"
//                 />
//             )}
//             <h2 className="text-3xl font-bold text-sky-600">{issue.title}</h2>
//             <p className="text-slate-700 my-2">{issue.description}</p>

//             <div className="flex flex-wrap items-center gap-4 my-2">
//                 <p>👍 Upvotes: {issue.upvotes || 0}</p>
//                 <p>
//                     Status:{' '}
//                     <span className="badge badge-info">{issue.status}</span>
//                 </p>
//                 <p>
//                     Priority:{' '}
//                     <span
//                         className={`badge ${
//                             issue.priority === 'high'
//                                 ? 'badge-primary'
//                                 : 'badge-secondary'
//                         }`}>
//                         {issue.priority || 'normal'}
//                     </span>
//                 </p>
//                 {issue.staffName && <p>Assigned Staff: {issue.staffName}</p>}
//             </div>

//             <button
//                 onClick={handleBoost}
//                 className="btn btn-warning mt-4"
//                 disabled={issue.priority === 'high'}>
//                 {issue.priority === 'high'
//                     ? 'Already Boosted'
//                     : 'Boost Priority (100TK)'}
//             </button>

//             {/* Timeline */}
//             <div className="mt-8">
//                 <h3 className="text-2xl font-semibold mb-2">Issue Timeline</h3>
//                 {!issue.tracking || issue.tracking.length === 0 ? (
//                     <p>No tracking info yet.</p>
//                 ) : (
//                     <ul className="steps steps-vertical">
//                         {issue.tracking
//                             .sort(
//                                 (a, b) =>
//                                     new Date(b.createdAt) -
//                                     new Date(a.createdAt)
//                             )
//                             .map((track, index) => (
//                                 <li key={index} className="step step-primary">
//                                     <div>
//                                         <strong>
//                                             {track.details.replace(/_/g, ' ')}
//                                         </strong>
//                                         <p className="text-sm">
//                                             By: {track.updatedBy || 'System'} |{' '}
//                                             {new Date(
//                                                 track.createdAt
//                                             ).toLocaleString()}
//                                         </p>
//                                     </div>
//                                 </li>
//                             ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default IssueDetails;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import EditIssueModal from './EditIssueModal';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const IssueDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);

    const {
        isLoading,
        data: issue,
        refetch,
        isError,
    } = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    // Delete issue
    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will delete this issue permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/issues/${id}`);
                toast.success('Issue deleted');
                queryClient.invalidateQueries(['issues']);
                navigate('/all-issues');
            } catch (err) {
                toast.error('Failed to delete issue', err);
            }
        }
    };

    // Boost priority
    const handleBoost = async () => {
        if (!issue || issue.priority === 'high') return;

        try {
            const sessionRes = await axiosSecure.post(
                '/create-checkout-session',
                {
                    cost: 100,
                    issueId: issue._id,
                    senderEmail: issue.reportedBy,
                    issueName: issue.title,
                }
            );

            if (sessionRes.data.url) {
                window.location.href = sessionRes.data.url;
            }
        } catch (err) {
            console.log(err);
            toast.error('Boost payment failed');
        }
    };

    if (isLoading) return <Loading />;
    if (isError || !issue)
        return <p className="text-red-500 text-center mt-4">Issue not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
            {/* Issue Info */}
            {issue.image && (
                <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full rounded mb-4"
                />
            )}

            <h2 className="text-3xl font-bold text-sky-600">{issue.title}</h2>
            <p className="text-slate-700 my-2">{issue.description}</p>

            <div className="flex flex-wrap items-center gap-4 my-2">
                <span
                    className={`badge ${
                        issue.priority === 'high'
                            ? 'badge-primary'
                            : 'badge-secondary'
                    }`}>
                    {issue.priority || 'normal'}
                </span>
                <span className="badge badge-info">{issue.status}</span>
                {issue.staffName && (
                    <span>Assigned Staff: {issue.staffName}</span>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                {issue.reportedBy === issue?.reportedBy &&
                    issue.status === 'pending' && (
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowEditModal(true)}>
                            Edit
                        </button>
                    )}

                {issue.reportedBy === issue?.reportedBy && (
                    <button className="btn btn-error" onClick={handleDelete}>
                        Delete
                    </button>
                )}

                <button
                    className="btn btn-warning"
                    onClick={handleBoost}
                    disabled={issue.priority === 'high'}>
                    {issue.priority === 'high'
                        ? 'Already Boosted'
                        : 'Boost Priority (100TK)'}
                </button>
            </div>

            {/* Timeline */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-2">Issue Timeline</h3>
                {!issue.tracking || issue.tracking.length === 0 ? (
                    <p>No tracking info yet.</p>
                ) : (
                    <ul className="steps steps-vertical">
                        {issue.tracking
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                            )
                            .map((track, index) => (
                                <li key={index} className="step step-primary">
                                    <div>
                                        <strong>
                                            {track.status.replace(/_/g, ' ')}
                                        </strong>
                                        <p className="text-sm">
                                            {track.message} | By:{' '}
                                            {track.updatedBy || 'System'} |{' '}
                                            {new Date(
                                                track.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <EditIssueModal
                    issue={issue}
                    onClose={() => setShowEditModal(false)}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default IssueDetails;
