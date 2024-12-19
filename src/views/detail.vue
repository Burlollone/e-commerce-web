
<script setup lang="ts">
import { onMounted, ref, watch,  type Ref  } from 'vue';
import type { Product } from '@/interface/product.interface';
import Button from 'primevue/button';
import { loading } from '@/store/loading';

import InputNumber from 'primevue/inputnumber';
const numberToBuy = ref(1);

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
  <div class="detail-container" v-if="product">
    <h2 class="ml">{{ product.title }}</h2>
    <h4 class="ml">{{ product.category }}</h4>
    <div class="detail-box" >
      <img :alt="product.description" :src="product.image"  />
      <div class="text-box">
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }} $</p>
        <div class="btn-row">
          <Button label="Add to Wishlist" icon="pi pi-star" iconPos="right"  raised />
          <div>
            <InputNumber v-model="numberToBuy" inputId="numberToBuy" showButtons style="width: 5rem;" :min="0" :max="100" fluid />
            <Button label="Buy" icon="pi pi-shopping-bag" iconPos="right"  raised />
          </div>
  
        </div>
      </div>

    </div>
  </div>
</template>

<style>
  .ml {
    margin-left: 1rem;
  }
  .detail-container {
    background-color: whitesmoke;
    animation: fadeInBottom 1s;
  }
  .detail-box{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 2rem;
    img {
      max-width: 50vw;
      height: auto;
    }


  }

  .text-box{
    display: block;
    padding : 1rem;
    .price {
      font-weight: bold;
      font-size: large;
      font-style: italic;
    }
    .btn-row{
      margin-bottom: 1rem;
      display: flex;
      justify-content: end;
      gap: 1rem;
    }
  }


  @keyframes fadeInBottom {
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to { opacity: 1 }
}

@media screen and (max-width: 600px) {
  .detail-box {
    flex-wrap: wrap;
    img {
      max-width: 70vw;
      height: auto;
    }
  }
}
</style>
