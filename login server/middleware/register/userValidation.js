const UserModel = require("../../model/user.Model");
const userValidation = async (req, res, next) => {
  var { email } = req.body;
  var role;
  const check = await UserModel.findOne({ email });
  if (check !== null) {
    return res.send({
      message: "user is alredy exist or try different email address",
      status: false,
    });
  }

  var isAdmin = email?.split("@")[1]?.split(".")[0];
  if (isAdmin == "codiis") {
    role = "admin";
  } else {
    role = "user";
  }
  req.body.role = role;
  next();
};
module.exports = userValidation;
