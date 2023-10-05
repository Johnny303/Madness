const mongoose = require ("mongoose")

const {Schema} = mongoose

const PositionsSchema = new Schema ({
    name: String,
    salary: Number,
})

module.exports = mongoose.model("Position", PositionsSchema)