<script setup lang="ts">
import { ref } from 'vue';

import Button from 'primevue/button';
import type { Product } from '@/interface/product.interface';

const props = defineProps({
  productNumber:  Number
})

const emit = defineEmits(['plus', 'minus'])

const number = ref(0)

</script>
<template>
    <div class="btn-group">
        <Button :icon="productNumber && productNumber > 1 ? 'pi pi-cart-minus' : 'pi pi-trash'" aria-label="Remove one to cart" @click="emit('minus')" raised />
        <span class="number-wrapper">
            {{ productNumber }}
        </span>
        <Button icon="pi pi-cart-plus" aria-label="Add one to cart" @click="emit('plus')" raised />
    </div>


   
</template>

<style scoped>
.btn-group{
    border-radius: 5px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    width: fit-content;
    .number-wrapper{
        padding: 0px 1rem 0px 1rem;
        color: black;
    }
}

</style>