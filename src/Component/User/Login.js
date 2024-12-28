/* eslint-disable no-useless-escape */
// Login
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import auth from '../Firebase/firebase.init';
import Social from './Social';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                fetch(`https://mobile-collections-backend.vercel.app/users/${user.email}`, {
                    method: "put",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ photoURL: user.photoURL, name: user.displayName, email: user.email })
                })
                    .then(res => res.json())
                    .then(result => {
                        localStorage.setItem('accessToken', result.token)
                        setLoading(false)
                        navigate(from)
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
                setLoading(false)
            });
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div style={{ width: '100%' }} className="hero-content">

                    <div className="card w-full max-w-md shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }, { required: true })}
                                    className="input input-bordered" type='email' />

                                <p className='text-red-500 mt-2 ml-2' >{errors.email?.type === 'required' && "Email is required"} </p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type='password'
                                    {...register("password", { required: true, maxLength: 20 })}
                                    className="input input-bordered" />
                                <p className='text-red-500 mt-2 ml-2'>{errors.password?.type === 'required' && "Password Required"} </p>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="form-control mt-6">
                                <button type='submit' className={`btn btn-primary ${loading && "loading"}`}>{`${loading ? "Login ...." : "Login"}`}</button>
                            </div>
                            <p className='mt-3'> Not a user
                                <Link to='/register' className="ml-3 text-blue-600 link link-hover">Sign Up</Link>
                            </p>

                        </form>
                        <Social />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login