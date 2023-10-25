// const jwt = require("jsonwebtoken");
const User = require("../Model/authModel");
const verifyToken = require("./verifyToken");
// require("dotenv").config();

const Admin = async (req, res, next) => {
  // const token = req.header["Authorization"].split(" ")[1];
  const token =
  req.get("Authorization")?.split("Bearer ")[1] ||
  req.headers["x-access-token"];
  // console.log(token);
  try {
    const decodedToken = await verifyToken(token);
// console.log(decodedToken:"token");
    if (!decodedToken) {
      return res.status(401).send("Unauthorized, Invalid token");
    }

    if (decodedToken.role !== "admin") {
      return res.status(401).send("Unauthorized, You are not Admin");
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).send("Unauthorized, Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).send("Unauthorized, Invalid token");
    } else {
      res.status(401).send("Unauthorized, Something went wrong");
    }
  }
};
module.exports = Admin;

// exports.adminAuthMiddleware = async (req, res, next) => {
//     try {
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             const token = req.headers.authorization.split(' ')[1];
            

//             const { id: adminId } = jwt.verify(token, process.env.JWT_SECRET);
//             console.log(adminId);
//             const currentAdmin = await Admin.findOne({
//                 _id: adminId,
//                 role: 'admin'
//             });

//            console.log(currentAdmin)
//             if (currentAdmin) {
//                 req.user = adminId;
//                 next();
//             } else {
//                 return next(createError(400, 'Unauthorized access'))
//             }

//         } else {
//             return next(createError(400, 'token not provided'))
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             errorName: error.name,
//             errorMessage: error.message
//         })
//     }
// }