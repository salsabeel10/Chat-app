import Message from '../models/message.model.js'
import User from '../models/user.model.js'

export const getUsersForSidebar = async (req, res) => {
  try {
    //get userid from middleware
    const loggedInUser = req.user._id
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      '-password'
    )

    res.status(200).json(filteredUser)
  } catch (error) {
    console.log('error in getUserForSideBar', error.message)
    res.status(500).json({ message: 'internal server error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    //get from params
    const { id: userToChatId } = req.params
    //get from middleware
    const myId = req.user._id

    //select all messages from logged user and receiver
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
    res.status(200).json({ messages })
  } catch (error) {
    console.log('error in getMessages', error.message)
    res.status(500).json({ message: 'internal server error' })
  }
}
