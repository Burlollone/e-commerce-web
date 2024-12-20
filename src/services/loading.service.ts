
import { reactive } from 'vue'

export const loading = reactive({
  value: false,
  setCategory( value : boolean){
    loading.value = value;
  }
})
