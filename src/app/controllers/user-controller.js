const User = require('../models/user');
class UserController {
  //GET all Users
  getAllUsers(req, res, next) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  }
  //GET User by Id
  getUserById(req, res, next) {
    User.findById({ _id: req.params._id })
      .then((user) => {
        res.json(user);
      })
      .catch(next);
  }
  //GET Users by RoleId
  getUsersByRoleId(req, res, next) {
    User.find({ roleId: req.params.roleId })
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  }
  //POST a new User
  createUser(req, res, next) {
    const newUser = new User({
      name: req.body.name,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId,
    });
    newUser
      .save()
      .then((user) => {
        res.json({ message: 'Created new User successfully!' }, user);
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
        res.json({ message: 'Updated User successfully!' }, user);
      })
      .catch(next);
  }
  //DELETE User
  deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params._id })
      .then(() => {
        res.json({ message: 'Delete User successfully!' });
      })
      .catch(next);
  }
}
module.exports = new UserController();
