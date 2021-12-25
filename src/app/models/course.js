const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const courseSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: {
      type: String,
      required: false,
      default:
        'https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-6/257381852_2063613163807356_6047570001632965703_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=RAbrfAuy2i8AX9BAPz4&_nc_ht=scontent.fdad2-1.fna&oh=930fc5be40cd09a5cbe3bcd9d1b3a824&oe=61A3430E',
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      slugOn: {
        save: true,
        update: true,
        updateOne: true,
        updateMany: true,
        findOneAndUpdate: true,
      },
    } /* unique tạo ra duy nhất 1 slug và ko để trùng*/,
    rating: { type: Number, required: false, default: 0 },
    totalMember: { type: Number, required: false, default: 0 },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    lessions: [
      { type: Schema.Types.ObjectId, ref: 'Lession', required: false },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Course', courseSchema);
