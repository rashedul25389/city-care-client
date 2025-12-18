import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const IssueCard = ({ issue, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [localUpvotes, setLocalUpvotes] = useState(issue.upvotes || 0);
    const [hasUpvoted, setHasUpvoted] = useState(
        issue.upvotedBy?.includes(user?.email)
    );

    const isOwner = issue.reportedBy === user?.email;

    const handleUpvote = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (isOwner) return;

        try {
            const res = await axiosSecure.patch(`/issues/${issue._id}/upvote`);
            if (res.data.success) {
                setLocalUpvotes(res.data.issue.upvotes);
                setHasUpvoted(res.data.issue.upvotedBy.includes(user.email));
                refetch(); // optional, to refresh list
            }
        } catch (err) {
            console.error('Upvote failed:', err);
        }
    };

    return (
        <div className="card bg-white shadow-md rounded-lg border overflow-hidden">
            <img
                src={issue.image || 'https://via.placeholder.com/400'}
                alt={issue.title}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-700">
                    {issue.title}
                </h3>
                <div className="flex gap-2 flex-wrap mt-2">
                    <span className="badge badge-info">{issue.category}</span>
                    <span
                        className={`badge ${
                            issue.priority === 'high'
                                ? 'badge-error'
                                : 'badge-success'
                        }`}>
                        {issue.priority}
                    </span>
                    <span className="badge badge-outline">{issue.status}</span>
                </div>
                <p className="text-sm mt-2">📍 {issue.location}</p>
                <div className="flex justify-between mt-4">
                    <button
                        disabled={isOwner}
                        onClick={handleUpvote}
                        className={`btn btn-sm ${
                            hasUpvoted ? 'btn-primary' : 'btn-outline'
                        }`}>
                        <FaThumbsUp /> {localUpvotes}
                    </button>
                    <Link
                        to={`/issue-details/${issue._id}`}
                        className="btn btn-sm btn-secondary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IssueCard;
