<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Menubar } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import Button from 'primevue/button';
import { categoryStore } from '@/store/category';

const loadingCategories = ref(true);

const items = ref <MenuItem[]> ([
    {
        label: 'Categories',
        items: [{
            label: 'All',
            command : () => categoryStore.setCategory('All')
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
                command : () => categoryStore.setCategory(el)
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
            <Menubar :model="items" >
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
                        <Button icon="pi pi-star" aria-label="wishlist" severity="secondary"  />
                        <Button icon="pi pi-shopping-cart" aria-label="cart" severity="secondary"/>
                        <Button icon="pi pi-sign-out" aria-label="logout" severity="secondary"/>

                        <!-- logged = false -->
                        <Button icon="pi pi-sign-in" aria-label="login" severity="secondary"/>
                    </div>
                </template>
            </Menubar>
        </nav>
    </header>
</template>

<style>
.no-event {
    pointer-events: none;
}

.end-btn {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

</style>