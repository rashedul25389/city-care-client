import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SupportMessages = () => {
    const axiosSecure = useAxiosSecure();

    const { data: messages = [] } = useQuery({
        queryKey: ['contact-messages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact-messages');
            return res.data;
        },
    });

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">
                Support Messages ({messages.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((m, i) => (
                            <tr key={m._id}>
                                <td>{i + 1}</td>
                                <td>{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.message}</td>
                                <td>
                                    {new Date(m.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportMessages;
