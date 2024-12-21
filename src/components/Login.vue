<script setup lang="ts">
import { ref } from 'vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { InputText } from 'primevue';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';


import { user } from '@/store/user.store';

const emit = defineEmits(['close'])
const username = ref<string | null>(null);
const password = ref(null);
const success = ref<string | null>('');
const error = ref <string | null>(null);
const loading = ref<boolean>(false);

function login(){
    error.value = null;
    loading.value = true;
    fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                "username": username.value,
                "password":password.value
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>{
                loading.value = false;
                if(res.status && res.status==401){
                    error.value = 'Attenzione : Controlla che username e password siano corretti.';
                }
                return res.json()
            })
            .then(json=>{
                if(json.token && username.value){
                    user.login(username.value, json.token);
                    success.value="Benvenuto " +  username.value
                } else {
                    error.value = 'Attenzione : Controlla che username e password siano corretti.';
                }
            })
            .catch( error =>{
                loading.value = false;
                console.log(error);
                error.value = 'Attenzione : Controlla che username e password siano corretti.';
            })
    
}

</script>
<template>
    <div class="text-center" v-if="!success">
        <h3 class="app-title ">Login</h3>
        <form @submit="login(); $event.preventDefault()">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="username" placeholder="Username" type="username" required/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-key"></i>
                </InputGroupAddon>
                <InputText v-model="password" placeholder="Password" type="password" required/>
            </InputGroup>
            <ProgressBar v-if="loading"  mode="indeterminate" style="height: 6px;"></ProgressBar>
            <p class="error">{{ error }}</p>
            <div class="btn-row ">
                <Button class="w-100" label="Login" type="submit" iconPos="right"  raised  :disabled="!username && !password" />
                <Button class="w-100" label="Close" type="button"  iconPos="right" @click="emit('close')" severity="secondary"  raised />
            </div>
        </form>
    </div>
    <div v-else class=" text-center fade-in">
        <h3 class="app-title">{{ success }}</h3>
        <div class="btn-row ">
            <Button class="w-100" label="Close" type="button"  iconPos="right" @click="emit('close')" severity="secondary"  raised />
        </div>
    </div>


   
</template>

<style scoped>
.btn-row{
    margin-top: 1rem;
}

.error{
    color: red;
    font-weight: bold;
}
</style>