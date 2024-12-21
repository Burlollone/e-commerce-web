
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
  removeOne( p : Product){
    let i = this.products.findIndex( el => el.id == p.id )
    if(i != -1){
      if( this.products[i].number > 1){
          this.products[i].number--;
      } else {
        this.products.splice( i , 1)
      }
    }
  },
  isInCart(p: Product): number {
    let i = this.products.find( el => el.id == p.id )
    return i ? i.number : 0;
  },
  getPrice() : number{
    let price = 0;
    this.products.forEach( el =>{
      price = price + (el.price*el.number)
    });
    return price
  },
  totalProducts() : number{
    let number = 0;
    this.products.forEach( el =>{
      number = number + (el.number)
    });
    return number;
  }
})

