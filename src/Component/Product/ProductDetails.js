import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Order from './Order'

//Product Details

const ProductDetails = () => {
    const location = useLocation()
    const [show, setShow] = useState(false)
    const pathname = location.pathname
    const id = pathname.split('/')
    const url = `https://mobile-collections-backend.vercel.app/product/${id[2]}`
    const { isLoading, data } = useQuery(['One-product'], () =>
        fetch(url, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        }).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="hero py-14 items-start bg-base-200">
                <div className="hero-content flex-col items-center lg:flex-row">
                    <img src={data.image} className="max-w-lg w-full rounded-lg shadow-2xl" alt='' />
                    <div className='lg:ml-10'>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className='mt-5 font-bold text-neutral'>Price : ${data.price}</p>
                        <p className='mt-5 font-bold text-neutral'>Quantity : {data.quantity} p</p>
                        <p className='mt-5 font-bold text-neutral'>Min Order : {data.quantity > 300 ? 300 : data.quantity} p</p>
                        <p className="py-6">{data.description}</p>
                        <button onClick={() => setShow(true)} className="btn btn-primary">Order Now</button>
                    
                    </div>
                </div>
            </div>
            <Order product={data} show={show} setShow={setShow} />
        </div>
    )
}

export default ProductDetails