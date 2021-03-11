import React from 'react'
import { useDispatch } from 'react-redux'

import { Card, Button } from 'antd'

import './styles.css'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch()


  return (
    <>
      <Card >
        <p>title：{post.title}</p>
        <p>name:：{post.name}</p>
        <p>message：{post.message}</p>
        <p>tags：{post.tags.length && post.tags.map((tag, i) => (
          <span key={i}>#{tag}</span>
        ))}</p>
        <p>createdAt：{post.createdAt}</p>
        <div className="tools">
          <Button className="like" disabled={!user?.result?._id} type="text" onClick={() => dispatch(likePost(post._id))}>Like：{post.likes.length}</Button>
          {
            user?.result?._id === post.creator &&
            <Button type="text" onClick={() => setCurrentId(post._id)}>edit</Button>
          }

          {
            user?.result?._id === post.creator &&
            <Button type="text" onClick={() => dispatch(deletePost(post._id))}>delete</Button>
          }
        </div>
      </Card>
    </>
  )
}

export default Post