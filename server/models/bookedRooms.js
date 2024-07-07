const mongoose = require("mongoose")

const bookedRoomsSchema = new mongoose.Schema({
    price: Number,
    link: String,
    id: String,
    rating: Number,
    roomStatus: String,
    date:String,
    firstName: String,
    lastName: String
})

const BookedRoom = mongoose.model("BookedRoom", bookedRoomsSchema)

module.exports = BookedRoom