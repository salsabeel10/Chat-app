import User from "../models/user.model.js";

export const getUsersForSidebar =async (req,res )=>{
    try {
        //get userid from middleware
        const loggedInUser=req.user._id;
        const filteredUser =await User.find({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json(filteredUser)
    } catch (error) {
        console.log('error in getUserForSideBar', error.message)
        res.status(500).json({ message: 'internal server error' })
    }
}