const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  bio: {
    type: String,
    default:
      "Sharing my journey of success and joy on Bragtime! Let's inspire and be inspired.",
  },
  workOrSchool: String,
  bragname: {
    type: String,
    lowercase: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  deviceAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  countryFrom: {
    type: String,
    default: "",
  },
  countryLiving: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 1,
  },
  wins: {
    type: Number,
    default: 0,
  },
  creditCard: {
    type: Object,
    default: null,
    cardNumber: {
      type: String,
    },
    cardHolderName: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    cvc: {
      type: String,
    },
  },
  loses: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/bragtime-d87ef.appspot.com/o/profilePic%2FProfilePictureUploadersd.jpg?alt=media&token=5bdb3f47-f110-4ae4-9ff9-c2841d27db00",
  },
  banner: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/bragtime-d87ef.appspot.com/o/profilePic%2FProfilePictureUploadersd.jpg?alt=media&token=5bdb3f47-f110-4ae4-9ff9-c2841d27db00",
  },
  bio: {
    type: String,
    default: "",
  },
  school: {
    type: String,
    default: "",
  },
  work: {
    type: String,
    default: "",
  },
  metamaskWalletAddress: {
    type: String,
    default: null,
  },
  languages: [String],
  preferences: {
    type: [String],
    enum: ["Challenges", "Channels", "Events", "Groups", "Snapshots", "NFTs"],
    default: [],
  },
  preferences: {
    type: [String],
    default: [],
  },
  interests: [String],
  bragtoken: {
    type: Number,
    default: "",
  },
  paymentType: String,
  nfts: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  snapshots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snapshot" }],
  // following 4 feilds should not be in other collections
  stripePayment: [{ type: mongoose.Schema.Types.ObjectId, ref: "stripe" }],

  bankAccount: {
    accountNumber: { type: String, default: "" },
    routingNumber: { type: String, default: "" },
    bankName: { type: String, default: "" },
    accountHolderName: { type: String, default: "" },
  }, // ***
  transactionHistory: [
    {
      type: {
        type: String,
        enum: ["stripe", "metamask", "bank", "card"],
        required: true,
      },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],
  friendCount: { type: Number, default: 0 },
  supporters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  supporterCount: { type: Number, default: 0 },
  supporting: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  supportingCount: { type: Number, default: 0 },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

module.exports = mongoose.model("User", userSchema);
