import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
    {
        img: '/banner/s-1.jpg',
        title: 'Report City Issues Easily',
        subtitle: 'Help your city by reporting infrastructure problems',
    },
    {
        img: '/banner/s-2.jpg',
        title: 'Smart City Management',
        subtitle: 'Track and resolve public issues faster',
    },
    {
        img: '/banner/s-3.jpg',
        title: 'Citizen & Authority Connected',
        subtitle: 'A bridge between citizens and officials',
    },
    {
        img: '/banner/s-4.jpg',
        title: 'Real-Time Issue Tracking',
        subtitle: 'Transparency at every step',
    },
    {
        img: '/banner/s-5.jpg',
        title: 'Clean • Safe • Modern City',
        subtitle: 'Together we build a better future',
    },
    {
        img: '/banner/s-6.jpg',
        title: 'Your Voice Matters',
        subtitle: 'Report. Track. Resolve.',
    },
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleChange = (index) => setCurrentIndex(index);

    return (
        <section className="relative overflow-hidden h-[70vh] md:h-[85vh] flex items-center">
            <Carousel
                selectedItem={currentIndex}
                onChange={handleChange}
                autoPlay
                infiniteLoop
                interval={5000}
                transitionTime={1200}
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
                swipeable={true} // Enable mobile swipe
                emulateTouch={true} // Enable mobile touch
                renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                        <motion.button
                            onClick={onClickHandler}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 rounded-full bg-black/10 text-white shadow-lg flex items-center justify-center">
                            <ChevronLeft size={28} />
                        </motion.button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                        <motion.button
                            onClick={onClickHandler}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 rounded-full bg-black/10 text-white shadow-lg flex items-center justify-center">
                            <ChevronRight size={28} />
                        </motion.button>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index) => (
                    <motion.span
                        key={index}
                        onClick={onClickHandler}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{
                            scale: isSelected ? 1.3 : 0.8,
                            opacity: isSelected ? 1 : 0.6,
                        }}
                        className="inline-block w-3 h-3 md:w-4 md:h-4 mx-1 rounded-full bg-white cursor-pointer shadow"
                    />
                )}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative w-full h-full overflow-hidden">
                        {/* Parallax Background */}
                        <motion.img
                            src={slide.img}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.05, x: 50, opacity: 0 }}
                            animate={{ scale: 1, x: 0, opacity: 1 }}
                            exit={{ scale: 1.05, x: -50, opacity: 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                        {/* Text and Buttons */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-6 md:px-12 flex justify-start items-center">
                                <AnimatePresence mode="wait">
                                    {currentIndex === index && (
                                        <motion.div
                                            key={slide.title}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 50 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: 'easeOut',
                                            }}
                                            className="max-w-3xl text-white space-y-6">
                                            {/* Floating Title */}
                                            <motion.h1
                                                className="text-3xl md:text-5xl font-extrabold leading-tight tracking-wide"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3,
                                                    ease: 'easeInOut',
                                                }}>
                                                {slide.title}
                                            </motion.h1>

                                            {/* Floating Subtitle */}
                                            <motion.p
                                                className="text-base md:text-lg text-gray-200"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 3.5,
                                                    ease: 'easeInOut',
                                                }}>
                                                {slide.subtitle}
                                            </motion.p>

                                            {/* Floating Buttons with Shine */}
                                            <motion.div
                                                className="flex flex-wrap gap-4 pt-4 items-center"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 4,
                                                    ease: 'easeInOut',
                                                }}>
                                                {/* Primary Button with Shine */}
                                                <motion.button
                                                    whileHover={{
                                                        y: -3,
                                                        scale: 1.05,
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="relative overflow-hidden rounded-xl px-7 py-3 font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-700 shadow-lg hover:shadow-xl transition">
                                                    <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/30 transform rotate-12 animate-[shine_2s_infinite]"></span>
                                                    <Link to={'/issues'}>
                                                        Report Issue
                                                    </Link>
                                                </motion.button>

                                                {/* Secondary Button */}
                                                <motion.button
                                                    whileHover={{
                                                        y: -3,
                                                        scale: 1.05,
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="rounded-xl px-7 py-3 font-medium border border-white text-white hover:bg-white hover:text-black transition">
                                                    <Link to={'/all-issues'}>
                                                        All Issues
                                                    </Link>
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Shine animation keyframes */}
            <style>
                {`
          @keyframes shine {
            0% { left: -75%; }
            50% { left: 125%; }
            100% { left: 125%; }
          }
          .animate-[shine_2s_infinite] {
            animation: shine 2s linear infinite;
          }
        `}
            </style>
        </section>
    );
};

export default Banner;
