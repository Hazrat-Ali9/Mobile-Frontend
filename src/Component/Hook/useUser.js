import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../Firebase/firebase.init'

// User js
const useUser = () => {
  const [user] = useAuthState(auth)
  const [currentUser, setUser] = useState({})
  useEffect(() => {
    if (user) {
      fetch(`https://mobile-collections-backend.vercel.app/users/${user?.email}`, {
        method: 'get',
        headers: {
          auth: localStorage.getItem('accessToken')
        }
      }).then(res => res.json()).then(json => {
        setUser(json)
      }).catch(err => console.log(err))
    }
  }, [user])

  return [currentUser]
}

export default useUser