# $attrs_$listeners

* ### $attrs

  ```vue
  //父组件Parent
  <Child item="0" item1="1" item3="2"/>
  
  
  //子组件Child
  //可通过v-bind给子组件绑定相应的属性 => v-bind="$attrs"
  
  <script>
      export default {
          props:['item','item1']; //如果在props接受了父组件传的值那么$attrs就接受不到这个值
          console.log(this.$attrs) //类型为对象  值为父组件通过props传递过来的参数
      }
  </script>
  
  ```

  

* ### $listeners

  ```vue
  //接受父组件传递的自定义事件
  <Child @click="fn" />
  
  //子组件Child
  <template>
  <button v-on="$listeners"></button> //给子组件绑定父组件传递的自定义事件
  </template>
  ```

  