const mongoose = require("mongoose")

const dateSchema = new mongoose.Schema({
    date: String
})


const Date = mongoose.model("Date", dateSchema)

module.exports = Date