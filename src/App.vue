<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  
  <NavBar></NavBar>
  <div class="main-container dark-mode">
    <RouterView />
  </div>
</template>

<style scoped>

.main-container{
  max-width: 100vw;
  min-height: calc(100vh - 100px);
  padding-left: 1rem;
}

</style>
