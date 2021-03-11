import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: String,
  account: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String }
})

const User = mongoose.model('User', userSchema)

export default User