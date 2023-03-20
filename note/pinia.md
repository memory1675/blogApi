##### vue使用pinia

```ts
//main.ts
import { createPinia } from 'pinia'
createApp(App).use(createPinia())
//store/index.ts
import {defineStore} from 'pinia';

export const useStore = defineStore('storeId',{
    state(){
        return {
            num:0,
            name:'周星华'
        }
    },
    getters:{

    },
    actions:{

    }
})
```

##### vue配置代理

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      'api':'http://localhost:8001/api',  
      'student':'http://localhost:8001/student',
    }
  }
})
```

##### 基本使用

```ts
import {useStore} from '../store';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
const store = useStore();
let {name,num,data} = storeToRefs(store);
const changeName = function(){
 store.$patch(state => {
   state.name = '刘智绅';
   state.num = 11;
 })
}
const changeName2 = function(){
 store.upNum(200)
}
onBeforeMount(() => {
 store.insetStudentData()
})
```

