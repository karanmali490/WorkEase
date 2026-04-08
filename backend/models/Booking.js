const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  service: String,
  problem: String,
  address: String,
  phone: String,

  // 📅 booking date by user
  bookingDate: Date,

  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending"
  },

  // 🔥 WORK DONE DATA
  workDescription: String,
  workDate: String,
  cost: Number,
  completedAt: Date,

  // ⭐ FEEDBACK
  feedback:{
    workQuality:Number,
    behaviour:Number,
    timing:Number,
    communication:Number,
    message:String
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);