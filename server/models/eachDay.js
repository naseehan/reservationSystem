const mongoose = require("mongoose")

const eachDaySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    link: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    roomStatus: { type: String },
    date: { type: String }
})

const EachDay = mongoose.model("EachDay", eachDaySchema)

module.exports = EachDay