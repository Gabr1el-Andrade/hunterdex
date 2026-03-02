const { verifyToken } = require("../utils/jwt");

function authMiddleware(req,res,next){

 const authHeader = req.headers.authorization;

 if(!authHeader)
  return res.status(401).json({error:"Token missing"});

 const token = authHeader.split(" ")[1];

 try{
  const decoded = verifyToken(token);
  req.userId = decoded.id;
  next();
 }catch{
  return res.status(401).json({error:"Invalid token"});
 }
}

module.exports = authMiddleware;