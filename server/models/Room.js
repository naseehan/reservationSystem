const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Booked", "Closed For Maintenance"],
      default: "Available",
    },
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema({
  id: { type: Number },
  link: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  availability: [availabilitySchema],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
