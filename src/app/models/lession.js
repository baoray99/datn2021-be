const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessionSchema = new Schema(
  {
    belongTo: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    name: { type: String, required: true },
    idVideo: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Lession', lessionSchema);
