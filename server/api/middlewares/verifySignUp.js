const db = require("../../models");
const ROLES = db.ROLES;
const User = db.user;

var checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

var checkRolesExisted = (req, res, next) => {
  if (req.body.userRols) {
    for (let i = 0; i < req.body.userRols.length; i++) {
      if (!ROLES.includes(req.body.userRols[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.userRols[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
