<template>
  <!-- Card simples que exibe a imagem e o nome do Pokémon -->
  <div class="card" @click="$emit('click')">
    <img v-if="image" :src="image" :alt="name" />
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  // Props recebidas do componente pai
  props: {
    name: { type: String, required: true },
    image: { type: String, required: false }
  }
};
</script>

<style scoped>
/* Estilos locais para o card */
.card {
  width: 140px;
  background: #ffffff10;
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform .12s ease;
  text-transform: capitalize;
}
.card:hover { transform: translateY(-4px); }
.card img { width: 100px; height: 100px; object-fit: contain; }
.name { margin: 8px 0 0; font-weight: 600; }
</style>
