import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;

    return (
        <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
            <FaQuoteLeft className="text-sky-500 text-2xl mb-4" />

            <p className="text-slate-600 mb-6">{testimonial}</p>

            <div className="border-t border-dashed border-slate-300 my-4"></div>

            <div className="flex items-center gap-4">
                <img
                    src={user_photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                    <h3 className="font-semibold text-slate-700">{userName}</h3>
                    <p className="text-sm text-slate-500">City Resident</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
