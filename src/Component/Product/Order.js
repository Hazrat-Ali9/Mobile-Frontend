import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../Firebase/firebase.init';
import Loading from '../Loading/Loading';
// Order js
const Order = ({ product, show, setShow }) => {
    const [error, setError] = useState('')
    const [user, userLoading] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const quantityProduct = parseInt(product.quantity)
    const onSubmit = (data) => {
        setLoading(true)
        const email = user.email
        const name = product.name
        const phone = data.phone
        const quantity = parseInt(data.quantity)
        const totalPrice = parseInt(product.price) * quantity
        const image = product.image
        const order = []
        console.log(order)
        if (quantityProduct > quantity && quantity >= 300) {
            setError('')
            fetch('https://mobile-collections-backend.vercel.app/order/add', {
                method: 'Post',
                headers: {
                    'content-type': 'application/json',
                    auth: localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ email, name, totalPrice, price: product.price, quantity, image , phone })
            })
                .then(res => {
                    console.log(res)
                    setLoading(false)
                    reset()
                    toast.success('Order Submited')
                    setShow(false)
                })

        } else {
            setError(`Minumum Order Limit ${300} Maximum Order Limit ${product.quantity}`)
            setLoading(false)
            
        }
    }
    if (userLoading) {
        return <Loading />
    }
    return (
        <div className={`${show ? 'block' : "hidden"} absolute product-order-page top-20 right-0 z-10 w-full`}>
            <div className="hero min-h-screen">
                <div style={{ width: '100%' }} className="hero-content">

                    <div className="card relative w-full max-w-md shadow-2xl bg-base-100">
                        <button className='absolute top-0 right-0 bg-red-500 p-2 text-white' onClick={() => setShow(false)}>Close</button>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    value={product.name}
                                    className="input font-bold input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Quantity <p className='font-bold text-neutral'>Min Order : {product.quantity > 300 ? 300 : product.quantity} Max Order {product.quantity}</p></span>
                                </label>
                                <input type='number'
                                    {...register("quantity", { required: true, maxLength: 20 })}
                                    className="input input-bordered" />
                                <p className='text-red-500 mt-2 ml-2'>{errors.quantity?.type === 'required' && "Quantity Required"} </p>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    defaultValue={user.email} disabled
                                    {...register("email")}
                                    className="input input-bordered" type='email' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type='number'
                                    {...register("phone", { required: true, maxLength: 20 })}
                                    className="input input-bordered" />
                                <p className='text-red-500 mt-2 ml-2'>{errors.phone?.type === 'required' && "Enter Your Contact Number"} </p>
                            </div>


                            <p className='text-red-500 font-bold mt-2'>{error}</p>
                            <div className="form-control mt-5">
                                <button type='submit' className={`btn btn-primary ${loading && "loading"}`}>{`${loading ? "Confirming...." : "Submit Order"}`}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order