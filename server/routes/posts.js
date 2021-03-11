import express from 'express'
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/', getPosts)
router.post('/add', auth, createPost)
router.post('/update/:id', auth, updatePost)
router.post('/delete/:id', auth, deletePost)
router.post('/like/:id', auth, likePost)

export default router