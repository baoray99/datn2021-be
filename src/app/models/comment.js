const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const commentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lesson_id: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Comment', commentSchema);
