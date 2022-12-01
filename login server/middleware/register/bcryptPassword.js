const bcrypt = require("bcryptjs");
const bCryptPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.send({
        message: "something is error, please try again later",
        status: false,
      });
    }
    req.body.password = hash;
    next();
  });
};

module.exports = bCryptPassword;
