import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from '../../actions/posts'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'


const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (
    <>
      <div className="title">
        {/* title */}
      </div>
      <div className="content">
        <div className="posts"><Posts setCurrentId={setCurrentId} /></div>
        <div className="form"><Form currentId={currentId} setCurrentId={setCurrentId} /></div>
      </div>
    </>
  )
}

export default Home