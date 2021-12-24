const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const roleSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    } /* unique tạo ra duy nhất 1 slug và ko để trùng*/,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Role', roleSchema);
