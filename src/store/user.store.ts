
import { reactive } from 'vue';



export const user = reactive({
  user: null as (String | null),
  token: null as (String | null),
  login(user : String, token : String){
    this.user = user;
    this.token = token;
  },
  logout(){
    this.user = null;
    this.token = null;
  },
  isLogged(){
    return !!this.token 
  }
})

