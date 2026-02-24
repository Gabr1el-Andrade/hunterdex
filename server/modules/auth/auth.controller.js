const { login, register } = require("./auth.service");
const { loginSchema, registerSchema } = require("./auth.validation");
async function loginUser(req,res){
 try{
  const parsed = loginSchema.parse(req.body)
  const result = await login(parsed);
  return res.status(200).json(result);

 }catch(error){

  if(error.name==="ZodError")
   return res.status(400).json({error:"Invalid data",details:error.errors});

  if(error.message==="Invalid credentials")
   return res.status(401).json({error:error.message});

  console.error(error);
  return res.status(500).json({error:"Internal server error"});
 }
}

async function registerUser(req,res){
 try{
  const parsed = registerSchema.parse(req.body);

  const user = await register(parsed);

  return res.status(201).json(user);

 }catch(err){

  if(err.name==="ZodError")
   return res.status(400).json({error:"Invalid data",details:err.errors});

  if(err.message==="User already exists")
   return res.status(409).json({error:err.message});

  console.error(err);
  return res.status(500).json({error:"Internal server error"});
 }
}

module.exports = { registerUser, loginUser };