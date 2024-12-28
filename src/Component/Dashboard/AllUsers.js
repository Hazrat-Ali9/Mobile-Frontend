import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
// All Users
const AllUsers = () => {
  const { isLoading, data, refetch } = useQuery(['All-Users'], () =>
    fetch(`https://mobile-collections-backend.vercel.app/users`,{
      method:"get",
      headers: {
        auth : localStorage.getItem('accessToken')
      }
    }).then(res =>
       res.json()
    )
  )
  const [role, setRole] = useState('am-public')
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='w-full'>
      <h1 className='text-center text-4xl'>All Users : {data.length}</h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (role === "am-public") {
              setRole('admin')
            }
            else {
              setRole('am-public')
            }
          }}
          className='btn px-10 mt-4'>{role === "admin" ? "Show users" : "Show Admins"}</button>
      </div>
      {
        role === "admin" ? <Admins data={data} refetch={refetch} /> : <Users data={data} refetch={refetch} />
      }
    </div>
  )
}

export default AllUsers

const Users = ({ data, refetch }) => {
  const makeAdmin = (email) => {
    fetch(`https://mobile-collections-backend.vercel.app/users/addAdmin/${email}`, {
      method: "put",
      headers: {
        auth : localStorage.getItem('accessToken')
      }
    })
      .then(res => refetch())
  }
  return (
    <div className="overflow-x-auto mt-10 w-full">
      <table className="table-compact  w-full">
        {/* head */}
        <thead>
          <tr>
            <th />
            <th>Avater</th>
            <th>Name</th>
            <th>Email</th>
            <th>Make Admin</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(((user, index) =>
              <tr className={user.role === "am-public" ? "visivle" : "hidden"} key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={user.photoURL} alt='dsdsd' />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td >
                  <button onClick={() => makeAdmin(user.email)} className='btn mr-'>Make Admin</button>
                </td>
                <td>
                  <button className='btn'>Delete</button>
                </td>
              </tr>))
          }
        </tbody>
      </table>

    </div>
  )
}

const Admins = ({ data, refetch }) => {
  const removeAdmin = (email) => {
    fetch(`https://mobile-collections-backend.vercel.app/users/removeAdmin/${email}`, {
      method: "put",
      headers: {
        auth : localStorage.getItem('accessToken')
      }
    })
      .then(res => refetch())
  }
  return (
    <div className="overflow-x-auto mt-10 w-full">
      <table className="table-compact w-full">
        {/* head */}
        <thead>
          <tr>
            
            <th>Avater</th>
            <th>Name</th>
            <th>Email</th>
            <th>Make Admin</th>
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(((user) =>
              <tr className={user.role === "admin" ? "visivle" : "hidden"} key={user._id}>
                
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={user.photoURL} alt='dsdsd' />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td >
                  <button disabled={user.email === 'mdtomiz.official@gmail.com'} onClick={() => removeAdmin(user.email)} className='btn mr-'>Remove Admin</button>
                </td>
                <td>
                  <button className='btn'>Delete</button>
                </td>
              </tr>))
          }
        </tbody>
      </table>

    </div>
  )
}
