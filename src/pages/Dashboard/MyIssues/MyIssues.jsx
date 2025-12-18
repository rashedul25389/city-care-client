import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import IssueCard from '../../AllIssues/IssueCard';
import { useNavigate } from 'react-router-dom';

const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        data: issues = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['my-issues', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">
                My Issues ({issues.length})
            </h2>

            {issues.length === 0 && (
                <p className="text-gray-500">No issues submitted yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {issues.map((issue) => (
                    <IssueCard
                        key={issue._id}
                        issue={issue}
                        refetch={refetch}
                        onViewDetails={() =>
                            navigate(`/issue-details/${issue._id}`)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default MyIssues;
