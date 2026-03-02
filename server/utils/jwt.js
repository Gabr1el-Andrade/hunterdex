const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "dev_secret";

function generateToken(user){
 return jwt.sign(
  { id:user.id },
  SECRET,
  { expiresIn:"1d" }
 );
}

function verifyToken(token){
 return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };