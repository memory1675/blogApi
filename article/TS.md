### TS

为变量设置**类型**

```typescript
let a:number; //string number boolean 数组 对象

a = 10;
a = 33;
a = 'hello'; //如果赋值类型和定义的类型不一致编译器会报错
```

##### ts包含的数据类型

```ts
//不设置类型默认为any 	声明为 any 的变量可以赋予任意类型的值(不建议使用any类型)
let value:any;  // js =>let value;

//number
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制

//string
let name: string = "Runoob";
let years: number = 5;
let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;

//boolean
let flag: boolean = true;

//无关键字 数组类型
// 在元素类型后面加上[]
let arr: number[] = [1, 2]; //数组参数类型只能为number
// 或者使用数组泛型
let arr: Array<number> = [1, 2];


//无关键字 元组  现在数组长度
let x: [string, number];
x = ['Runoob', 1];    // 运行正常
x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob

//object 对象
let x: object;(一般不用)
x = {id: 1,name: 'Memory'};
let x: {name:string};(用来固定属性，只能有name一个属性,且一点得有name)
x = {name:'Memory'};
let x: {name:string, age?:number?};(可选属性，在变量后加上?后表明这个属性可有可不有)
let x: {name:string, [propName:string]: any};(name为固定属性,其他属性随便加)

//function 函数
let d: (a:number,b:number) => number;//两个参数一个返回值类型都是number

//enum 枚举
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);    // 输出 2
enum Gender {
    Male,
    FeMale
}
enum Color {
    Red = 'Red',Green = 'Green',Blue = 'Blue'
}
console.log(Gender.FeMale);
console.log(Color.Blue);


//void void //标记方法返回值的类型
function hello(): void {
    alert("Hello Runoob");
}

null	null	表示对象值缺失。

undefined	undefined	用于初始化变量为一个未定义的值

never	never	never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
//给定类型可以是多种
let a:number | string;
a = 123;
a = 'string';

//类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let x: 1 | 2 | 3 | 4 | 5;
let y: myType;
```

##### 类型断言,可以用来告诉编译器e是个string类型

```ts
let e: unknown;
e = 'string';

s = e as string;
s = <string>e;
```

##### ts的config配置项用于告诉编译器(tsconfig.json)

```json
{
    // "files": ["type.ts"], //需要转译的文件
    "include": ["type.ts","type2.ts"],  //包含哪些文件需要被编译与files效果一样
    "exclude": [], //哪些文件不需要被编译
    // "extends":"", //继承另一个配置文件
    "compilerOptions": {
        "target": "ES3", //用来指定被编译为的ES的版本
        "module": "System", //指定要使用的模块化的规范
        "watch": true,
        // "lib": ["dom"], // 指定代码运行时所包含的库
        "outDir": "dist", //输出目录
        "outFile": "./dist/app.js", //输出文件
        "strict": true, //所有严格检查总开关
        "allowJs": true, //是否编译Js文件
        "checkJs": true, // 是否检查Js代码
        "removeComments": true, //是否移除注释
        "noEmit": false, //不生成编译后的文件
        "noEmitOnError": false, //不生产错误内容
        "alwaysStrict": false, //是否设置生产的js代码带不带有严格模式('use strict')
        "noImplicitAny": true, //不允许隐式any
        "noImplicitThis": true, //不允许隐式的this
        "strictNullChecks": true, // 严格空值检查

    }
}
```

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
```

##### webpack打包ts代码

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    //导出设置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js'
    },
    //入口文件
    entry: './src/index.ts',
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                //正则表达式
                test: /\.ts$/,
                //要使用的loader
                use: [
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        //要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式”usage“ 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ]
            }
        ]
    }
}
```

##### 类、抽象类、接口

```ts
//类
class Dog{
    name: string;
    age: number;
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    
    f1(){
        console.log(this);
    }
}
    
const dog1 = new Dog('小黄',15);
const dog2 = new Dog('大黄',200);
    
dog1.f1();
dog2.f1();
//抽象类   生来就是用来被继承的
abstract class Animal{
    name: string;
    age: number;
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    
    f1(){
        console.log(this);
    }
}
class Dog extends Animal{
    f1() {
        return this
    }
}
console.log(new Dog('大黄',18).f1()); =>Dog {name: '大黄', age: 18}
//接口

```

##### 类的封装

```ts
class Person{
    //public static private protected
    //公开的  静态   私有    受保护的
    private name:string;
    private age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    getName(){
        return this.name
    }
    setName(name:string){
        this.name = name
    }
    getAge(){
        return this.age
    }
    setAge(age:number){
        age < 0 || (this.age = age)
    }
}
const p1 = new Person('周星华',18);
p1.setAge(-33)
console.log(p1);
```

##### 泛型

```ts
function fn<T>(a:T):T{
    return a;
}
let result = fn(10); //不指定泛型 TS可以自动对类型进行推断
let result2 = fn<string>('100')//指定泛型
console.log(result,result2);
function fn2<T,K>(a:T,b:K):T{
    console.log(b);
    return a;
}
fn2<number,string>(15,'zxh');
interface Inter{
    length: number;
}
    
function fn3<T extends Inter>(a: T): number{
    return a.length;
}
console.log(fn3({length:12}));
class MyClass<T>{
    name: T;
    constructor(name:T){
        this.name = name
    }
}
const result3 = new MyClass<string>('周星华');
console.log(result3);
```



* ### axios请求后台数据类型

  ```ts
  import axios from "axios";
  
  const request = axios.create({
      baseURL: "/api",
      timeout: 5000
  })
  declare module "axios" {
      interface AxiosResponse<T = any> {
        flag: boolean;
        // 这里追加你的参数
      }
      export function create(config?: AxiosRequestConfig): AxiosInstance;
  }
  ```

  

* ### TS关于Window对象上的类型问题

  ```ts
  //navigator.userAgentData
  //TS默认没有这个属性
  //需自行安装
  ```

1. Install user agent types from npm:

`` npm i -D user-agent-data-types``

2. In the tsconfig.json add:   (tsconfig.json)

```json
{
   "compilerOptions": {
    ...
    "types": [
      "./node_modules/user-agent-data-types"
     ]
   },
}
```

* ### 解决Vue+Ts导入vue类型文件时报错问题

  ```ts
  //在项目根目录下的env.d.ts下加入以下语句
  declare module '*.vue' {
      import type { DefineComponent } from 'vue'
      const component: DefineComponent<{}, {}, any>
      export default component
  }
  ```

  
