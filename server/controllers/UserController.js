import { User } from "../models/User.js";
import cloudinary from "cloudinary";

export const userRegister = async (req, res) => {
  try {
    const { email, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!avatar) {
      return res.status(400).send({
        success: false,
        msg: "Please Add ur Image",
      });
    } else if (user) {
      return res.status(400).send({
        success: false,
        msg: "User already exists",
      });
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "Ideas/user",
      });

      user = await User.create({
        ...req.body,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });

      const token = await user.getToken();

      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        })
        .json({
          success: true,
          msg: "User Registered Successfully",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({
        success: false,
        msg: "Invalid Credentials Email",
      });
    }

    const isPassMatch = await user.isPassMatched(password);

    if (!isPassMatch) {
      return res.status(400).send({
        success: false,
        msg: "Invalid Credentials Password",
      });
    }

    const token = await user.getToken();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        msg: "User Logged In Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const userLogout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        msg: "User logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const userProfile = (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
