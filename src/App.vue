<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

//set sessions
import { user } from './store/user.store';
import { cart } from './store/cart.store';
import { wishlist } from './store/wishlist.store';
import { onMounted } from 'vue';

function getUserSession(){
  if(!user.token){
    let s= localStorage.getItem('user');
    if(s){
      let sessionUser = JSON.parse(s);
      user.user = sessionUser.user;
      user.token = sessionUser.token;;
    }
  }
}

function getCartSession(){
  if(!cart.products.length){
    let s= localStorage.getItem('cart');
    if(s){
      let sessionCart = JSON.parse(s);
      cart.products = sessionCart;
    }
  }
}

function getWishSession(){
  if(!wishlist.products.length){
    let s= localStorage.getItem('wish');
    if(s){
      let sessionWishlist = JSON.parse(s);
      wishlist.products = sessionWishlist;
    }
  }
}
  getUserSession();
  getCartSession();
  getWishSession();


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
