import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_WORD = process.env.JWT_SECRET;

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone Number is required" });
    }
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }
    if (!answer) {
      return res
        .status(400)
        .json({ success: false, message: "Secret answer is required" });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }

    //register new user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET_WORD);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        date: user.date,
        role: user.role,
      },
      authToken: authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    if (!JWT_SECRET_WORD) {
      return res.status(404).json({
        success: false,
        message: "sectretword now found",
      })
    }
    const { email, password } = req.body;

    //checking if email / pass is empty.
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    console.log(JWT_SECRET_WORD);
    // Checking if account already exists:
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    //checking if password matches or not
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    // getting the auth token
    const authToken = jwt.sign(data, JWT_SECRET_WORD);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        date: user.date,
        role: user.role,
      },
      authToken: authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

export const forgotPassController = async (req, res) => {
  try {
    const { email, answer, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!answer) {
      return res
        .status(400)
        .json({ success: false, message: "Secret answer is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const user = await userModel.findOne({ email, answer });
    const hashed = await hashPassword(password);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "updated password successfully",
      user: {
        name: user.name,
        email: user.email,
        date: user.date,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
      error: error,
      success: false,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Route");
};
