const { Notification } = require("../models/models");

const createNotification = async (receiverId, reportId, message) => {
  try {
    const notification = new Notification({
      receiver: receiverId,
      receiver: receiverId,
      reportId: reportId,
      message: message,
      read: false,
    });
    await notification.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = createNotification;
