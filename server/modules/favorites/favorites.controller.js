const service = require("./service.favorites");

async function addFavorite(req,res){
 try{
  const favorite = await service.add(req.userId, req.params.id);
  return res.status(201).json(favorite);
 }catch(err){
  console.error(err);
  return res.status(err.status || 400).json({error:err.message});
 }
}

async function removeFavorite(req,res){
 try{
  await service.remove(req.userId, req.params.id);
  return res.status(204).send();
 }catch(err){
  console.error(err);
  return res.status(err.status || 400).json({error:err.message});
 }
}

async function listFavorites(req,res){
 try{
  const favorites = await service.list(req.userId);
  return res.json(favorites);
 }catch(err){
  console.error(err);
  return res.status(err.status || 400).json({error:err.message});
 }
}

module.exports = { addFavorite, removeFavorite, listFavorites };