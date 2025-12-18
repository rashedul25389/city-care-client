import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import c1 from '../../../assets/banner/c-1.webp';
import c2 from '../../../assets/banner/c-2.webp';
import c3 from '../../../assets/banner/c-3.webp';
import c4 from '../../../assets/banner/c-4.jpg';
import c5 from '../../../assets/banner/c-5.webp';
import c6 from '../../../assets/banner/c-6.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {[c1, c2, c3, c4, c5, c6].map((img, index) => (
                <div key={index} className="relative mt-15">
                    <img src={img} className="h-[70vh] object-cover" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-sky-900/80 to-sky-600/40 flex items-center">
                        <div className="text-white max-w-3xl px-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Report City Issues <br /> Build a Better City
                            </h1>
                            <p className="mb-6 text-slate-200">
                                CityCare connects citizens with authorities to
                                resolve infrastructure issues faster and
                                transparently.
                            </p>
                            <Link
                                to="/all-issues"
                                className="bg-primary hover:bg-secondary transition px-6 py-3 rounded-md font-semibold">
                                View All Issues
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
