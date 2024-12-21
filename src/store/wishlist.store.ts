
import { computed, reactive } from 'vue';
import type { Product } from '@/interface/product.interface';



export const wishlist = reactive({
  products: []  as Product[],
  addRemoveWish( wish : Product){
      let i = this.products.findIndex( el => el.id == wish.id )
    if( i == -1){
        this.products.push(wish);
    } else {
        this.products.splice( i , 1)
    }
    updateSession()
  },
  clear(){
    this.products = [];
    localStorage.removeItem('wish');
  },
  isWish(wish: Product): boolean {
    return this.products.some(product => product.id === wish.id);
  }
})

function updateSession(){
  localStorage.setItem('wish', JSON.stringify(wishlist.products))
}