import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../components/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const LatestResolvedIssues = () => {
    const axiosPublic = useAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['latestResolvedIssues'],
        queryFn: async () => {
            const res = await axiosPublic.get(
                '/issues?status=resolved&limit=6'
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <section className="my-24 max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-slate-800">
                    Latest Resolved Issues
                </h2>
                <p className="text-slate-500 mt-2">
                    Recently resolved public issues across the city
                </p>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition">
                        <img
                            src={
                                issue.image ||
                                'https://i.ibb.co/3WfJbYV/no-image.png'
                            }
                            alt={issue.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-5">
                            <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">
                                {issue.title}
                            </h3>

                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                {issue.description}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="badge badge-success">
                                    {issue.status}
                                </span>
                                <span className="text-xs text-slate-500">
                                    📍 {issue.location}
                                </span>
                            </div>

                            <Link
                                to={`/issue-details/${issue._id}`}
                                className="block mt-5 text-center bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-md text-sm font-medium transition">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestResolvedIssues;
