# VueRouter动态导入el-plus svg-icon

* ### router

  ```ts
  import { createRouter, createMemoryHistory } from "vue-router";
  import type { Router } from "vue-router";
  import { routes } from "./routes";
  export const router:Router = createRouter({
      history:createMemoryHistory(import.meta.env.BASE_URL),
      routes
  })
  ```

* ### routes

  ```ts
  {
      path:'main',
      name:'main',
      component:() => import ('@/views/MainView.vue'), //路由懒加载
      meta:{
          isShow:true,
          name:'主页',
          // <el-icon><HomeFilled /></el-icon>
          icon:'HomeFilled' //在meta变量中输入icon名
      }
  },
  ```

* ### 全局导入el-icon所有图标组件

  ```ts
  import * as ElIconModules from '@element-plus/icons-vue'
  for (const iconName in ElIconModules) {
      if (Reflect.has(ElIconModules, iconName)) {
          const item = ElIconModules[iconName]
          app.component(iconName, item)
      }
  }
  ```

  * ##### 这里ts会报错需在tsconfig.json中配置

    ```json
    {
        "compilerOptions":{
            "suppressImplicitAnyIndexErrors": true
        }
    }
    ```

* ### View

  ```vue
  <!-- 
       在页面中可以使用component动态导入组件名
       is属性就是组件名
  -->
  <el-menu-item :index="route.path" v-for="(route, index) in routes" :key="route.path">
      <el-icon :size="30">
          <component class="fold-menu" :is="route.meta.icon"></component>
      </el-icon>
          <template #title>{{ route.meta.name }}</template>
  </el-menu-item>
  ```

  