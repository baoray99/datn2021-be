const Role = require('../models/role');
class RoleController {
  //GET all Roles
  getAllRole(req, res, next) {
    Role.find()
      .then((roles) => {
        res.status(200).json(roles);
      })
      .catch(next);
  }
  //GET Role by Id
  getRoleById(req, res, next) {
    Role.findById({ _id: req.params._id })
      .then((role) => {
        res.status(200).json(role);
      })
      .catch(next);
  }
  //POST Role
  createRole(req, res, next) {
    const newRole = new Role({
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
