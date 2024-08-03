const express = require("express");
const router = express.Router();
const { User, Report, Notification } = require("../models/models");

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-profile", async (req, res) => {
  const userId = req.userId;
  const { fullName, email, mobileNumber, address } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        mobileNumber,
        address,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
});


router.get('/notifications', async (req, res) => {
  const userId = req.userId;
  try {
    const notifications = await Notification.find({ receiver: userId }).sort({ createdAt: -1 });
    return res.json({ notifications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
