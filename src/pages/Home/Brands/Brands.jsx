import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import IssueCard from '../../AllIssues/IssueCard';

const Brands = ({ issues = [] }) => {
    if (!issues.length) return <p className="text-center">No issues</p>;

    return (
        <div className="">
            <h2 className="text-4xl font-bold text-center text-secondary mb-12">
                Current Repors
            </h2>
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                spaceBetween={10}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}>
                {issues.map((issue) => (
                    <SwiperSlide key={issue._id}>
                        <IssueCard issue={issue} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;
