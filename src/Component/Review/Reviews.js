import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'
import AddReview from './AddReview'
import ReviewCard from './ReviewCard'

const Reviews = () => {
    const [show, setShow] = useState(false)
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const { isLoading, data, refetch } = useQuery(['reviews'], () =>
        fetch('https://mobile-collections-backend.vercel.app/review')
            .then(res =>
                res.json()
            )
    )

    const addReview = () => {
        if (user) {
            if (show) {
                setShow(false)
            }
            else {
                setShow(true)
            }
        }
        else {
            navigate('/login')
        }
    }
    if (isLoading || loading) {
        return <Loading />
    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl text-center mt-16'>Reviews</h1>
            <div className={`flex justify-center`}>
                <button onClick={addReview} className='btn mt-10'>Write a Review</button>
            </div>
            {
                show && user ? <AddReview refetch={refetch} show={show} /> : <></>
            }
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-14 gap-5">
                {
                    data.map(review => <ReviewCard key={review._id} review={review} />)
                }
            </div>
        </div>
    )
}

export default Reviews