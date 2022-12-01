const bcrypt = require("bcryptjs");

const UserModel = require("../../model/user.Model");

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;

  const check = await UserModel.findOne({ email });

  if (check == null) {
    return res.send({
      message: "user is not exits, please create a new account",
      status: false,
    });
  }
  const hash = check.password;
  bcrypt.compare(password, hash, function (err, status) {
    if (err) {
      return res.send({
        message: "something is error, please try again later",
        status: false,
      });
    }
    if (!status) {
      return res.send({
        message: "Invalid Credential",
        status: false,
      });
    }
    next();
  });
};
module.exports = loginValidator;
