// ReviewCards
import { Rating } from '@mui/material';
import React from 'react'
const ReviewCard = ({ review }) => {
    return (
        <div className="card w-full bg-base-100 pt-5 shadow-2xl">
            <div className="card-body">
                <Rating
                    name="simple-controlled"
                    value={review?.rating}
                />
                <div className="flex items-center mt-3">
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <img src={review?.image} alt={review.image}/>
                    </div>
                </div>
                <div className="info ml-3">
                <h2 className="card-title">{review?.username}</h2>
                <p className='mt-2'>{review?.date}</p>
                </div>
                </div>
               <p className='mt-5'>{review?.desc?.length > 110 ? review.desc.slice(0,230)+'....' : review.desc}</p>
            </div>
        </div>
    )
}

export default ReviewCard