import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";
import { config } from "../config/config.js";

export const registerUser = async (req, res) => {
  //recieve the payload
  const { name, email, password } = req.body;
  try {
    //check if email exist
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User already exists with this email address",
        errors: [
          {
            path: "email",
            msg: "User already exists with this email address",
          },
        ],
      });
    }

    //if not create user
    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });

    //generate tokens
    const accessToken = createAccessToken({
      userId: user._id,
    });

    const refreshToken = createRefreshToken({
      userId: user._id,
    });

    //save refreshtoken in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: config.COOKIE_SAME_SITE,
    });

    //save and update in db
    user.refreshToken = refreshToken;
    await user.save();

    //send res
    res.status(201).json({
      message: "User register successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(`Error in register user: ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  //recieve the payload
  const { email, password } = req.body;
  try {
    //check if email exist
    const user = await userModel.findOne({ email });
    //if not send error
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    //if not send error
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //generate new tokens
    const accessToken = createAccessToken({
      userId: user._id,
    });

    const newRefreshToken = createRefreshToken({
      userId: user._id,
    });

    //update refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    //save refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: config.COOKIE_SAME_SITE,
    });

    //send res
    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(`Error in login user: ${error}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refresh = async (req, res) => {};

export const logoutUser = async (req, res) => {};

export const getMe = async (req, res) => {};
