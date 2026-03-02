const axios = require("axios");

const API = "https://mhw-db.com/monsters";

let cache = null;
let lastFetch = 0;
const CACHE_TIME = 1000 * 60 * 10; // 10min

async function getAll(){

 if(cache && Date.now() - lastFetch < CACHE_TIME)
  return cache;

 const res = await axios.get(API);

 cache = res.data;
 lastFetch = Date.now();

 return cache;
}

async function getById(id){
 const monsters = await getAll();
 return monsters.find(m => m.id == id);
}

async function search(name){
 const monsters = await getAll();
 return monsters.filter(m =>
  m.name.toLowerCase().includes(name.toLowerCase())
 );
}

// busca um monstro na API externa e salva/atualiza no banco
async function saveById(id) {
  const monsterFromApi = await getById(id);
  if (!monsterFromApi) {
    throw new Error("Monster not found in external API");
  }

  const data = {
    id: String(id),
    name: monsterFromApi.name,
    type: monsterFromApi.type || "",
    element: monsterFromApi.element ? monsterFromApi.element.toUpperCase() : "NONE",
    weakness: (monsterFromApi.weaknesses || [])
      .map(w => w.element)
      .join(","),
    description: monsterFromApi.description || "",
    image: monsterFromApi.image || "",
  };

  const prisma = require("../../prisma").default;
  const monster = await prisma.monster.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });

  return monster;
}

module.exports = { getAll, getById, search, saveById };