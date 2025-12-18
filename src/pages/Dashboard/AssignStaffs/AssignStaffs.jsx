import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignStaffs = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const axiosSecure = useAxiosSecure();
    const staffModalRef = useRef();

    /* =======================
       Pending Issues
    ======================= */
    const { data: issues = [], refetch: issuesRefetch } = useQuery({
        queryKey: ['issues', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues?status=pending');
            return res.data;
        },
    });

    /* =======================
       Available Approved Staffs (District based)
    ======================= */
    const { data: staffs = [], refetch: staffRefetch } = useQuery({
        queryKey: ['staffs', selectedIssue?.district],
        enabled: !!selectedIssue,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/staffs?status=approved&workStatus=available&district=${selectedIssue?.district}`
            );
            return res.data;
        },
    });

    const openAssignStaffModal = (issue) => {
        setSelectedIssue(issue);
        staffModalRef.current.showModal();
    };

    const handleAssignStaff = async (staff) => {
        try {
            const res = await axiosSecure.patch(
                `/issues/${selectedIssue._id}/assign`,
                {
                    staffEmail: staff.email,
                    staffName: staff.name,
                }
            );

            if (res.data.success) {
                staffModalRef.current.close();
                issuesRefetch();
                staffRefetch();

                Swal.fire({
                    icon: 'success',
                    title: 'Staff Assigned',
                    text: `${staff.name} has been assigned to this issue`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to assign staff', err);
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-bold mb-6">
                Pending Issues ({issues.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, index) => (
                            <tr key={issue._id}>
                                <th>{index + 1}</th>
                                <td>{issue.title}</td>
                                <td>{issue.category}</td>
                                <td>{issue.location}</td>
                                <td>{issue.priority}</td>
                                <td>
                                    {new Date(
                                        issue.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            openAssignStaffModal(issue)
                                        }
                                        className="btn btn-primary btn-sm">
                                        Find Staff
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* =======================
               STAFF MODAL
            ======================= */}
            <dialog
                ref={staffModalRef}
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">
                        Available Staffs ({staffs.length})
                    </h3>

                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff, i) => (
                                <tr key={staff._id}>
                                    <th>{i + 1}</th>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleAssignStaff(staff)
                                            }
                                            className="btn btn-success btn-sm">
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignStaffs;
