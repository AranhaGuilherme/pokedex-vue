<template>
  <div class="list">
    <h1>Pokedéx</h1>

    <!-- Contêiner de cards -->
    <div class="cards">
      <!-- Renderiza cada Pokémon como um card.
           Os comentários explicativos ficam fora das props para evitar problemas. -->
      <PokemonCard
        v-for="p in pokemons"
        :key="p.name"
        :name="p.name"
        :image="p.image"
        @click="selectPokemon(p.name)"
      />
    </div>

    <!-- Paginação simples -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 0">Anterior</button>
      <button @click="nextPage">Próximo</button>
    </div>

    <!-- Modal de detalhe (aparece apenas se selectedPokemon não for null) -->
    <PokemonDetail
      v-if="selectedPokemon"
      :pokemonName="selectedPokemon"
      @close="selectedPokemon = null"
    />
  </div>
</template>

<script>
// Componente que organiza a listagem e paginação
import PokemonService from "../services/PokemonService";
import PokemonCard from "./PokemonCard.vue";
import PokemonDetail from "./PokemonDetail.vue";

export default {
  components: { PokemonCard, PokemonDetail },

  data() {
    return {
      pokemons: [],       // lista atual de exibição ({name, image})
      page: 0,            // número da página (0 = primeira)
      limit: 20,          // quantos por página
      selectedPokemon: null // nome do Pokémon selecionado para mostrar detalhe
    };
  },

  async mounted() {
    // Carrega a primeira página ao montar
    await this.loadPokemons();
  },

  methods: {
    // Busca pokémons na API via service com paginação
    async loadPokemons() {
      this.pokemons = await PokemonService.getPokemons(this.page * this.limit, this.limit);
    },

    // Incrementa página e recarrega
    async nextPage() {
      this.page++;
      await this.loadPokemons();
    },

    // Decrementa página (se não for a primeira) e recarrega
    async prevPage() {
      if (this.page > 0) {
        this.page--;
        await this.loadPokemons();
      }
    },

    // Define o Pokémon selecionado (abre modal)
    selectPokemon(name) {
      this.selectedPokemon = name;
    }
  }
};
</script>

<style scoped>
/* Estilos básicos para a listagem */
.list { padding: 20px; color: white; }
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
}
.pagination {
  margin-top: 16px;
}
button { padding: 8px 12px; border-radius: 8px; cursor: pointer; }
</style>
