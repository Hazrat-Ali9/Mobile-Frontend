// Add Reviews 
import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'
import useDate from '../Shared/useDate'
const AddReview = ({  show }) => {
    const [user, loading] = useAuthState(auth)
    const [submitting, setSubmitting] = useState(false)
    const [desc, setDesc] = useState('')
    const [rating, setRateing] = useState(0)
    const [dateToday] = useDate()
    const addreview = () => {
        if (user && desc && rating) {
            setSubmitting(true)
            fetch('https://mobile-collections-backend.vercel.app/review', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    auth: localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ date: dateToday, username: user.displayName, email: user.email, desc, rating, image: user.photoURL })
            }).then(res => {
                
                if (res.status === 200) {
                    setRateing(0)
                    setDesc('')
                    toast.success("Review Added SuccessFul")
                    setSubmitting(false)
                }
            })
        }
        else {
            alert('Plz Fill Up All')
        }
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className={` ${show ? "block" : 'hidden'} card w-full max-w-md p-7`}>
            <div className="flex items-center my-4">
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <img src={user.photoURL} alt='sdsdw3e2323' />
                    </div>
                </div>
                <div className="info ml-3">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>

            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRateing(newValue);
                }}
            />
            <div className="form-control mt-5">
                <textarea
                    className="input h-64 input-bordered"
                    placeholder='You Message'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className='mt-4'>
                <button onClick={addreview} className={`btn ${submitting && 'loading'} btn-primary`}>Submit</button>
            </div>
        </div>
    )
}

export default AddReview