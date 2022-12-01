var jwt = require("jsonwebtoken");
const tokenSign = (req, res, next) => {
  const { email } = req.body;
  jwt.sign(email, "codiis", function (err, token) {
    if (err) {
      return res.send({
        message: "something is error, please try again later",
        status: false,
      });
    }
    req.body.token = token;
    next();
  });
};
module.exports = tokenSign;
