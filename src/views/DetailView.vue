
<script setup lang="ts">
import { onMounted, ref} from 'vue';
import type { Product } from '@/interface/product.interface';
import Button from 'primevue/button';
import { loading } from '@/services/loading.service';
import { wishlist } from '@/store/wishlist.store';
import { cart } from '@/store/cart.store';
import CartNumberBtn from '@/components/CartNumberBtn.vue';
import { user } from '@/store/user.store';
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
    <h2 class="app-title">{{ product.title }}</h2>
    <h4 class="ml">{{ product.category }}</h4>
    <div class="detail-box" >
      <img :alt="product.description" :src="product.image"  />
      <div class="text-box">
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }} $</p>
        <div class="btn-row" v-if="user.isLogged()">
          <Button :label="wishlist.isWish(product) ?'Remove to Wishlist' : 'Add to Wishlist'" :icon="wishlist.isWish(product) ? 'pi pi-star-fill' : 'pi pi-star'" iconPos="right" @click="wishlist.addRemoveWish(product)"  raised />
          <CartNumberBtn :productNumber ="cart.isInCart(product)" @minus="cart.removeOne(product)" @plus="cart.addOne(product)"></CartNumberBtn>

  
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
      max-height: 60vh;
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
