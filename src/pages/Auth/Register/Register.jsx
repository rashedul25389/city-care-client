import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                // 1. store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the ul
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_image_host_key
                }`;

                axios.post(image_API_URL, formData).then((res) => {
                    const photoURL = res.data.data.url;

                    // create user in the database
                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL: photoURL,
                    };
                    axiosSecure.post('/users', userInfo).then((res) => {
                        if (res.data.insertedId) {
                            console.log('user created in the database');
                        }
                    });

                    // update user profile to firebase
                    const userProfile = {
                        displayName: data.name,
                        photoURL: photoURL,
                    };

                    updateUserProfile(userProfile)
                        .then(async () => {
                            // save user in DB
                            await axiosSecure.post('/users', userInfo);

                            // fetch role
                            const res = await axiosSecure.get(
                                `/users/${data.email}/role`
                            );
                            const role = res.data.role;

                            if (role === 'staff') {
                                navigate('/dashboard');
                            } else {
                                navigate('/');
                            }
                        })
                        .catch((err) => console.log(err));
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-xl shadow-cyan-200 p-7">
            <h3 className="text-3xl text-center font-bold">
                Welcome to City Care
            </h3>
            <p className="text-center">Please Register</p>
            <form
                className="card-body p-0"
                onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className="input"
                        placeholder="Your Name"
                    />
                    {errors.name?.type === 'required' && (
                        <p className="text-red-500">Name is required.</p>
                    )}

                    {/* photo image field */}
                    <label className="label">Photo</label>

                    <input
                        type="file"
                        {...register('photo', { required: true })}
                        className="file-input"
                        placeholder="Your Photo"
                    />

                    {errors.name?.type === 'required' && (
                        <p className="text-red-500">Photo is required.</p>
                    )}

                    {/* email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500">Email is required.</p>
                    )}

                    {/* password
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern:
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.password?.type === 'required' && (
                        <p className="text-red-500">Password is required.</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500">
                            Password must be 6 characters or longer
                        </p>
                    )}
                    {errors.password?.type === 'pattern' && (
                        <p className="text-red-500">
                            Password must have at least one uppercase, at least
                            one lowercase, at least one number, and at least one
                            special characters
                        </p>
                    )} */}

                    {/* password */}
                    <label className="label">Password</label>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern:
                                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                            })}
                            className="input w-full pr-10"
                            placeholder="Password"
                        />

                        {/* eye button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn text-black w-full bg-white border-primary transition border-b-4 hover:border-secondary hover:font-extrabold mt-4">
                        Register
                    </button>
                </fieldset>
                <p>
                    Already have an account{' '}
                    <Link
                        state={location.state}
                        className="text-blue-400 underline"
                        to="/login">
                        Login
                    </Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
            <Link to={'/'} className="mx-auto w-full">
                <button className="w-full p-2 rounded-sm font-bold transition border-b-4 bg-primary text-white border-transparent hover:bg-secondary hover:border-primary">
                    Back To City Care
                </button>
            </Link>
        </div>
    );
};

export default Register;
