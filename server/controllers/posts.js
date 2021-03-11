import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'


export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPostMessage = new PostMessage({ ...post, creator: req.userId })

  try {
    await newPostMessage.save()

    res.status(200).json(newPostMessage)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const post = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('无法查找到此ID下的信息')

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('无法查找到此ID下的信息')

    await PostMessage.findByIdAndRemove(id)

    res.status(200).json('删除成功')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const likePost = async (req, res) => {
  const { id } = req.params

  try {
    if (!req.userId) return res.json('需要用户登录！')

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('无法查找到此ID下的信息')

    const post = await PostMessage.findById(id)


    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}