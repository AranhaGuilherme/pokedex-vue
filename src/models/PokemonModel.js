// PokemonModel.js - model simples para normalizar dados do Pokémon
export class PokemonModel {
  // Recebe o objeto bruto da API e normaliza os campos úteis
  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    // Escolhe a melhor imagem disponível
    this.image = raw.sprites?.other?.["official-artwork"]?.front_default || raw.sprites?.front_default || null;
    // Mapeia os tipos para um array de strings
    this.types = (raw.types || []).map(t => t.type.name);
    this.height = raw.height;
    this.weight = raw.weight;
    // Você pode adicionar mais campos conforme necessário
  }
}
