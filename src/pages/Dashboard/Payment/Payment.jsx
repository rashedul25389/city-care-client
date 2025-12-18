// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import { useParams } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';

// const Payment = () => {
//     const { issueId } = useParams();
//     const axiosSecure = useAxiosSecure();
//     // const navigate = useNavigate();

//     const { isLoading, data: issue } = useQuery({
//         queryKey: ['issues', issueId],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/issues/${issueId}`);
//             return res.data;
//         },
//     });

//     const handlePayment = async () => {
//         try {
//             const paymentInfo = {
//                 cost: issue.cost,
//                 issueId: issue._id,
//                 senderEmail: issue.reportedBy,
//                 issueName: issue.title,
//             };

//             const res = await axiosSecure.post(
//                 '/create-checkout-session',
//                 paymentInfo
//             );

//             if (res.data.url) {
//                 window.location.href = res.data.url;
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error('Failed to initiate payment');
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <span className="loading loading-infinity loading-xl"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-md mx-auto p-6 text-center">
//             <h2 className="text-2xl mb-4">
//                 Please Pay ${issue.cost} for: <strong>{issue.title}</strong>
//             </h2>
//             <button
//                 onClick={handlePayment}
//                 className="btn btn-primary text-black">
//                 Pay Now
//             </button>
//         </div>
//     );
// };

// export default Payment;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const { issueId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: issue } = useQuery({
        queryKey: ['issues', issueId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${issueId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        const paymentInfo = {
            cost: issue.cost,
            issueId: issue._id,
            senderEmail: issue.senderEmail,
            issueName: issue.issueName,
        };

        const res = await axiosSecure.post(
            '/create-checkout-session',
            paymentInfo
        );

        console.log(res.data);

        window.location.href = res.data.url;
    };

    if (isLoading) {
        return (
            <div>
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        );
    }

    return (
        <div>
            <h2>
                Please Pay ${issue.cost} for : {issue.issueName}{' '}
            </h2>
            <button
                onClick={handlePayment}
                className="btn btn-primary text-black">
                Pay
            </button>
        </div>
    );
};

export default Payment;
