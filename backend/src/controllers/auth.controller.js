import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup =async (req, res) => {
  const {fullName,email,password} = req.body;
  try {
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ message: 'All filed must be Required' })
    }
    //check pass length
    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"})
    }
    //check user email
    const user = await User.findOne({email})
    if(user) return res.status(400).json({ message: 'email already exists' })
    //hashing password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create new user
    const newUser = new User({
        fullName,
        email,
        password:hashedPassword
    })

    if(newUser){
        //create a jwt token
        generateToken(newUser._id,res);
        await newUser.save()

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic
        });

    }else{
        return res.status(400).json({message:"invalid user data"})
    }


  } catch (error) {
    console.log("error in signup controller",error.message)
    res.status(500).json({message:"internal server error"})
  }
}

export const login =async (req, res) => {
  const {email,password} = req.body
  try {
    //check user exist
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"invalid credentials"})
    }
    //check password
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'invalid credentials' })
    }

    generateToken(user._id,res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })

  } catch (error) {
    console.log('error in signup controller', error.message)
    res.status(500).json({ message: 'internal server error' })
  }
}

export const logout =(req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: 'Logout SuccessFully' })
  } catch (error) {
    console.log('error in signup controller', error.message)
    res.status(500).json({ message: 'internal server error' })
  }
}
