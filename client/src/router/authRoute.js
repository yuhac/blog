import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from './routes'



const AuthRoute = () => {
  const userInfo = useSelector(state => state.auth.authData) || JSON.parse(localStorage.getItem("userInfo"))

  return (
    <>
      {routes.map((item, index) => {
        return <Route key={index} path={item.path} exact component={props =>
        (
          !item.auth ? (<item.component {...props} />) :
            (userInfo?.token ? <item.component {...props} /> :
              <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
        )
        } />
      })}
    </>
  )
}

export default AuthRoute