import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const CompletedIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['issues', user.email, 'resolved'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs/my-issues`);
            return res.data.filter((i) => i.status === 'issue_resolved');
        },
    });

    const calculatePayout = (issue) =>
        issue.senderDistrict === issue.receiverDistrict
            ? issue.cost * 0.8
            : issue.cost * 0.6;

    if (isLoading) return <Loading></Loading>;
    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-4">
                Completed Issues ({issues.length})
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Issue Name</th>
                            <th>Created At</th>
                            <th>District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, i) => (
                            <tr key={issue._id}>
                                <th>{i + 1}</th>
                                <td>{issue.issueName}</td>
                                <td>{issue.createdAt}</td>
                                <td>{issue.senderDistrict}</td>
                                <td>{issue.cost}</td>
                                <td>{calculatePayout(issue)}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm">
                                        Cash Out
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

export default CompletedIssues;
