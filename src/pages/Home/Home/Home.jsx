import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import LatestResolvedIssues from '../LatestResolvedIssues/LatestResolvedIssues';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import { HowItWorks } from '../HowItWorks/HowItWorks';
import WhyCityCare from '../WhyCityCare/WhyCityCare';
import CallToAction from '../CallToAction/CallToAction';

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />

            {/* Reviews Section */}
            <Reviews reviewsPromise={reviewsPromise} />
            <FeaturesSection />
            <HowItWorks />
            <WhyCityCare />
            <CallToAction />
            <LatestResolvedIssues></LatestResolvedIssues>
        </div>
    );
};

export default Home;
