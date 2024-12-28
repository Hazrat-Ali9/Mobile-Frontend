import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../Firebase/firebase.init';
// Social
const Social = () => {
    const [loading, setLoading] = useState(false)
    const provider = new GoogleAuthProvider();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const signIn = () => {
        setLoading(true)
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                fetch(`https://mobile-collections-backend.vercel.app/users/${user.email}`, {
                    method: "put",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ photoURL: user.photoURL, name: user.displayName, email: user.email })
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        localStorage.setItem('accessToken', result.token)
                        setLoading(false)
                        navigate(from)
                        fetch(`https://mobile-collections-backend.vercel.app/profile/${user.email}`, {
                            method: "put",
                            headers: {
                                'content-type': 'application/json',
                                auth: localStorage.getItem("accessToken")
                            },
                            body: JSON.stringify({ email : user.email, name : user.displayName, others: {} })
                        }).then(res => res.json()).then(json => {
                            console.log('Added Profile For This User')
                        })
                    })
            }).catch((error) => {
                setLoading(false)
            })
    }
    return (
        <div>
            <div className='mx-7'>
                <div className="divider mt-5">OR</div>
                <button
                    onClick={signIn}
                    className={`${loading && "loading"} btn bg-neutral w-full my-5`}>Google</button>
            </div>
        </div>
    )
}

export default Social