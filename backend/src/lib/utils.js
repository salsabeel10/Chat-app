import jwt from "jsonwebtoken"

export const generateToken =(userId,res)=>{
    //create token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
    //add to cookie
    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !=="development",
    });
    
    return token
}