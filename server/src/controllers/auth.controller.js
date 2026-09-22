import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  //recieve the payload
  const { name, email, password, confirmPassword } = req.body
  try {
    //check if email exist 
    const isUserAlreadyExists = await userModel.findOne({email})

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this email address",
        errors: [
          {
            path: "email",
            msg:"User already exists with this email address"
          }
        ]
      })
    }

    //check if password and confirmPassword are same
    if (!password === confirmPassword) {
      
    }

    //if not create user
    const user = await userModel.create({
      name,
      email,
      
    })

  } catch (error) {
    
  }
}