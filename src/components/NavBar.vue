<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import router from '@/router';

import { Menubar } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';

import { categoryStore } from '@/services/category.service';
import { loading } from '@/services/loading.service';
import { wishlist } from '@/store/wishlist.store';
import { cart } from '@/store/cart.store';

const location = useRoute();
const loadingCategories = ref(true);

const items = ref <MenuItem[]> ([
    {
        label: 'Categories',
        items: [{
            label: 'All',
            command : () =>{
                selectCommand()
            }
        }]
    }
]);

onMounted(
      fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then((data : string[]) => {
        loadingCategories.value = false;
          data.forEach((el : string) => {
            
              items.value[0].items?.push(
                {
                label: el,
                command : () =>{ 
                    selectCommand(el)
                }
                },
              )
            
          });
        } )
        .catch(error =>{
            loadingCategories.value = false;
            console.log(error);
        })
  );

 function  selectCommand(el = 'All'){
    categoryStore.setCategory(el)
    location.name != 'home' ? router.push('/'): null;
  }

  function goTo(route : string){
    router.push(route);
  }

</script>
<template>
    <header>
        <nav class="navBar">
            <Menubar :model="items"  >
                <template #item="{ item, props, hasSubmenu, root }">
                    <a v-ripple class="flex items-center" :class="{'no-event' : loadingCategories}" v-bind="props.action">
                        <span>
                            {{ item.label }}
                        </span>
                        <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                        <i v-if="loadingCategories && item.label == 'Categories'" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
                        <i v-if="hasSubmenu && ! loadingCategories" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                    </a>
                </template>
                <template #end>
                    <div class="end-btn">
                        <!--  logged = true -->
                        <Button icon="pi pi-star" aria-label="wishlist" severity="secondary"  @click="goTo('/wishlist')" :badge="wishlist.products.length ? wishlist.products.length.toString() : ''" raised />
                        <Button icon="pi pi-shopping-cart" aria-label="cart" severity="secondary" :badge="cart.products.length ? cart.products.length.toString() : ''" raised/>
                        <Button icon="pi pi-sign-out" aria-label="logout" severity="secondary" raised/>

                        <!-- logged = false -->
                        <Button icon="pi pi-sign-in" aria-label="login" severity="secondary"/>
                    </div>
                </template>
            </Menubar>
            <ProgressBar v-if="loading.value"  mode="indeterminate" style="height: 6px; width: 100vw;"></ProgressBar>
        </nav>
    </header>
</template>

<style>
.navBar{
    position: fixed;
    width: 100vw;
    .p-menubar {
        background-image: linear-gradient(  var(--primary-soft) 0%, var(--primary) 20%, var(--primary) 80%, var(--primary-soft) 100%);
    }
}
.no-event {
    pointer-events: none;
}

.end-btn {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

</style>