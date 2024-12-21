<script setup lang="ts">
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
                <h3 class="title-ellipsis mb-5">{{ product.title }}</h3>
                <p class="mb-5">Price: {{ product.price }}</p>
                <div>
                    <Button icon="pi pi-trash" aria-label="Remove to Wishlist" raised  @click="wishlist.addRemoveWish(product)"/>
                    <Button icon="pi pi-eye" aria-label="See Detail" raised  @click="goTo('detail/'+product.id)"/>
                </div>

            </div>
        </div>
</template>
<style scoped>

.mb-5{
    margin-bottom: 5px;
}
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
    width: 15%;
    min-width: 15rem;
    text-align: center;
    img {
        height: 5rem;
        width: 5rem;
        object-fit: contain;

    }
    button {
      margin: 0px 5px 0px 5px;
    }
}

@media screen and (max-width: 600px) {
    .wish-product-list {
        justify-content: center;
    }

    .wish-product-card {
        width: 80%;
    }
}
</style>