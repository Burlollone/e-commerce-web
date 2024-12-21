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
        label: 'WhiteCastle Shop',
        class: 'shop-name',
        command : () =>{ 
                    selectCommand()
        }
    },
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
            
              items.value[1].items?.push(
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
                <template #start >
                    <span class="logo">
                        <svg  fill="#f5f5f5" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(1 1)"> <g> <g> <path d="M322.84,451.267c-5.12,0-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533 C331.373,454.68,327.96,451.267,322.84,451.267z"></path> <path d="M371.48,128.707L263.107,37.006V7.533c0-5.12-3.413-8.533-8.533-8.533c-5.12,0-8.533,3.413-8.533,8.533v30.195 l-107.52,90.978c-2.56,2.56-3.413,5.973-2.56,9.387s4.267,5.973,7.68,5.973h8.533v25.6c0,5.12,3.413,8.533,8.533,8.533h8.533 v230.4h-8.533c-4.267,0-7.68,3.413-8.533,7.68l-8.533,85.333c0,2.56,0.853,5.12,2.56,6.827c0.853,1.707,3.413,2.56,5.973,2.56 h204.8c2.56,0,5.12-0.853,5.973-2.56c1.707-1.707,2.56-4.267,2.56-6.827l-8.533-85.333c-0.853-4.267-4.267-7.68-8.533-7.68 h-8.533V178.2h8.533c5.12,0,8.533-3.413,8.533-8.533v-25.6h8.533c3.413,0,6.827-2.56,8.533-5.973 C374.893,134.68,374.04,131.267,371.48,128.707z M254.573,52.76l87.04,74.24H166.68L254.573,52.76z M347.587,493.933H161.56 l6.827-68.267h9.387h153.6h9.387L347.587,493.933z M322.84,289.133h-17.067c-5.12,0-8.533,3.413-8.533,8.533 s3.413,8.533,8.533,8.533h17.067v102.4H186.307V383h17.067c5.12,0,8.533-3.413,8.533-8.533s-3.413-8.533-8.533-8.533h-17.067 V220.867h17.067c5.12,0,8.533-3.413,8.533-8.533c0-5.12-3.413-8.533-8.533-8.533h-17.067v-25.6H322.84V289.133z M339.907,161.133 h-8.533h-153.6h-8.533v-17.067h170.667V161.133z"></path> <path d="M288.707,451.267h-51.2c-5.12,0-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533h51.2 c5.12,0,8.533-3.413,8.533-8.533C297.24,454.68,293.827,451.267,288.707,451.267z"></path> <path d="M203.373,451.267h-17.067c-5.12,0-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533h17.067 c5.12,0,8.533-3.413,8.533-8.533C211.907,454.68,208.493,451.267,203.373,451.267z"></path> <path d="M237.507,280.6h34.133c5.12,0,8.533-3.413,8.533-8.533V229.4c0-14.507-11.093-25.6-25.6-25.6 c-14.507,0-25.6,11.093-25.6,25.6v42.667C228.973,277.187,232.387,280.6,237.507,280.6z M246.04,229.4 c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v34.133H246.04V229.4z"></path> <path d="M237.507,383h34.133c5.12,0,8.533-3.413,8.533-8.533V331.8c0-14.507-11.093-25.6-25.6-25.6 c-14.507,0-25.6,11.093-25.6,25.6v42.667C228.973,379.587,232.387,383,237.507,383z M246.04,331.8 c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v34.133H246.04V331.8z"></path> </g> </g> </g> </g></svg>
                    </span>
                </template>
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
                              <Button size="small" class="ml-1" v-if="user.isLogged()" icon="pi pi-star" aria-label="wishlist" severity="secondary"  @click="goTo('/wishlist')" :badge="wishlist.products.length ? wishlist.products.length.toString() : ''" raised />
                              <Button size="small" class="ml-1" v-if="user.isLogged()" icon="pi pi-shopping-cart" aria-label="cart" severity="secondary" @click="goTo('/cart')" :badge="cart.products.length ? cart.totalProducts().toString() : ''" raised/>
                              <Button size="small" class="ml-1" v-if="user.isLogged()" icon="pi pi-sign-out" aria-label="logout" severity="secondary" @click="user.logout()" raised/>
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
.shop-name{
    font-weight: bold;
    color: #fff !important;
    font-family: Times New Roman, Times, serif;
    font-size: large;
}
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
    flex-wrap: nowrap;
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
  .logo{
    display: none;
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