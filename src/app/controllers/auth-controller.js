const User = require('../models/user');
const Role = require('../models/role');
const Course = require('../models/course.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');
const mongoose = require('mongoose');
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
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hashedPass,
              role: req.body.role,
            });
            newUser
              .save()
              .then((user) => {
                Role.findByIdAndUpdate(
                  req.body.role,
                  {
                    $push: {
                      users: user,
                    },
                  },
                  { returnOriginal: false },
                  (err, doc) => {}
                );
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
      .populate('role', 'name')
      .select(
        '_id name birthday gender avatar phone bio facebook instagram youtube'
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  //GET my teaching course
  getTeachingCourse(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const userDecode = jwtDecode(token);
    User.findById({ _id: userDecode._id })
      .populate('teaching_courses')
      .select('name')
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
  //GET registered course
  getRegisteredCourse(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const userDecode = jwtDecode(token);
    User.findById({ _id: userDecode._id })
      .populate('registered_courses')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  getPopularCourseWithLogin(req, res, next) {
    const registeredCourses = req.body.registered_courses;
    console.log(registeredCourses);
    Course.find()
      .then((course) => {
        const newArray = _.filter(course, (n) => {
          return !_.some(registeredCourses, (kn) => {
            return n.slug === kn.slug;
          });
        });
        res
          .status(200)
          .json(_.slice(_.orderBy(newArray, 'total_member', 'desc'), 0, 9));
      })
      .catch(next);
  }
  getAllCourseWithLogin(req, res, next) {
    const registeredCourses = req.body.registered_courses;
    Course.find()
      .then((course) => {
        const newArray = _.filter(course, (n) => {
          return !_.some(registeredCourses, (kn) => {
            return n.slug === kn.slug;
          });
        });
        res.status(200).json(newArray);
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
    User.findById(req.body.user_id)
      .then((user) => {
        Course.findByIdAndUpdate(
          req.body.course_id,
          {
            $inc: { total_member: 1 },
            $push: {
              members: user,
            },
          },
          { returnOriginal: false }
        ).then((course) => {
          User.findByIdAndUpdate(
            req.body.user_id,
            { $push: { registered_courses: course } },
            { returnOriginal: false },
            (err, doc) => {}
          );
        });
        res
          .status(200)
          .json('This course has added to your registered courses!');
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
