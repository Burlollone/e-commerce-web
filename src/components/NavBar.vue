<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Menubar } from 'primevue';
import {ProgressSpinner} from 'primevue';
import type { MenuItem } from 'primevue/menuitem';

const loadingCategories = ref(true);
const items = ref <MenuItem[]> ([
    {
        label: 'Categories',
        items: []
    }
]);
const categories = ref([]); // Stato per salvare i dati dei post

onMounted(
      fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then((data : string[]) => {
        loadingCategories.value = false;
          data.forEach((el : string) => {
              items.value[0].items?.push(
                {
                label: el
                },
              )
            
          });
        } )
        .catch(error =>{
            loadingCategories.value = false;
            console.log(error);
        })
  );

</script>
<template>
    <header>
        <nav>
            <div class="card">
                <Menubar :model="items" >
                    <template #item="{ item, props, hasSubmenu, root }">
                        <a v-ripple class="flex items-center" :class="{'no-event' : loadingCategories}" v-bind="props.action">
                            <span>
                                {{ item.label }}
                            </span>
                            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                            <i v-if="loadingCategories" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
                            <i v-if="hasSubmenu && ! loadingCategories" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                        </a>
                    </template>
                    <template #end>
                        <div class="flex items-center gap-2">
                            <!-- pulsanti wishlist, cart, login/logout  -->
                        </div>
                    </template>
                </Menubar>
            </div>
        </nav>
    </header>
</template>

<style>
.no-event {
    pointer-events: none;
}

</style>