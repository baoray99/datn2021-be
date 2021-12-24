const Role = require('../models/role');
const mongoose = require('mongoose');
class RoleController {
  //GET all Roles
  getAllRole(req, res, next) {
    Role.find()
      .select('name slug')
      .then((roles) => {
        res.status(200).json(roles);
      })
      .catch(next);
  }
  //GET Role by Id
  getRoleById(req, res, next) {
    Role.findById({ _id: req.params._id })
      .select('name slug')
      .then((role) => {
        res.status(200).json(role);
      })
      .catch(next);
  }
  //GET Users by Role
  getUserByRole(req, res, next) {
    Role.findOne({ slug: req.query.role })
      .populate('users', 'name')
      .select('users')
      .then((users) => {
        res.status(200).json(users);
      })
      .catch(next);
  }
  //POST Role
  createRole(req, res, next) {
    const newRole = new Role({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    });
    newRole
      .save()
      .then((role) => {
        res.status(200).json(role);
      })
      .catch(next);
  }
  //PUT Role
  updateRole(req, res, next) {
    Role.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
        },
      }
    )
      .then((role) => {
        res.status(200).json(role);
      })
      .catch(next);
  }
  //DELETE Role
  deleteRole(req, res, next) {
    Role.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).json({ message: 'Delete Role successfully!' });
      })
      .catch(next);
  }
}
module.exports = new RoleController();
