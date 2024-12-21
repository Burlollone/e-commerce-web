<script setup lang="ts">
import { onMounted, ref, watch,  type Ref  } from 'vue';
import type { Product } from '@/interface/product.interface';
import Button from 'primevue/button';
import { cart } from '@/store/cart.store';
import router from '@/router';

function goTo(route : string){
    router.push(route);
  }

</script>
<template>
        <h2 class="app-title"> Your Cart</h2>
        <div class="text-center fade-in" v-if="!cart.products.length">
            <p>Don't have any products on your cart.</p>
            <p>Check out our products!</p>
            <Button label="Click Here!" @click="goTo('/')" raised />
        </div>
        <div v-else>
            <h3 class="app-subtitle">Total price <span class="bold"> {{ cart.getPrice() }}$</span></h3>
            <div class="cart-product-list">
                <div v-for="product in cart.products" :key="product.id" class="cart-product-item w-100">
                    <img :src="product.image" :alt="product.description">
                    <div class="text-wrapper w-100">
                        <h3 class="title-ellipsis">{{ product.title }}</h3>
                        <p>
                            Number : <span class="bold">{{ product.number }} </span>
                        </p>
                        <p>Price : <span class="bold">{{ product.price * product.number }} $</span></p>
                        <div>
                            <!-- <Button icon="pi pi-trash" aria-label="Remove to Wishlist" raised  @click="wishlist.addRemoveWish(product)"/>
                            <Button icon="pi pi-eye" aria-label="See Detail" raised  @click="goTo('detail/'+product.id)"/> -->
                        </div>
                    </div>
                    <div>

                    </div>
    
                </div>
            </div>
        </div>
</template>
<style scoped>
.cart-product-list{
    margin-top: 1rem;
    .cart-product-item{
        background-color: whitesmoke;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        margin-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        padding: 1rem;
        margin: 0px 1rem 1rem 0px;
        img {
            height: 20rem;
            width: 20rem;
            object-fit: contain;
        }
        .text-wrapper{
            padding: 1rem;

        }

    }

}
@media screen and (max-width: 600px) {
    .cart-product-list{
        .cart-product-item {
            justify-content: center;
            flex-wrap: wrap;
            .text-wrapper{
                text-align: center;
            }
        }
    }
}

</style>