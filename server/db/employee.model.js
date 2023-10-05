// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: Number,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: Boolean,
  equipment: String,
  brand: {type: Schema.Types.ObjectId, ref: "Brand"},
  workLog: [{hours: Number, label: String}]


});

module.exports = mongoose.model("Employee", EmployeeSchema);
