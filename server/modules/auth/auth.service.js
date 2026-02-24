// use shared Prisma client instance instead of config
const prisma = require("../../prisma").default;
const bcrypt = require("bcrypt");

async function register(data){

  if(!data.email || !data.password || !data.username)
    throw new Error("Missing fields");

  const exists = await prisma.user.findFirst({
    where:{
      OR:[
        { email:data.email },
        { username:data.username }
      ]
    }
  });

  if(exists)
    throw new Error("User already exists");
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data:{
      username:data.username,
      email:data.email,
      password:hashed
    },
    select:{
      id:true,
      username:true,
      email:true,
      createdAt:true
    }
  });

  return user;
}

async function login(data){
 const user = await prisma.user.findUnique({
  where:{ email:data.email }
 });

 if(!user)
  throw new Error("Invalid credentials");

 const valid = await bcrypt.compare(data.password,user.password);

 if(!valid)
  throw new Error("Invalid credentials");

 return {
  id:user.id,
  email:user.email,
  username:user.username
 };
}

module.exports = { register, login };