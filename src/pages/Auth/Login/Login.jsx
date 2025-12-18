import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-xl shadow-cyan-200 p-7">
            <h3 className="text-3xl text-center font-bold">Welcome back</h3>
            <p className="text-center">Please Login</p>
            <form
                className="card-body p-0"
                onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500">Email is required</p>
                    )}

                    {/* password field
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                        })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.password?.type === 'minLength' && (
                        <p className="text-red-500">
                            Password must be 6 characters or longer{' '}
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
                        Login
                    </button>
                </fieldset>
                <p>
                    New to City Care{' '}
                    <Link
                        state={location.state}
                        className="text-blue-400 underline"
                        to="/register">
                        Register
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

export default Login;
