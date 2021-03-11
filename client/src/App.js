import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthRoute from "./router/authRoute"

import 'antd/dist/antd.css'
import './app.css'

import Navbar from "./components/Navbar/Navbar";


const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <AuthRoute />
      </Switch>
    </Router>
  )
}

export default App