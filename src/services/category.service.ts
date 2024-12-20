
import { reactive } from 'vue'

export const categoryStore = reactive({
  category: 'All',
  setCategory( category : string){
     categoryStore.category = category;
  }
})
