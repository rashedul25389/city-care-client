// import React from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';

// const UsersManagement = () => {
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const { data: users = [], isLoading } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         },
//     });

//     const toggleBlock = async (user) => {
//         try {
//             await axiosSecure.patch(`/users/${user._id}/role`, {
//                 role: user.blocked ? 'user' : 'blocked',
//             });
//             toast.success(user.blocked ? 'User unblocked' : 'User blocked');
//             queryClient.invalidateQueries(['users']);
//         } catch (err) {
//             console.log(err);
//             toast.error('Action failed');
//         }
//     };

//     if (isLoading)
//         return <span className="loading loading-spinner loading-lg"></span>;

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Subscription</th>
//                             <th>Blocked</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, idx) => (
//                             <tr key={user._id}>
//                                 <th>{idx + 1}</th>
//                                 <td>{user.displayName}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role}</td>
//                                 <td>{user.isPremium ? 'Premium' : 'Free'}</td>
//                                 <td>{user.blocked ? 'Yes' : 'No'}</td>
//                                 <td>
//                                     <button
//                                         className={`btn btn-sm ${
//                                             user.blocked
//                                                 ? 'btn-success'
//                                                 : 'btn-error'
//                                         }`}
//                                         onClick={() => toggleBlock(user)}>
//                                         {user.blocked ? 'Unblock' : 'Block'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
// export default UsersManagement;

import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);

    const { data = [], isLoading } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users?searchText=${searchText}`
            );
            return res.data;
        },
    });

    // Sync useQuery data with local state
    useEffect(() => {
        setUsers(data);
    }, [data]);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Make ${user.displayName} an Admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, make admin!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${user._id}/role`, { role: 'admin' })
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            // Optimistic UI update
                            const updatedUsers = users.map((u) =>
                                u._id === user._id ? { ...u, role: 'admin' } : u
                            );
                            setUsers(updatedUsers);

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `${user.displayName} Marked as an Admin`,
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    });
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        Swal.fire({
            title: `Remove ${user.displayName} from Admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${user._id}/role`, { role: 'user' })
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            const updatedUsers = users.map((u) =>
                                u._id === user._id ? { ...u, role: 'user' } : u
                            );
                            setUsers(updatedUsers);

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `${user.displayName} Removed from Admin`,
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    });
            }
        });
    };
    if (isLoading) return <Loading></Loading>;
    return (
        <div className="p-4">
            <h2 className="text-4xl mb-4">Manage Users: {users.length}</h2>

            <div className="mb-4">
                <input
                    type="search"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Search users"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {user.displayName}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <button
                                            onClick={() =>
                                                handleRemoveAdmin(user)
                                            }
                                            className="btn btn-sm bg-red-400 hover:bg-red-500">
                                            <FiShieldOff />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user)
                                            }
                                            className="btn btn-sm bg-green-400 hover:bg-green-500">
                                            <FaUserShield />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {/* future extra actions */}
                                    <button className="btn btn-sm btn-ghost">
                                        Details
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

export default UsersManagement;
