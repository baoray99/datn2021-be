const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: Boolean, required: true },
    phone: { type: String, maxlength: 10, required: false },
    avatar: { type: String, required: false },
    bio: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, require: false },
    youtube: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
