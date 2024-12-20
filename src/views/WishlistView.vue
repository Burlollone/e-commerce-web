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
        <div>
            {{ wishlist.products }}
        </div>
</template>
<style>
</style>