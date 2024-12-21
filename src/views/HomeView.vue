<script setup lang="ts">
import { onMounted, ref, watch,  type Ref, onBeforeUnmount, type WatchHandle } from 'vue';
import type { Product } from '@/interface/product.interface';
import Button from 'primevue/button';
import { wishlist } from '@/store/wishlist.store';

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
      <div class="product-card" v-for="product of products" @click="goToDetail(product)">
          <img :alt="product.description" :src="product.image" loading="lazy" />
          <div class="text-wrapper text-center">
            <h3 class="title">{{ product.title }}</h3>
            <h3>price : {{ product.price }}$</h3>
          </div>
            <div class="btn-footer">
              <Button :aria-label="wishlist.isWish(product) ?'Remove to Wishlist' : 'Add to Wishlist'" :icon="wishlist.isWish(product) ? 'pi pi-star-fill' : 'pi pi-star'" @click="wishlist.addRemoveWish(product); $event.stopPropagation()"  raised />
              <Button icon="pi pi-shopping-cart" aria-label="Add to cart" @click=" $event.stopPropagation()" raised />
              <!-- <Button icon="pi pi-eye" aria-label="See Detail" raised @click="goToDetail(product); $event.stopPropagation()"/> -->
            </div>
        </div>
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
  .product-card {
    border-radius: 18px;
    border: 1px solid #ccc;
    width: 200px;
    text-align: center;
    overflow: hidden;
    background-color: var(--color-background-soft);
    margin: 1rem;
    width: 20rem;
    height: 39rem;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    img {
      width: 20rem;
      height: 30rem;
    }
  }
  .product-card:hover{
    cursor: pointer;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);

  }
}
.text-wrapper {
  padding: 10px;
  height: 5rem;
  width: 18rem;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
}

.title {
  font-weight: bold;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: block; 
  width: 100%; 
}

.btn-footer{
  display: flex;
  justify-content: end;
  gap: 10px;
  margin: 0px 10px 10px 0px ;
}

.loading {
  visibility: hidden;
  animation: fadeOutBottom 1s;
}

.visible{
  animation: fadeInBottom 1s;
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