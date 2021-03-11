import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    let decodeData
    if (token) {
      decodeData = jwt.verify(token, 'test')

      req.userId = decodeData?.id
      console.log(req.userId, ' 1-req.userId !')
    }

    next()
  } catch (error) {

  }

}

export default auth