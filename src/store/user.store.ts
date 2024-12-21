
import { reactive } from 'vue';
import { cart } from './cart.store';
import { wishlist } from './wishlist.store';



export const user = reactive({
  user: null as (String | null),
  token: null as (String | null),
  login(user : String, token : String){
    this.user = user;
    this.token = token;
    localStorage.setItem('user', JSON.stringify({
      user: this.user,
      token: this.token
    }))

  },
  logout(){
    this.user = null;
    this.token = null;
    cart.clear();
    wishlist.clear();
    localStorage.removeItem('user');
  },
  isLogged(){
    
    return !!this.token 
  }
})

function getUserSession(){
  if(!user.token){
    let s= localStorage.getItem('user');
    if(s){
      let user = JSON.parse(s);
      user.user = user.user;
      user.token = user.token;
    }
  }
}