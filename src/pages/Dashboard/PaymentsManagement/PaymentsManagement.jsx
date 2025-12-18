import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all payments
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments'); // admin will get all payments
            return res.data;
        },
    });

    // Cashout mutation
    const cashoutMutation = useMutation({
        mutationFn: async (paymentId) => {
            const res = await axiosSecure.post(
                `/payments/cashout/${paymentId}`
            );
            return res.data;
        },
        onSuccess: () => {
            toast.success('Cashout successful');
            queryClient.invalidateQueries(['allPayments']);
        },
        onError: (err) => {
            toast.error('Cashout failed');
            console.error(err);
        },
    });

    if (isLoading) return <p>Loading payments...</p>;

    return (
        <div>
            <h2 className="text-4xl mb-4">All Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Issue Name</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Transaction Id</th>
                            <th>Tracking Id</th>
                            <th>Customer Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.issueName || 'N/A'}</td>
                                <td>৳💵 {payment.amount}</td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleString()}
                                </td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.trackingId || 'N/A'}</td>
                                <td>{payment.customerEmail}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() =>
                                            cashoutMutation.mutate(payment._id)
                                        }
                                        disabled={payment.cashoutDone}>
                                        {payment.cashoutDone
                                            ? 'Cashed Out'
                                            : 'Cashout'}
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

export default PaymentManagement;
