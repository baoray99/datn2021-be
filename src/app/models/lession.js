const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessionSchema = new Schema(
  {
    belongToId: { type: String, required: true },
    belongTo: { type: Object, required: true },
    name: { type: String, required: true },
    videoLink: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Lession', lessionSchema);
