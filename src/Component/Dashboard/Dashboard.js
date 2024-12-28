import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useUser from '../Hook/useUser'
// Dashboard js
const Dashboard = () => {
    const [currentUser, loading] = useUser()
    return (
        <div>
            <div className="drawer drawer-mobile ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content relative flex flex-col items-start justify-items-start p-5">

                    <label htmlFor="my-drawer-2" className="btn btn-neutral drawer-button text-accent lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <Outlet />
                </div>
                <div className="drawer-side border">
                    <label htmlFor="my-drawer-2" className="drawer-overlay" />
                    <ul className="menu pl-4 overflow-y-auto w-64 bg-base-100 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink className='border-r-2 mt-2 border-primary' to='profile'>Profile</NavLink></li>
                        {currentUser.role === "admin" && <li><NavLink className='border-r-2 mt-2 border-primary' to='all-users'>All Users</NavLink></li>}
                        <li><NavLink className='border-r-2 mt-2 border-primary' to='review'>Write A Review</NavLink></li>
                        <li><NavLink className='border-r-2 mt-2 border-primary' to='orders'>Orders</NavLink></li>
                        {currentUser.role === "admin" && <>
                            <li><NavLink className='border-r-2 mt-2 border-primary' to='products-add'>Add Products</NavLink></li>
                            <li><NavLink className='border-r-2 mt-2 border-primary' to='products-manage'>Manage Product</NavLink></li>
                            </>
                    }
                     
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Dashboard