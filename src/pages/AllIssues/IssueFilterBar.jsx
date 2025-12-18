import React from 'react';

const IssueFilterBar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <input
                type="text"
                placeholder="Search..."
                name="search"
                value={filters.search}
                onChange={handleChange}
                className="input input-bordered input-sm"
            />
            <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="select select-bordered select-sm">
                <option value="">All Categories</option>
                <option value="road">Road</option>
                <option value="streetlight">Streetlight</option>
                <option value="water">Water</option>
                <option value="garbage">Garbage</option>
            </select>
            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="select select-bordered select-sm">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
            </select>
            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
                className="select select-bordered select-sm">
                <option value="">All Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
            </select>
        </div>
    );
};

export default IssueFilterBar;
