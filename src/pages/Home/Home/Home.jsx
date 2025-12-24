// import React from 'react';
// import Banner from '../Banner/Banner';
// import Brands from '../Brands/Brands';
// import Reviews from '../Reviews/Reviews';
// import LatestResolvedIssues from '../LatestResolvedIssues/LatestResolvedIssues';
// import FeaturesSection from '../FeaturesSection/FeaturesSection';
// import { HowItWorks } from '../HowItWorks/HowItWorks';
// import WhyCityCare from '../WhyCityCare/WhyCityCare';
// import CallToAction from '../CallToAction/CallToAction';

// const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

// const Home = () => {
//     return (
//         <div>
//             <Banner />
//             <Brands />

//             {/* Reviews Section */}
//             <Reviews reviewsPromise={reviewsPromise} />
//             <FeaturesSection />
//             <HowItWorks />
//             <WhyCityCare />
//             <CallToAction />
//             <LatestResolvedIssues></LatestResolvedIssues>
//         </div>
//     );
// };

// export default Home;

import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';
import LatestResolvedIssues from '../LatestResolvedIssues/LatestResolvedIssues';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import { HowItWorks } from '../HowItWorks/HowItWorks';
import WhyCityCare from '../WhyCityCare/WhyCityCare';
import CallToAction from '../CallToAction/CallToAction';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['home-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <Banner />
            <div className="max-w-7xl mx-auto">
                <FeaturesSection />
                {/* ISSUE SLIDER */}
                {!isLoading && <Brands issues={issues} />}

                <Reviews reviewsPromise={reviewsPromise} />
                <HowItWorks />
                <WhyCityCare />
                <CallToAction />
                <LatestResolvedIssues />
            </div>
        </div>
    );
};

export default Home;
