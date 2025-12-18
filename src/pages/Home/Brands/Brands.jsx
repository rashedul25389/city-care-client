import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';

const brandLogos = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
];

const Brands = () => {
    return (
        <div className="bg-slate-50 py-16">
            <Swiper
                loop
                slidesPerView={4}
                centeredSlides
                spaceBetween={40}
                grabCursor
                modules={[Autoplay]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    768: { slidesPerView: 4 },
                }}>
                {brandLogos.map((logo, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={logo}
                            className="h-12 opacity-70 hover:opacity-100 transition"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;
