const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessionSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    belongTo: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    name: { type: String, required: true },
    idVideo: { type: String, required: true },
    comments: [
      { type: Schema.Types.ObjectId, ref: 'Comment', required: false },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Lession', lessionSchema);
