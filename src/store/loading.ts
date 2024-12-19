
import { reactive } from 'vue'

export const loading = reactive({
  value: true,
  setCategory( value : boolean){
    loading.value = value;
  }
})
