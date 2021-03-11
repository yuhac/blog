import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
  const { account, password } = req.body

  try {
    const existingUser = await User.findOne({ account })

    if (!existingUser) return res.status(404).json({ message: "用户不存在！" })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) return res.status(404).json({ message: "登录无效" })

    const token = jwt.sign({ account: existingUser.account, id: existingUser._id }, 'test', { expiresIn: "1h" })

    res.status(200).json({ token, result: existingUser })
  } catch (error) {
    res.status(500).json({ message: "服务器出错" })
  }
}

export const signup = async (req, res) => {
  const { account, name, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ account })
    if (existingUser) return res.status(404).json({ message: "用户已存在！" })

    if (password !== confirmPassword) return res.status(404).json({ message: "两次密码输入不一致！" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({ account, password: hashedPassword, name })

    const token = jwt.sign({ account: result.account, id: result._id }, 'test', { expiresIn: "1h" })

    res.status(200).json({ token, result })
  } catch (error) {
    res.status(500).json({ message: "服务器出错" })
  }
}
