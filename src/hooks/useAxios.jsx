import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://city-care-server-three.vercel.app',
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
