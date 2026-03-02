const service = require("./monster.service");

async function list(req,res){
 // Normaliza e trima o termo de busca (q ou search)
 const term = (req.query.q || req.query.search || "").toString().trim();
 if (term) {
  const data = await service.search(term);
  return res.json(data);
 }

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
 const term = (req.query.q || req.query.search || "").toString().trim();

 if (!term)
  return res.json([]);

 const data = await service.search(term);
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