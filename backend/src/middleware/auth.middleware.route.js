import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ message: 'unauthorized token or no token' })
    }
    //decode token
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if (!decode) {
      return res
        .status(401)
        .json({ message: 'unauthorized token - invalid token' })
    }

    const user = await User.findById(decode.userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }
    //send user data to next
    req.user = user
    next()
  } catch (error) {
    console.log('error in protect route', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
