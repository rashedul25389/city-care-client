import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);

    return (
        <section className="my-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h3 className="text-3xl font-bold text-slate-700 mb-4">
                    Citizen Feedback
                </h3>
                <p className="text-slate-500">
                    Hear from citizens who used CityCare to report and resolve
                    real infrastructure issues in their communities.
                </p>
            </div>

            <Swiper
                loop
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    depth: 200,
                    modifier: 1,
                    scale: 0.8,
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination
                modules={[EffectCoverflow, Pagination, Autoplay]}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}>
                {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Reviews;
