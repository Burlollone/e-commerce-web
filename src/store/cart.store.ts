
import { computed, reactive } from 'vue';
import type { Product, CartProduct} from '@/interface/product.interface';




export const cart = reactive({
  products: []  as CartProduct[],
  addOne( p : Product){
      let i = this.products.findIndex( el => el.id == p.id )
    if( i != -1){
        this.products[i].number++;
    } else {
        this.products.push({...p, number : 1});
    }
  },
  setNumber( p : Product, n : number){
    let i = this.products.findIndex( el => el.id == p.id )
  if( i != -1){
      !n ? this.remove(p) : this.products[i].number == n;
  } else {
       this.products.push({...p, number : n});
  }
  },
  remove(p : Product){
    let i = this.products.findIndex( el => el.id == p.id )
    this.products.splice( i , 1)
  },
  isInCart(p: Product): number {
    let i = this.products.find( el => el.id == p.id )
    return i ? i.number : 0;
  }
})

