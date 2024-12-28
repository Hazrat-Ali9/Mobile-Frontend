import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Social from './Social';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from '../Firebase/firebase.init';
// Register 
const Register = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const url = `https://api.imgbb.com/1/upload?key=430f95e02b148e77494d04413a24e86c`;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        setLoading(true)
        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const photoURL = result.data.url
                    const name = data.name
                    const email = data.email
                    const password = data.password
                    const userData = { email, name, photoURL }
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            updateProfile(auth.currentUser, {
                                displayName: data.name,
                                photoURL
                            })
                            fetch(`https://mobile-collections-backend.vercel.app/users/${user.email}`, {
                                method: "PUT",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(userData)
                            })
                                .then(res => res.json())
                                .then(result => {
                                    localStorage.setItem('accessToken', result.token)
                                    setLoading(false)
                                    navigate(from)
                                    fetch(`https://mobile-collections-backend.vercel.app/profile/${email}`, {
                                        method: "put",
                                        headers: {
                                            'content-type': 'application/json',
                                            auth: localStorage.getItem("accessToken")
                                        },
                                        body: JSON.stringify({ email, name, others: {} })
                                    }).then(res => res.json()).then(json => {
                                        console.log('Added Profile For This User')
                                    })
                        })
                })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
                setLoading(false)
            });
    }
})
    }
return (
    <div>
        <div className="hero min-h-screen bg-base-200">
            <div style={{ width: '100%' }} className="hero-content">

                <div className="card w-full max-w-md shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", { required: true, maxLength: 20 })}

                                className="input input-bordered" />
                            <p className='text-red-500 mt-2 ml-2'>{errors.name?.type === 'required' && "Name is required"} </p>
                        </div>
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input type='file'
                                {...register("image", { required: true, maxLength: 20 })}
                                className="input p-2 input-bordered" />
                            <p className='text-red-500 mt-2 ml-2'>{errors.image?.type === 'required' && "Your Image"} </p>
                        </div>

                        <p className='text-red-500 mt-3'>{error}</p>
                        <div className="form-control mt-6">
                            <button type='submit' className={`btn btn-primary ${loading && "loading"}`}>{`${loading ? "Registering...." : "Register"}`}</button>
                        </div>
                        <p className='mt-3'>Alrady user
                            <Link to='/login' className="ml-3 text-blue-600 link link-hover">Login</Link>
                        </p>

                    </form>
                    <Social />
                </div>
            </div>
        </div>

    </div>
)
}

export default Register