const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    birthday: { type: Date, required: false },
    gender: { type: Boolean, required: false },
    phone: { type: String, maxlength: 10, required: false },
    avatar: {
      type: String,
      required: false,
      default: 'https://www.silcube.com/hubfs/avatars/non-avatar.webp',
    },
    bio: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, require: false },
    youtube: { type: String, required: false },
    registeredCourse: [
      { type: Schema.Types.ObjectId, ref: 'Course', required: false },
    ],
    teachingCourse: [
      { type: Schema.Types.ObjectId, ref: 'Course', required: false },
    ],
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
