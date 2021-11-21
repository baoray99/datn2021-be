const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const commentSchema = new Schema(
  {
    userId: { type: String, required: true },
    user: { type: Object, required: true },
    belongToId: { type: String, required: true },
    belongTo: { type: Object, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Comment', commentSchema);
