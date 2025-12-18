// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';
// import { useQueryClient } from '@tanstack/react-query';

// const PaymentSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const sessionId = searchParams.get('session_id');
//     const axiosSecure = useAxiosSecure();
//     const [paymentInfo, setPaymentInfo] = useState(null);
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         const verifyPayment = async () => {
//             if (!sessionId) return;
//             try {
//                 const res = await axiosSecure.patch(
//                     `/payment-success?session_id=${sessionId}`
//                 );
//                 setPaymentInfo(res.data);
//                 toast.success('Payment successful!');

//                 if (res.data.issueId) {
//                     queryClient.invalidateQueries({
//                         queryKey: ['issue', res.data.issueId],
//                     });
//                 }
//             } catch (err) {
//                 console.log(err);
//                 toast.error('Payment verification failed');
//                 navigate('/dashboard/my-issues');
//             }
//         };
//         verifyPayment();
//     }, [sessionId, axiosSecure, navigate, queryClient]);

//     if (!paymentInfo) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-md mx-auto p-6 text-center">
//             <h2 className="text-4xl font-bold mb-4">Payment Successful!</h2>
//             <p className="mb-2">
//                 Transaction ID: <strong>{paymentInfo.transactionId}</strong>
//             </p>
//             <p className="mb-4">
//                 Issue Tracking ID: <strong>{paymentInfo.trackingId}</strong>
//             </p>
//             <button
//                 className="btn btn-primary text-black"
//                 onClick={() =>
//                     navigate(`/issue-details/${paymentInfo.issueId}`)
//                 }>
//                 View Issue Details
//             </button>
//         </div>
//     );
// };

// export default PaymentSuccess;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        axiosSecure
            .get(`/payment-success?session_id=${sessionId}`)
            .then((res) => {
                setPaymentInfo(res.data);

                // ✅ auto redirect after 2s
                setTimeout(() => {
                    navigate(`/issue-details/${res.data.issueId}`);
                }, 2000);
            })
            .catch(() => {
                console.error('Payment verification failed');
            });
    }, [sessionId, axiosSecure, navigate]);

    if (!paymentInfo) {
        return <p className="text-center mt-10">Verifying payment...</p>;
    }

    return (
        <div className="text-center mt-10">
            <h2 className="text-4xl text-green-600">✅ Payment Successful</h2>
            <p className="mt-2">Transaction ID: {paymentInfo.transactionId}</p>
            <p className="mt-2">Tracking ID: {paymentInfo.trackingId}</p>
            <p className="mt-2 text-sm text-gray-500">
                Redirecting to issue details...
            </p>
        </div>
    );
};

export default PaymentSuccess;
