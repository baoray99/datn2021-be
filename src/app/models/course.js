const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const courseSchema = new Schema(
  {
    belongToId: { type: String, required: true },
    belongTo: { type: Object, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    } /* unique tạo ra duy nhất 1 slug và ko để trùng*/,
    rating: { type: Number, required: false, default: 0 },
    members: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Course', courseSchema);
