import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { signin, signup } from '../../actions/auth'

import './styles.css'

const initilstae = {
  account: "",
  name: "",
  password: "",
  confirmPassword: ""
}

const Auth = () => {
  const [formData, setFormData] = useState(initilstae)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = () => {
    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
    // 
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div className="auth">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        {
          isSignup &&
          <Form.Item
            label="名称"
          >
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Form.Item>
        }
        <Form.Item
          label="账号"
        >
          <Input name="account" value={formData.account} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="密码"
        >
          <Input.Password name="password" value={formData.password} onChange={handleChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
        {
          isSignup &&
          <Form.Item
            label="重复密码"
          >
            <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
        }

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isSignup ? '注册' : '登录'}
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Button type="text" onClick={() => setIsSignup((prevIsSignUp) => !prevIsSignUp)}>{isSignup ? '登录' : '注册'}</Button>
      </div>
    </div>
  )
}

export default Auth
