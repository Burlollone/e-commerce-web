<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Product } from '@/interface/product.interface';
import { Card } from 'primevue';

import ProgressBar from 'primevue/progressbar';



const loading = ref (true);
const products = ref<Product[]>([]);

onMounted(
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then((data : Product[]) => {
          console.log('Prodotti')
          loading.value = false;
          products.value = data;
        } )
        .catch(error =>{
            loading.value = false;
            console.log(error);
        })
  );


  function goToDetail(product : Product){
    alert('AL Prodotto');
  }
</script>

<template>
  <ProgressBar v-if="loading"  mode="indeterminate" style="height: 6px; width: 100vw;"></ProgressBar>
  <main>
    <h2 style="margin-left:1rem;">Our Products</h2>
    <div class="card-list" v-if="!loading" >
      <Card v-for="product of products" @click="goToDetail(product)">
          <template #header>
              <img :alt="product.description" :src="product.image" loading="lazy" />
          </template>
          <template #subtitle></template>
          <template #content>
            <h2>{{ product.title }}</h2>
            <h3>price : {{ product.price }}$</h3>
          </template>
      </Card>
    </div>
   
  </main>
</template>

<style>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .p-card {
    background-color: var(--color-background-soft);
    animation: fadeInBottom 1s;
    overflow: hidden;
    margin: 1rem;
    width: 25rem;
    height: 45rem;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    .p-card-header{
      img {
        width: 25rem;
        height: 30rem;
      };
      
    }
  }
  .p-card:hover{
    cursor: pointer;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);

  }
}

@keyframes fadeInBottom {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to { opacity: 1 }
}
</style>