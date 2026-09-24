import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";
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

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required",
    });
  }

  try {
    // Verify and decode the refresh token
    const decoded = readRefreshToken(refreshToken);
    const { userId } = decoded;

    // Find the user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Check if refresh token matches the one stored in DB
    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.COOKIE_SECURE,
        sameSite: config.COOKIE_SAME_SITE,
      });

      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    // Create new tokens
    const accessToken = createAccessToken({ userId });
    const newRefreshToken = createRefreshToken({ userId });

    // Rotate refresh token and save it
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send new refresh token as cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: config.COOKIE_SAME_SITE,
    });

    // Send response
    return res.status(200).json({
      message: "Token rotated successfully",
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
    console.log(`Error in refresh controller: ${error}`);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: config.COOKIE_SAME_SITE,
    });

    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    //recieve refreshtoken from cookie
    const refreshToken = req.cookies.refreshToken;

    //if refreshtoken then find user and make refreshtokne null in db and save
    if (refreshToken) {
      const user = await userModel.findOne({ refreshToken });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    //clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: config.COOKIE_SAME_SITE,
    });

    //send res
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout controller:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel
      .findById(userId)
      .select("-passwordHash -refreshToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
