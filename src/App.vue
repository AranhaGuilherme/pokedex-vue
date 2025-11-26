<template>
  <!-- App raiz: exibe a lista principal -->
  <div id="app">
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from "./components/PokemonList.vue";

export default {
  components: { PokemonList }
};
</script>

<style>
/* Estilos globais simples */
#app {
  min-height: 100vh;
  background: linear-gradient(180deg, #0f1724 0%, #111827 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  padding: 20px;
  box-sizing: border-box;
}
</style>
