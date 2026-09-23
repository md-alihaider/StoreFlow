import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

export const registerUser = async (req, res) => {
  //recieve the payload
  const { name, email, password, confirmPassword } = req.body;
  try {
    //check if email exist
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
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
    });

    //save and update in db
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

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
    console.log(`Error in register user : ${error}`);
  }
};
