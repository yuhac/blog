import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Forms = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  })
  const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null)
  const user = JSON.parse(localStorage.getItem('userInfo'))

  const dispatch = useDispatch()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])


  const handleSubmit = () => {
    if (currentId)
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    else
      dispatch(createPost({ ...postData, name: user?.result?.name }))

    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    })
  }

  if (!user?.result?.name) {
    return <><Button type="link" href="/auth">Sign In</Button></>
  }

  return (
    <>
      <div>{`${currentId ? 'edit' : 'add'} Card`}</div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="title"
        >
          <Input name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="message"
        >
          <Input name="message" value={postData.message} onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="tags"
        >
          <Input name="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, [e.target.name]: e.target.value })} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
          <Button type="text" onClick={clear}>
            clear
        </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Forms