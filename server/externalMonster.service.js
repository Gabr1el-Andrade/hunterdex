const axios = require('axios');

const API_URL = 'https://mhw-db.com/monsters';

async function fetchMonsters(search) {
  try {
    // 1. Faz a chamada real para a API externa
    const response = await axios.get(API_URL);
    const allMonsters = response.data;

    // 2. Se não houver termo de busca, retorna a lista completa
    if (!search) {
      return allMonsters;
    }

    // 3. Filtra os monstros pelo nome (termo de busca)
    // Usamos toLowerCase() para a busca não diferenciar maiúsculas de minúsculas
    const filteredMonsters = allMonsters.filter(monster => 
      monster.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(`🔍 Filtro aplicado: "${search}". Encontrados: ${filteredMonsters.length}`);
    
    return filteredMonsters;

  } catch (error) {
    console.error("❌ Erro ao buscar monstros na API externa:", error.message);
    throw new Error("Erro ao carregar dados da API");
  }
}

module.exports = { fetchMonsters };