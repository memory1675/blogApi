# Vue中的provide和inject实现夸组件传递数据

* ### 利用provide和inject可实现夸组件传递数据

  ```vue
  <!--父组件-->
  <script>
      import { defineComponent, provide, ref } from 'vue'
      export default defineComponent({
          setup(){
              const value = ref('123');
              provide('key',value)
          }
      })
  </script>
  <!--孙组件-->
  <script>
      import { defineComponent, inject, ref } from 'vue'
      export default defineComponent({
          setup(){
              const value = ref(inject('key'));
              console.log(value) => '123'
          }
      })
  </script>
  ```

  

