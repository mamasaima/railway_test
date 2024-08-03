const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = (title, body, topic) => {
  const fcm = admin.messaging();

  const message = {
    notification: {
      title: title,
      body: body,
    },
    topic: topic,
  };

  return fcm.send(message);
};

module.exports = sendNotification;
