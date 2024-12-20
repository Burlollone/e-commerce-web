<script setup lang="ts">
import { onMounted, ref, watch,  type Ref, onBeforeUnmount, type WatchHandle } from 'vue';
import type { Product } from '@/interface/product.interface';
import { Card } from 'primevue';

import { categoryStore } from '@/services/category.service';
import { loading } from '@/services/loading.service';
import router from '@/router';

const products = ref<Product[]>([]);

function getProduct(category : string){
  loading.value = true;
  let path = categoryStore.category == 'All' ?  'https://fakestoreapi.com/products' : 'https://fakestoreapi.com/products/category/'+categoryStore.category
  fetch(path)
    .then(res=>res.json())
    .then((data : Product[]) => {
      loading.value = false;
      products.value = data;
    })
    .catch(error =>{
      loading.value = false;
      console.log(error);
    })
}
onMounted(()=>{
    loading.value = true;
    getProduct(categoryStore.category)
});
 // controllo  il ref alle categorie della nav bar per triggherare nuovamente la chiamata al cambio
 watch(categoryStore, () => {
    getProduct(categoryStore.category);
  })


function goToDetail(product : Product){
  router.push('/detail/'+product.id);
}

</script>

<template>
  <!-- <ProgressBar v-if="loading"  mode="indeterminate" style="height: 6px; width: 100vw;"></ProgressBar> -->
  <main>
    <h2 class="app-title">Our Products <span v-if="categoryStore.category != 'All'"> : {{ categoryStore.category }}</span></h2>
    <div class="card-list" :class="loading.value ? 'loading' : 'visible'">
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
  visibility: visible;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 10px;
  justify-items: center;
  .p-card {
    background-color: var(--color-background-soft);
    overflow: hidden;
    margin: 1rem;
    width: 20rem;
    height: 45rem;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    .p-card-header{
      display: flex;
      justify-content: center;
      height: 30rem;
      img {
        max-width: 20rem;
        height: auto;
      };
      
    }
  }
  .p-card:hover{
    cursor: pointer;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);

  }
}

.loading {
  visibility: hidden;
  animation: fadeOutBottom 1s;
}

.visible{
  animation: fadeInBottom 1s;
}

@keyframes fadeInBottom {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to { opacity: 1 }
}
@keyframes fadeOutBottom {
  from {
      opacity: 1;
    }
    to { 
      opacity: 0;
      transform: translateY(100%);
   }
}
</style>