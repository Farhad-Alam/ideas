import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      public_id: String,
      url: String,
    },
    name: {
      type: String,
      required: [true, "Please enter Your Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter Your Email"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter Your Password"],
      minlength: [6, "Password must be greater than 6 character"],
      select: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.isPassMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export const User = mongoose.model("User", UserSchema);
