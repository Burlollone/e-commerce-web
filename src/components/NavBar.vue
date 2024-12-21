<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import router from '@/router';

import { Menubar } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import Login from './Login.vue';

import { categoryStore } from '@/services/category.service';
import { loading } from '@/services/loading.service';
import { wishlist } from '@/store/wishlist.store';
import { cart } from '@/store/cart.store';
import { user } from '@/store/user.store';

const location = useRoute();
const loadingCategories = ref(true);

const loginModal = ref(false)

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
                          <span  v-if="user.isLogged()">
                              <Button class="ml-1" v-if="user.isLogged()" icon="pi pi-star" aria-label="wishlist" severity="secondary"  @click="goTo('/wishlist')" :badge="wishlist.products.length ? wishlist.products.length.toString() : ''" raised />
                              <Button class="ml-1" v-if="user.isLogged()" icon="pi pi-shopping-cart" aria-label="cart" severity="secondary" @click="goTo('/cart')" :badge="cart.products.length ? cart.totalProducts().toString() : ''" raised/>
                              <Button class="ml-1" v-if="user.isLogged()" icon="pi pi-sign-out" aria-label="logout" severity="secondary" @click="user.logout()" raised/>
                          </span>
                          <span v-else>
                              <Button icon="pi pi-sign-in" aria-label="login" severity="secondary" @click="loginModal = true"/>
                          </span>

                    </div>
                </template>
            </Menubar>
            <ProgressBar v-if="loading.value"  mode="indeterminate" style="height: 6px; width: 100vw;"></ProgressBar>
        </nav>
    </header>
    <Teleport to="body">
            <Transition  name="fade" mode="out-in">
                <div v-show="loginModal" class="login-modal fade-in">
                    <Login @close="loginModal = false" ></Login>
                </div>
            </Transition>
    </Teleport>
</template>

<style>
.navBar{
    position: fixed;
    width: 100vw;
    z-index: 1;
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
    margin-right: 1rem;
}

.ml-1 {
    margin-left: 1rem;
}

.login-modal {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 35%;
    background-color: whitesmoke;
    border: 1px solid #ccc;
    border-radius: 18px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 1rem;

}

@media screen and (max-width: 600px) {
    .login-modal {
        width: 95%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>