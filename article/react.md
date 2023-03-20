# Hello React

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello_react</title>
</head>
<body>
    <div id="test"></div>


    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>

    <script type="text/babel">   /* 此处一定要写babel */
       //1.创建虚拟dom
       const VDOM = <h1>Hello,React</h1>  /* 此处一定不要写引号，因为不是字符串 */
       //2.渲染虚拟dom到页面
       ReactDOM.render(VDOM,document.querySelector('#test'))
       //3.
    </script>
</body>
</html>
```

* ### 定义组件

  ```jsx
  //函数式
  function MyComponent(){
      return <h2>我使用函数定义的组件(适用于【简单组件】的定义)</h2>
  }
  ReactDOM.render(<MyComponent/>,document.querySelector('.test'))
  //类式
  class MyComponent extends React.Component {
      render() {
          //render是放在哪里的？——类的原型对象上，供实例使用
          return (
              <h2>我使用类定义的组件(适用于【复杂组件】的定义)</h2>
          )
      }
  }
  ReactDOM.render(<MyComponent />, document.querySelector('.test'))
  /* 
    <MyComponent />
    React帮你new一个实例
    通过该实例调用render方法
  */
  ```

  

* ### 组件实例上的三大属性_state

  ```jsx
  class Weather extends React.Component {
      
      render() {
          const {isHot} = this.state
          return (
              <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'},{this.state.swind}</h1>
          )
      }
      state = { isHot: false, swind: '微风' } //相当于vue2中的data
      changeWeather = () => {
          //严重注意：状态（state）不可直接更改，下面这行就是直接更改
          //this.state.isHot = !this.state.isHot
          // console.log(this.state.isHot);
          //获取原来的isHot值
          const isHot = this.state.isHot
          //状态必须通过setState更改，且更新是一种合并，不是替换
          this.setState({ isHot: !isHot})
      }
  }
  ReactDOM.render(<Weather />, document.querySelector('.test'))
  /*
    <MyComponent />
    React帮你new一个实例
    通过该实例调用render方法
  ```

  

* ### 组件实例上的三大属性_props

  * ##### 基本使用

    ```jsx
    class Person extends React.Component {
        constructor(props){
            super(props)
        }
        render() {
            const {name,sex,age} = this.props
            return (
                <ul>
                    <li>姓名:{name}</li>
                    <li>性别:{sex}</li>
                    <li>年龄:{parseInt(age)+1}</li>
                </ul>
            )
        }
    }
    ReactDOM.render(<Person name="周星华" sex={'男'} age={18}/>,document.querySelector('.test1'))
    ```

    

  * ##### 限制类型和默认值

    ```jsx
    //类的外部定义需要引入prop-types.js
    Person.propTypes = {
        name:PropTypes.string.isRequired,//限制name必传，且为字符串
        age:PropTypes.number, //限制age类型 必须为number
        sex:PropTypes.string, //限制age类型 必须为string
        speak:PropTypes.func //限制age类型 必须为function
    }
    Person.defaultProps = {
        sex: '不男不女', //默认值
        age: 18
    }
    //类内部使用静态属性
    class Person extends React.Component {
        static propTypes = {
            name: PropTypes.string.isRequired,//限制name必传，且为字符串
            age: PropTypes.number, //限制age类型 必须为number
            sex: PropTypes.string, //限制age类型 必须为string
            speak: PropTypes.func //限制age类型 必须为function
        }
        static defaultProps = {
            sex: '不男不女', //默认值
            age: 18
        }
        render() {
            const { name, sex, age } = this.props
            return (
                <ul>
                    <li>姓名:{name}</li>
                    <li>性别:{sex}</li>
                    <li>年龄:{parseInt(age) + 1}</li>
                </ul>
            )
        }
    }
    ```

    

  * ##### 函数式组件使用props

    ```jsx
    function Person(props) {
        const { name, age, sex } = props
        return (
            <ul>
                <li>姓名:{name}</li>
                <li>性别:{sex}</li>
                <li>年龄:{age + 1}</li>
            </ul>
        )
    }
    Person.propTypes = {
        name: PropTypes.string.isRequired,//限制name必传，且为字符串
        age: PropTypes.number, //限制age类型 必须为number
        sex: PropTypes.string, //限制age类型 必须为string
        speak: PropTypes.func //限制age类型 必须为function
    }
    Person.defaultProps = {
        sex: '不男不女', //默认值
        age: 18
    }
    ReactDOM.render(<Person name="周星华" sex={'男'} />, document.querySelector('.test1'))
    ```

    

* ### 组件实例三大属性3_refs

  ```jsx
  //就与vue2中的ref用法差不多
  //1.字符串形式
  class Demo extends React.Component {
      showData = () => {
          const input = this.refs.input1  //通过refs
          console.log(input.value);
      }
      showData2 = () => {
          const input = this.refs.input2
          console.log(input.value);
      }
      render() {
          return (
              <div>
                  <input ref="input1" type="text" placeholder="点击按钮提示数据" />&nbsp;
                  <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
                  <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
              </div>
          )
      }
  }
  ReactDOM.render(<Demo/>,document.getElementById('test'))
  
  //2.回调函数形式
  
  class Demo extends React.Component {
      showData = () => {
          const input = this.input1
          console.log(input.value);
      }
      showData2 = () => {
          const input = this.input2
          console.log(input.value);
      }
      render() {
          return (
              <div>
                  {/*c为元素node节点赋值给原型对象上的input1 后续通过this.input1调用*/}
                  <input ref={c => this.input1 = c} type="text" placeholder="点击按钮提示数据" />&nbsp;
                  <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
                  <input ref={c => this.input2 = c} onBlur={this.showData2} type="text" placeholder="失
              </div>
          )
      }
  }
  ReactDOM.render(<Demo/>,document.getElementById('test'))
                                                                                                     
  //3.createRef()  容器只能装一个
                                                                                                     
  class Demo extends React.Component {
      /* 
        React.createRef调用后可以返回一个容器，容器可以存储被ref所表示的节点
      */
      myRef = React.createRef()
      showInfo = () => {
          console.log(this.myRef);
      }
      state = { isHot: true }
      handleClick = () => {
          const {isHot} = this.state
          this.setState({isHot:!isHot})
      }
      render() {
          return (
              <div>
                  <h2 onClick={this.handleClick}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
                  {/**/}<input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />&nbsp;
                  <button onClick={this.showInfo}>点我提示左侧数据</button>&nbsp;
              </div>
          )
      }
  }
  ReactDOM.render(<Demo />, document.getElementById('test'))
  ```

  