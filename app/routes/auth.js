const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const router = express.Router();
 
router.post("/register", async (req, res) => {
  const newUser = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [
        { email: newUser.email },
        { bragname: newUser.bragname },
        { phoneNumber: newUser.phoneNumber },
      ],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = new User(newUser);

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({ token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { bragname: identifier },{ phoneNumber: identifier }],
    });
    console.log(identifier, password, user);

    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(409).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      token: token,
      user: user,
    });
    // }
  } catch (err) {
    console.error(err);
    return res
      .status(409)
      .json({ message: "Internal server error!", error: err });
  }
});

module.exports = router;
