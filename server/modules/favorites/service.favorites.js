const prisma = require("../../prisma").default;
const { getById } = require("../monster/monster.service");

async function add(userId, monsterId){

 if(!userId || !monsterId)
  throw new Error("userId and monsterId are required");

 const monster = await getById(monsterId);
 if(!monster)
  throw new Error("Monster not found");

 try{
  return await prisma.favorite.create({
   data:{
    userId,
    monsterId:String(monsterId)
   }
  });
 }catch(err){
  if(err.code==="P2002")
   throw new Error("Already favorited");
  throw err;
 }
}

async function remove(userId, monsterId){

 if(!userId || !monsterId)
  throw new Error("userId and monsterId are required");

 return prisma.favorite.delete({
  where:{
   userId_monsterId:{
    userId,
    monsterId:String(monsterId)
   }
  }
 });
}

async function list(userId){

 if(!userId)
  throw new Error("userId is required");

 return prisma.favorite.findMany({
  where:{ userId }
 });
}

module.exports = { add, remove, list };