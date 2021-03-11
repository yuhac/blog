import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/Post'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector(state => state.posts)

  return (
    posts.length ? (
      posts.map(post => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))
    ) : null
  )
}

export default Posts