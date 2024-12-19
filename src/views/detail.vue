
<script setup lang="ts">
import { onMounted, ref, watch,  type Ref  } from 'vue';
import type { Product } from '@/interface/product.interface';

import { loading } from '@/store/loading';
import router from '@/router';

const props = defineProps({
  id: String
})
const product = ref<Product>()
onMounted(()=>{
  loading.value = true;
  fetch('https://fakestoreapi.com/products/'+ props.id)
    .then(response => response.json())
    .then((data : Product) => {
      loading.value = false;
      product.value = data;
    } )
    .catch(error =>{
        loading.value = false;
        console.log(error);
    })
})

</script>
<template>
  <h2>Detail of product</h2>
  {{ product }}
  {{ props }}
</template>

<style>
</style>
