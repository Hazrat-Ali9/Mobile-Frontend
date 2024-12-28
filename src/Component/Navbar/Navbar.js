// Navbar js

import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/firebase.init';
import { signOut } from 'firebase/auth';
import person from '../Images/person.png'
const Navbar = () => {
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    return (
        <div className='bg-base-100  shadow-md'>
// hazrat ali
            <div className="navbar container mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 border  rounded-box w-52">
                            <Navigations user={user} />
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-white  normal-case text-[20px]">Hazrat Ali Shop</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-neutral menu-horizontal p-0">
                        <Navigations user={user} />
                        {user && <li className='mx-2 text-gray-100'><NavLink to='/dashboard'>DashBoard</NavLink></li>}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        user ?
                            <div className="dropdown dropdown-end ">
                                <label tabIndex={0} className={`${loading && "loading"} btn btn-ghost  btn-circle avatar`}>
                                    <div className="w-24 rounded-full ">
                                        <img src={user ? user.photoURL : person} alt='amar-mata' />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 border rounded-box w-52">
                                    <li>
                                        <Link to='/dashboard' className="justify-between">
                                            Dash Board
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    {
                                        user ?
                                            <li><button onClick={() => {
                                                signOut(auth)
                                                navigate('/')
                                            }}>Log Out</button></li>
                                            :
                                            <li><Link to='/login'>Login</Link></li>
                                    }
                                </ul>
                            </div>
                            :
                            <Link to='/login' className="btn text-gray-200">
                                Login
                            </Link>
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar

const Navigations = (user) => {

    return (
        <>
            <li >
                <Link className='text-gray-200' to='/home'>
                    Home
                </Link>
            </li>
            <li className='sticky '>
                <Link className="text-gray-200" to="/products">
                    Product
                </Link>
                <ul className="p-2">
                    <Link className="text-gray-200 pb-2" to="/product">
                        Mobile
                    </Link>
                    <Link className="text-gray-200" to="/laptop">
                        Laptop
                    </Link>
                </ul>
            </li>
            <li className='mx-2 text-gray-200'><NavLink to='/review'>Reviews</NavLink></li>
            <li className='mx-2 text-gray-200'><NavLink to='/team'>Team</NavLink></li>
            <li className='mx-2 text-gray-200'><NavLink to='/contact'>Contact</NavLink></li>

        </>
    )
}