// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import { useParams } from 'react-router';
// import useAxios from '../../hooks/useAxios';

// const IssueTrack = () => {
//     const { trackingId } = useParams();
//     const axiosInstance = useAxios();

//     const { data: trackings = [] } = useQuery({
//         queryKey: ['tracking', trackingId],
//         queryFn: async () => {
//             const res = await axiosInstance.get(
//                 `/trackings/${trackingId}/logs`
//             );
//             return res.data;
//         },
//     });

//     return (
//         <div className="p-8">
//             <h2 className="text-4xl">Track your Issue: {trackingId}</h2>
//             <p>Logs so far: {trackings.length}</p>

//             <ul className="timeline timeline-vertical">
//                 {trackings.map((log) => (
//                     <li key={log._id}>
//                         <div className="timeline-start">
//                             {new Date(log.createdAt).toLocaleString()}
//                         </div>
//                         <div className="timeline-middle">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="h-5 w-5">
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                         <div className="timeline-end timeline-box">
//                             <span className="text-xl">{log.details}</span>
//                         </div>
//                         <hr />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default IssueTrack;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/Loading/Loading';

const IssueTrack = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const {
        data: trackings = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/trackings/${trackingId}/logs`
            );
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading)
        return (
            <Loading/>
        );

    if (isError)
        return (
            <p className="text-center mt-4 text-red-500">
                Failed to load tracking logs.
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">
                Tracking Logs for Issue: {trackingId}
            </h2>

            {trackings.length === 0 ? (
                <p className="text-center text-gray-500">
                    No tracking information yet.
                </p>
            ) : (
                <ul className="flex flex-col gap-6">
                    {trackings
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        ) // latest on top
                        .map((log) => (
                            <li
                                key={log._id}
                                className="border-l-2 border-sky-500 pl-4 relative">
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-sky-500 rounded-full"></div>
                                <p className="text-sm text-gray-500">
                                    {new Date(log.createdAt).toLocaleString()}
                                </p>
                                <p className="font-medium text-gray-700">
                                    {log.details}
                                </p>
                                {log.updatedBy && (
                                    <p className="text-xs text-gray-400">
                                        By: {log.updatedBy}
                                    </p>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default IssueTrack;
