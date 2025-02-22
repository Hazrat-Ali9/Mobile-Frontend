import axios from 'axios'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'
import Payment from './Payment'
// Orders js
const Orders = () => {
    const [user, loading] = useAuthState(auth)
    const url = `https://mobile-collections-backend.vercel.app/order/${user.email}`
    const [show, setShow] = useState(false)
    const [showDel, setshowDel] = useState(false)
    const [order, setOrder] = useState({})
    const [id, setId] = useState('')
    const [clientSecret, setClientSecret] = useState("");

    const { isLoading, data, refetch } = useQuery(['Orders'], () =>
        fetch(url, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        }).then(res =>
            res.json()
        )
    )
  
    const deleteOrder = (id) => {
        setId(id)
        setshowDel(true)
    }


    function goForPay() {
        setShow(true)
        fetch("https://mobile-collections-backend.vercel.app/payment/create-payment-intent", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: order.totalPrice }),
        })
            .then((res) => {
                if (res.status === 500) {
                    toast.error('Server Problem Plz Try Again')
                }
                return res.json()
            })
            .then((data) => {
                console.log(data);
                setClientSecret(data.clientSecret)
            });
    }
    if (isLoading || loading) {
        return <Loading />
    }
    return (
        <div className='w-full'>
            <h1 className="text-4xl text-center font-bold">My Orders</h1>
            <div className="overflow-x-auto w-full mt-10">
                <table className="table-compact w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th />
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price Per Product</th>
                            <th>Price Total</th>
                            <th>Quantity</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(((product, index) =>
                                <tr key={product._id}>
                                    <th className='text-center'>{index + 1}</th>
                                    <td className='text-center'>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={product.image} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center'>{product.name.slice(0,30)}</td>
                                    <td className='text-center'>${product.price}</td>
                                    <td className='text-center'>${product.totalPrice}</td>
                                    <td className='text-center'>{product.quantity}p</td>
                                    <td className='text-center'>{product.email}</td>
                                    <td className='text-center'>{product.phone}</td>
                                    <td className='text-center'>
                                        <div>
                                            {
                                                product.position === "paid" ?
                                                    <p className='text-xl pb-2 text-primary'>Processing..</p>
                                                    :
                                                    <button onClick={() => {
                                                        goForPay()
                                                        setOrder(product)
                                                    }} to='/dashboard/payment' className="btn btn-primary mr-4">pay</button>

                                            }
                                            {
                                                product.position === "paid" ? <p className='text-green-500'>Trans Id : {product.paymentInfo.transactionId}</p>
                                                    :
                                                    <button className="btn btn-error" onClick={() => deleteOrder(product._id)}>Delete</button>}
                                        </div>
                                    </td>
                                </tr>))
                        }
                    </tbody>
                </table>
            </div>
            <ConfirmModal showDel={showDel} setshowDel={setshowDel} id={id} refetch={refetch} />
            <PaymentModal show={show} setShow={setShow} order={order} clientSecret={clientSecret} refetch={refetch}/>
        </div>
    )
}

export default Orders

const PaymentModal = ({ show, setShow, order, clientSecret, refetch }) => {

    return (
        <div className={`${show && clientSecret ? 'block' : "hidden"} absolute product-order-page top-0 right-0 z-10 w-full`}>
            <div className="hero min-h-screen">
                <div style={{ width: '100%' }} className="hero-content">

                    <div className="card relative w-full max-w-md shadow-2xl bg-base-100">
                        <button className='absolute top-0 right-0 bg-red-500 p-2 text-white' onClick={() => setShow(false)}>Close</button>
                        <div className="card-body w-full">
                            <Payment order={order} clientSecret={clientSecret} setShow={setShow} refetch={refetch}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ConfirmModal = ({ id, refetch, setshowDel, showDel }) => {
    function deletProduct() {
        axios.delete(`https://mobile-collections-backend.vercel.app/order/${id}`, {
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        })
            .then(res => {
                console.log(res)
                refetch()
                setshowDel(false)
            })
    }
    return (
        <div className={`${showDel ? "flex" : "hidden"} overlay-modal z-10`}>
            <div className="card p-10 flex flex-cols items-center justify-center max-w-lg w-full bg-base-100 shadow-2xl">
                <h1>Are You Sure You Want To Delete This</h1>
                <div className="flex mt-5">
                    <button onClick={deletProduct} className='btn btn-error text-white btn-md bg-red-500'>Delete</button>
                    <button className='btn btn-success ml-3 text-white btn-md bg-green-500' onClick={() => setshowDel(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}
