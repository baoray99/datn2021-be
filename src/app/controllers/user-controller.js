const User = require('../models/user');
class UserController {
  //GET all Users
  getAllUsers(req, res, next) {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch(next);
  }
  //GET User by Id
  getUserById(req, res, next) {
    User.findById({ _id: req.params._id })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  //GET Users by RoleId
  getUsersByRole(req, res, next) {
    const role = req.query.role;
    User.find({ role: new RegExp(q, 'i') })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch(next);
  }
  //POST a new User
  createUser(req, res, next) {
    const newUser = new User({
      name: req.body.name,
      birthday: req.body.birthday,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    newUser
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  //PUT User
  updateUser(req, res, next) {
    User.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          birthday: req.body.birthday,
          gender: req.body.gender,
          phone: req.body.phone,
          avatar: req.body.avatar,
          bio: req.body.bio,
          facebook: req.body.facebook,
          instagram: req.body.instagram,
          youtube: req.body.youtube,
        },
      }
    )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  //DELETE User
  deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).json({ message: 'Delete User successfully!' });
      })
      .catch(next);
  }
}
module.exports = new UserController();
