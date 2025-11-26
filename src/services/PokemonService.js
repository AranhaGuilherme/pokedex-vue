// PokemonService.js - funções que consultam a PokéAPI
import { api } from "./api";

// Este serviço retorna uma lista de pokémons (com nome e imagem)
// e também pode retornar dados detalhados por nome.
export default {
  // Busca lista paginada de pokémons e retorna { name, image }
  async getPokemons(offset = 0, limit = 20) {
    // Requisição principal que retorna apenas nome e url de detalhes
    const response = await api.get(`pokemon?offset=${offset}&limit=${limit}`);

    // Para cada resultado, buscamos os detalhes (para pegar a imagem)
    const list = await Promise.all(
      response.data.results.map(async (p) => {
        const r = await api.get(p.url);
        return {
          name: p.name,
          // Seleciona a imagem oficial (artwork)
          image: r.data.sprites.other?.["official-artwork"]?.front_default || r.data.sprites.front_default
        };
      })
    );

    return list;
  },

  // Busca dados completos de um Pokémon pelo nome
  async getPokemonByName(name) {
    const response = await api.get(`pokemon/${name}`);
    return response.data;
  }
};
