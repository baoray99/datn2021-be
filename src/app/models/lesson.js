const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lessonSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    name: { type: String, required: true },
    video_id: { type: String, required: true },
    comments: [
      { type: Schema.Types.ObjectId, ref: 'Comment', required: false },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Lesson', lessonSchema);
