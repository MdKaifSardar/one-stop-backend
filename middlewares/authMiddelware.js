import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
// import dotenv from 'dotenv';
// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET_WORD;


//jwt verification:
export const requireSignIn = (req, res, next) => {
  const token = req.header('authorisation');
  if(!token){
    res.status(401).send({error: "Please authenticate using a valid token"});
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(404).send({error: "server error"});
  }
};


//admin verification:
export const isAdmin = async (req, res, next) => {
  const {userId} = req.fields;
  try {
    const user = await userModel.findById(userId);
    if(user){
      if (user.role === 1) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access hehe",
        });
      }
    }
    else{
      return res.status(404).json({
        message: "user not found",
        success: false,
      })
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
        success:false,
        message:"Error in Admin middleware",
        error: error.message,
    })
  }
};
