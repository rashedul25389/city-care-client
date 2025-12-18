// import React, { useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import IssueFilterBar from './IssueFilterBar';
// import { toast } from 'react-hot-toast';
// import IssueCard from './IssueCard';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import useAuth from '../../hooks/useAuth';

// const AllIssues = () => {
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const { user } = useAuth();
//     const queryClient = useQueryClient();

//     const [filters, setFilters] = useState({
//         search: '',
//         category: '',
//         priority: '',
//         status: '',
//     });

//     const { data: issues = [], isLoading } = useQuery({
//         queryKey: ['issues', filters],
//         queryFn: async () => {
//             const params = new URLSearchParams(filters).toString();
//             const res = await axiosSecure.get(`/issues?${params}`);
//             return res.data;
//         },
//         keepPreviousData: true,
//     });

//     const handleUpvote = async (issueId, reportedBy) => {
//         if (!user) {
//             navigate('/login');
//             toast.error('Please login to upvote');
//             return;
//         }

//         if (user.email === reportedBy) {
//             toast.error('Cannot upvote your own issue');
//             return;
//         }

//         try {
//             const res = await axiosSecure.patch(`/issues/${issueId}/upvote`);
//             if (res.data.success) {
//                 queryClient.invalidateQueries(['issues', filters]);
//                 toast.success(
//                     res.data.action === 'upvoted'
//                         ? 'Upvoted successfully'
//                         : 'Removed your upvote'
//                 );
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error('Failed to upvote');
//         }
//     };

//     if (isLoading) return <p>Loading issues...</p>;

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-4">
//                 All Issues ({issues.length})
//             </h2>

//             <IssueFilterBar filters={filters} setFilters={setFilters} />

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//                 {issues.map((issue) => (
//                     <IssueCard
//                         key={issue._id}
//                         issue={issue}
//                         onUpvote={() =>
//                             handleUpvote(issue._id, issue.reportedBy)
//                         }
//                         onViewDetails={() => navigate(`/issue/${issue._id}`)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllIssues;

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import IssueFilterBar from './IssueFilterBar';
import IssueCard from './IssueCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState({
        search: '',
        category: '',
        priority: '',
        status: '',
    });

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['issues', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const res = await axiosSecure.get(`/issues?${params}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const handleUpvote = async (issueId, reportedBy) => {
        if (!user) {
            navigate('/login');
            toast.error('Please login to upvote');
            return;
        }
        if (user.email === reportedBy) {
            toast.error('Cannot upvote your own issue');
            return;
        }
        try {
            const res = await axiosSecure.patch(`/issues/${issueId}/upvote`);
            queryClient.invalidateQueries(['issues', filters]);
            toast.success(
                res.data.action === 'upvote'
                    ? 'Upvoted successfully'
                    : 'Removed your upvote'
            );
        } catch (err) {
            console.log(err);
            toast.error('Failed to upvote');
        }
    };

    if (isLoading) return <Loading />;

    // Sort boosted issues on top
    const sortedIssues = [...issues].sort((a, b) => {
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (a.priority !== 'high' && b.priority === 'high') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
                All Issues ({issues.length})
            </h2>

            <IssueFilterBar filters={filters} setFilters={setFilters} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {sortedIssues.map((issue) => (
                    <IssueCard
                        key={issue._id}
                        issue={issue}
                        onUpvote={() =>
                            handleUpvote(issue._id, issue.reportedBy)
                        }
                        onViewDetails={() =>
                            navigate(`/issue-details/${issue._id}`)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default AllIssues;
