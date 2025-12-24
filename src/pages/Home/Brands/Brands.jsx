import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import IssueCard from '../../AllIssues/IssueCard';

const Brands = ({ issues = [] }) => {
    if (!issues.length)
        return (
            <p className="text-center text-gray-500 py-10">No issues found</p>
        );

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-secondary mb-8 sm:mb-10">
                Current Reports
            </h2>

            {/* Swiper */}
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                spaceBetween={16}
                loop={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 1.2,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2.5,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}>
                {issues.map((issue) => (
                    <SwiperSlide key={issue._id} className="h-full">
                        <IssueCard issue={issue} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Brands;
