import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// ✅ User Registration
const userRegister = asyncHandler(async (req, res) => {
  const {
    full_name,
    email,
    password,
    batch,
    faculty,
    member_type,
    mobile_no,
    registration_no,
    gender,
  } = req.body;

  // Validate Required Fields
  if (!email || !password ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled!" });
  }

  // Check if Email Already Exists
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    return res
      .status(409)
      .json({ message: "User already exists with the given email!" });
  }

  // Hash Password Before Storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create New User
  const user = await User.create({
    full_name,
    email,
    password: hashedPassword,
    batch,
    faculty,
    member_type,
    mobile_no,
    registration_no,
    gender,
  });

  if (user) {
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        mobile_no: user.mobile_no,
        registration_no: user.registration_no || "-",
        profile_pic: user.profile_pic || "",
      },
    });
  } else {
    return res.status(500).json({ message: "User registration failed!" });
  }
});


const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if User Exists
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // Validate Password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // Generate JWT Token
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, member_type: user.member_type },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1y" }
  );

  // Send Response
  return res.status(200).json({
    message: "Login successful!",
    token: accessToken,
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      mobile_no: user.mobile_no,
      member_type:user.member_type,
      registration_no: user.registration_no || "-",
      profile_pic: user.profile_pic || "",
    },
  });
});

// ✅ Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both current and new passwords are required!" });
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Incorrect current password!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully!" });
});

// ✅ Update User Profile
const updateProfile = asyncHandler(async (req, res) => {
  const { full_name, mobile_no } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (full_name) user.full_name = full_name;
  if (mobile_no !== undefined) user.mobile_no = mobile_no;
  
  if (req.file) {
    user.profile_pic = req.file.path;
  }

  await user.save();

  return res.status(200).json({
    message: "Profile updated successfully!",
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      mobile_no: user.mobile_no,
      member_type: user.member_type,
      registration_no: user.registration_no || "-",
      profile_pic: user.profile_pic || "",
    },
  });
});

export { userRegister, userLogin, changePassword, updateProfile };
