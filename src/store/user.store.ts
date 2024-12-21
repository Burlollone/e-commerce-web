
import { computed, reactive } from 'vue';
import type { Product } from '@/interface/product.interface';



export const user = reactive({
  user: '',
  token: '',
  logged : false,
})

