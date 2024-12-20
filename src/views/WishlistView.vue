<script setup lang="ts">
import { onMounted, ref, watch,  type Ref  } from 'vue';
import type { Product } from '@/interface/product.interface';
import Button from 'primevue/button';
import { wishlist } from '@/store/wishlist.store';
import router from '@/router';

function goTo(route : string){
    router.push(route);
  }

</script>
<template>
        <h2 class="app-title"> Wishlist</h2>
        <div class="text-center" v-show="!wishlist.products.length">
            <p>Don't have any products on your wishlist?</p>
            <p>Check out our products!</p>
            <Button label="Click Here!" @click="goTo('/')" raised />
        </div>
        <div class="product-list">
            <div v-for="product in wishlist.products" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.description">
                <h3>{{ product.title }}</h3>
                <p>Price: {{ product.price }}</p>
            </div>
        </div>
</template>
<style>
.product-list {
    margin-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    animation: fadeInBottom 1s;
}

.product-card {
    border-radius: 18px;
    border: 1px solid #ccc;
    padding: 20px;
    width: 200px;
    text-align: center;
    img {
        height: 5rem;
        width: 5rem;
    }
}

@media screen and (max-width: 600px) {
    .product-list {
        justify-content: center;
    }
}
</style>