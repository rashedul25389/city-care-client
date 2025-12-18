// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { isLoading, data: payments = [] } = useQuery({
//         queryKey: ['payments', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments?email=${user.email}`);
//             return res.data;
//         },
//         enabled: !!user?.email,
//     });

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <span className="loading loading-spinner loading-lg"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-5xl mx-auto p-6">
//             <h2 className="text-3xl font-bold mb-4">
//                 Payment History ({payments.length})
//             </h2>
//             {payments.length === 0 ? (
//                 <p>No payments found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table table-zebra w-full">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Issue Name</th>
//                                 <th>Amount</th>
//                                 <th>Paid Time</th>
//                                 <th>Transaction ID</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {payments.map((payment, index) => (
//                                 <tr key={payment._id}>
//                                     <th>{index + 1}</th>
//                                     <td>{payment.issueName}</td>
//                                     <td>${payment.amount}</td>
//                                     <td>
//                                         {new Date(
//                                             payment.paidAt
//                                         ).toLocaleString()}
//                                     </td>
//                                     <td>{payment.transactionId}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaymentHistory;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    return (
        <div>
            <h2 className="text-5xl">Payment History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Issue Name</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Transaction Id</th>
                            <th>Tracking Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.issueName || 'N/A'}</td>
                                <td>৳ {payment.amount}</td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleString()}
                                </td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.trackingId || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default PaymentHistory;
