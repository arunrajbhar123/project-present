const UserModel = require("../model/user.Model");
const jwt = require("jsonwebtoken");
const isAdmin = async (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, "codiis", async function (err, email) {
    if (err) {
      return res.send({ message: "something is wrong", status: false });
    } else {
      const data = await UserModel.findOne({ email });
    
      //   if (data.role !== "admin") {
      //     return res.status(401).send({ message: "Unauthorized", status: false });
      //   } else {
      req.body.name = data?.firstname;
      req.body.email = data?.email;
      req.body.plan_id = data?.plan_id;
      req.body.role = data?.role;

      next();
      //   }
    }
  });
};
module.exports = isAdmin;
