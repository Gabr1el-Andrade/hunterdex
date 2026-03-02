const service = require("./monster.service");

async function list(req,res){
 const data = await service.getAll();
 res.json(data);
}

async function byId(req,res){
 const monster = await service.getById(req.params.id);

 if(!monster)
  return res.status(404).json({error:"Monster not found"});

 res.json(monster);
}

async function search(req,res){
 const data = await service.search(req.query.q || "");
 res.json(data);
}

// persiste no banco um monstro recuperado pela API externa
async function save(req, res){
 try{
   const monster = await service.saveById(req.params.id);
   res.json(monster);
 }catch(err){
   console.error(err);
   res.status(400).json({ error: err.message || "Unable to save monster" });
 }
}

module.exports = { list, byId, search, save };