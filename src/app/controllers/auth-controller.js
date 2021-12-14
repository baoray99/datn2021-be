const User = require('../models/user');
const Course = require('../models/course.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
class AuthController {
  //Register User
  registerUser(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.json({ message: 'Email has already existed!' });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
              res.json({ error: err });
            }
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPass,
              role: req.body.role,
            });
            newUser
              .save()
              .then((user) => {
                res.status(200).json({ message: 'Create User successfully!' });
              })
              .catch(next);
          });
        }
      })
      .catch(next);
  }
  //Login User
  loginUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.json({ error: err });
            }
            if (result) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
                expiresIn: '365d',
              });
              //sign _id de sau nay decode token se tra ve id user
              res.status(200).json({ message: 'Login successfully!', token });
            } else {
              res.status(400).json({ message: 'Password invalid!' });
            }
          });
        }
      })
      .catch(next);
  }
  //GET me
  getMe(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const userDecode = jwtDecode(token);
    User.findById({ _id: userDecode._id })
      .select(
        '_id name birthday gender avatar phone bio facebook instagram youtube role'
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
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
    User.find({ role: role })
      .select(
        '_id name birthday gender avatar phone bio facebook instagram youtube role'
      )
      .then((users) => {
        res.status(200).json(users);
      })
      .catch(next);
  }
  //GET registered course
  getRegisteredCourse(req, res, next) {
    User.findById({ _id: req.params._id })
      .select('registeredCourses')
      .then((courses) => {
        res.status(200).json(courses);
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
  //PUT User courses
  updateRegisteredCourses(req, res, next) {
    Course.findOne({ _id: req.body.courseId })
      .then(() => {
        Course.findByIdAndUpdate(
          req.body.courseId,
          { $inc: { members: 1 } },
          { returnOriginal: false },
          (err, doc) => {
            User.updateOne(
              { _id: req.body.userId },
              {
                $push: {
                  registeredCourses: doc,
                },
              }
            )
              .then((response) => {
                res.status(200).json(response);
              })
              .catch(next);
          }
        );
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
module.exports = new AuthController();
