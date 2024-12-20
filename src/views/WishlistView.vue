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
        <div class="text-center fade-in" v-if="!wishlist.products.length">
            <p>Don't have any products on your wishlist?</p>
            <p>Check out our products!</p>
            <Button label="Click Here!" @click="goTo('/')" raised />
        </div>
        <div class="wish-product-list">
            <div v-for="product in wishlist.products" :key="product.id" class="wish-product-card">
                <img :src="product.image" :alt="product.description">
                <h3>{{ product.title }}</h3>
                <p>Price: {{ product.price }}</p>
                <div>
                    <Button icon="pi pi-trash" aria-label="Remove to Wishlist" raised  @click="wishlist.addRemoveWish(product)"/>
                    <Button icon="pi pi-eye" aria-label="See Detail" raised  @click="goTo('detail/'+product.id)"/>
                </div>

            </div>
        </div>
</template>
<style>
.wish-product-list {
    margin-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    animation: fadeInBottom 1s;
}

.wish-product-card {
    border-radius: 18px;
    border: 1px solid #ccc;
    padding: 20px;
    width: 200px;
    text-align: center;
    img {
        height: 5rem;
        width: 5rem;
    }
    button {
      margin: 0px 5px 0px 5px;
    }
}

@media screen and (max-width: 600px) {
    .wish-product-list {
        justify-content: center;
    }
}
</style>