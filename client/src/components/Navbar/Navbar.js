import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import decode from 'jwt-decode'

import { Button } from 'antd'


import { logout } from '../../actions/auth'
import { useHistory, useLocation } from 'react-router'




const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout(history));

    setUser(null)
  };


  useEffect(() => {
    // const token = user?.token;

    // if (token) {
    //   const decodedToken = decode(token);
    //   console.log(decodedToken)
    //   if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    // }

    setUser(JSON.parse(localStorage.getItem('userInfo')));
  }, [location])

  return (
    <>
      {
        user ?
          <div>
            <p>name：{user?.result?.name}</p>
            <Button type="link" onClick={handleLogout} >logout</Button>
          </div> : null

      }
    </>
  )
}

export default Navbar