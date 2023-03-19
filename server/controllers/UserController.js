import User from "../model/User.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Otp from "../model/Otp.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "you are missing one required Entry" });
  }
  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400).json({ message: "the user already Exists, plz Login" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      message: "Success",
      id: user._id,
      name: user.name,
      email: user.email,
      token: getToken(user._id),
    });
  }
});


export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Success",
      id: user._id,
      name: user.name,
      email: email,
      token: getToken(user._id),
    });
  }
  else {
    res.status(400).json({ message: "Invalid Credientials" });
  }
});

const getToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("🚀 ~ file: UserController.js:64 ~ forgotPassword ~ email:", email)
  const user = await User.findOne({ email });

  if (user) {
    const otp = Otp.create({
      email: email,
      otp: Math.floor(Math.random() * 10000),
      expiredIn: new Date().getTime() + 300 * 1000,
    });
    const transpoter = nodeMailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });
    const options = {
      from: process.env.email,
      to: process.env.reciver_email,
      subject: "Reset your Password",
      text: `${otp}`,
    };

    transpoter.sendMail(options, (info, err) => {
      if (err) {
        return res.status(404).json(err);
      }
    });
    res.send(user)
  } else {

    return res.status(404)
      .json({ message: "User Not Found, Enter Email again" });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword, newPassword2 } = req.body;
  if (newPassword === newPassword2) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const { otp } = req.body;
    const otpVerified = await Otp.findOne({ otp });
    const timeNow = new Date().getTime();
    const diff = otpVerified?.expiredIn - timeNow;
    let otpAlive;

    if (diff < 0) {
      otpAlive = false;
    }
    else {
      otpAlive = true;
    }
    if (otpVerified && otpAlive) {
      const user = await User.findByIdAndUpdate(req.params.id, hashedPassword);
      if (user) {
        return res.status(200).json({
          message: "Success",
          id: user._id,
          name: user.name,
          email: user.name,
          token: getToken(req.params.id),
        });
      }
    }
    else {

      return res.status(400).json({ message: "Wrong Otp, Retry" });
    }
  }
  else {

    return res.status(400).json({ message: "Passwords did no Matched, Retry" });
  }
};

export const getMe = async (req, res) => {
  const { id, name, email } = await User.findOne(req.params.id);

  return res.status(200).json({ id: id, name: name, email: email });
};

export const deleteAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    await User.remove({}, () => console.log("success"));
  }
  catch (error) {

    return res.status(400).json({ message: error.message });
  }
});
