<template>
  <!-- Modal de detalhe do Pokémon -->
  <div class="modal" v-if="pokemon">
    <div class="box">
      <h2 class="title">{{ pokemon.name }}</h2>

      <!-- Imagem principal -->
      <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" />

      <!-- Tipos, altura e peso -->
      <p><strong>Tipos:</strong> {{ pokemon.types.join(", ") }}</p>
      <p><strong>Altura:</strong> {{ pokemon.height }}</p>
      <p><strong>Peso:</strong> {{ pokemon.weight }}</p>

      <div class="actions">
        <button @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
// Componente que busca os dados completos do Pokémon pelo nome
import PokemonService from "../services/PokemonService";
import { PokemonModel } from "../models/PokemonModel";

export default {
  props: {
    pokemonName: { type: String, required: true }
  },

  data() {
    return {
      pokemon: null // Aqui guardamos o PokemonModel normalizado
    };
  },

  async mounted() {
    // Busca os dados completos ao montar o componente
    const raw = await PokemonService.getPokemonByName(this.pokemonName);
    this.pokemon = new PokemonModel(raw);
  }
};
</script>

<style scoped>
/* Estilos do modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.box {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  color: #111;
}
.box img { width: 160px; height: 160px; object-fit: contain; }
.title { text-transform: capitalize; margin-bottom: 8px; }
.actions { margin-top: 12px; }
button { padding: 8px 12px; border-radius: 8px; cursor: pointer; }
</style>
