<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  
  <NavBar></NavBar>
  <div class="main-container">
    <RouterView v-slot="{ Component }">
      <Transition  name="fade" mode="out-in">
        <div :key="$route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>

.main-container{
  padding-top: 5rem;
  max-width: 100vw;
  min-height: calc(100vh - 100px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
