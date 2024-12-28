import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import auth from '../Firebase/firebase.init'
import Loading from '../Loading/Loading'
// Profile js 
const Profile = () => {
    const [user, loading] = useAuthState(auth)
    const [edit, setEdit] = useState(false)
    const { register, handleSubmit, } = useForm();
    const { isLoading, data, refetch } = useQuery(['Profiles'], () =>
        fetch(`https://mobile-collections-backend.vercel.app/profile/${user.email}`, {
            method: "get",
            headers: {
                auth: localStorage.getItem('accessToken')
            }
        }).then(res =>
            res.json()
        )
    )
    const onSubmit = data => {
        const name = user.displayName
        const email = user.email
        const others = data
        const profileData = { name, email, others }
        console.log(profileData);
        fetch(`https://mobile-collections-backend.vercel.app/profile/${email}`, {
            method: "put",
            headers: {
                'content-type': 'application/json',
                auth: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(profileData)
        }).then(res => res.json()).then(json => {
            setEdit(false)
            refetch()
        })
    }

    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div className='p-3 w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={user.photoURL} alt='user avater' />
                    </div>
                </div>
                <p className='my-2'>Name : {user.displayName}</p>
                <p>Email : {user.email}</p>
                <p className="font-bold mt-4">Links</p>
                <div className="links mt-4">
                    <span className='block'>Facebook</span>
                    <input type="text " {...register("facebook", { value: data?.others?.facebook ? data?.others?.facebook : "Your Link" })}
                        disabled={!edit} className={`${edit && "border"} w-full p-2 my-3`}
                        deafultvalue={'Facebook'} />
                    <span className='block'>Twitter</span>
                    <input type="text " {...register("twitter", { value: data?.others?.twitter ? data?.others?.linkedin : "your Link" })}
                        disabled={!edit} className={`${edit && "border "} w-full p-2 my-3`}
                        deafultvalue={'twitter'} />

                    <span className='block'>Linkedin</span>

                    <input type="text " {...register("linkedin", { value: data?.others?.linkedin ? data?.others?.linkedin : "Your Link" })}
                        disabled={!edit} className={`${edit && "border"} w-full p-2 my-3`}
                        deafultvalue={'Linkedin'} />

                    <span className='block'>Github</span>
                    <input type="text " {...register("github", { value: data?.others?.github ? data?.others?.github : "Your Link" })}
                        disabled={!edit} className={`${edit && "border"} w-full p-2 my-3`} />
                </div>
                <p className="font-bold mt-4">Skills</p>
                <div className={`${edit || data.others ? "sdsd" : "hidden"} links mt-4 grid grid-cols-2 lg:grid-cols-4`}>
                    <input type="text "  {...register("skill1", { value: data?.others?.skill1 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                    <input type="text "  {...register("skill2", { value: data?.others?.skill2 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                    <input type="text "  {...register("skill3", { value: data?.others?.skill3 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                    <input type="text "  {...register("skill4", { value: data?.others?.skill4 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                    <input type="text " {...register("skill5", { value: data?.others?.skill5 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                    <input type="text "  {...register("skill6", { value: data?.others?.skill6 })} disabled={!edit} className={`${edit && "border"} p-2 mt-3`} />
                </div>
                {
                    edit && <button type='submit' className='btn mt-4 btn-md'>Update</button>
                }
            </form>
            {
                !edit && <button onClick={() => setEdit(true)} className='btn mt-4 btn-md'>Edit Profile</button>
            }
        </div>
    )
}

export default Profile