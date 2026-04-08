const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  workDescription: String,
  workDate: String,
  cost: Number,

  role: {
    type: String,
    enum: ["user", "admin", "worker"],
    default: "user"
  },

  phone: {
    type: String,
    required: function() {
      return this.role === "worker";
    }
  },

  service: String,

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

module.exports = mongoose.model("User", userSchema);