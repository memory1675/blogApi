# Promise

##### promise:对象用于表示一个异步操作的最终完成（或失败）及其结果值。

---

### 1.Promise的基本创建

#### 创建两个Promise对象(一个成功调用(resolve),一个失败调用(reject))

```javascript
const newPromise = new Promise((resolve, reject) => resolve('成功')); 
const newPromise = new Promise((resolve, reject) => reject('失败'));
```

#### .then的两个回调方法对应着成功调用(resolve)和失败调用(reject)

```javascript
newPromise.then(value => console.log(value),reason => console.log(reason));
```

---

### 2.Promise的使用

#### 用于异步封装函数

```javascript
//用于异步封装ajax函数
function ajax(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText); //成功回调
            }else{
                reject(xhr.statusText);  //失败回调
            }
        }
        xhr.onerror = function () {
            reject(xhr.statusText)  //失败回调
        }
    })
}

//使用
let url = `http://127.0.0.1:5500/Promise/text.json`;
ajax(url).then(data => console.log(JSON.parse(data))); //获取后端传的数据
```

### Promise对象上的方法

##### Promise.resolve()和Promise.reject()

```javascript
Promise
    .resolve(Promise.reject(new Error('errorMessage')))
    .then(value => console.log(value),reason => console.log(reason.message));
    console.dir(Promise);
```

##### Promise.all() 

```javascript
//调用一次函数多次执行回调
const firstPromise = new Promise((resolve, reject) => {
    resolve('111');   
});
const secondPromise = new Promise((resolve, reject) => {
    reject('222');
});
Promise.all([firstPromise,secondPromise])   //这两个Promise必须都是成功回调才会执行.then的成功回
.then(value => console.log('resolve:', value),  //调函数，并返回一个数组分别是两个回调传的参数如果
      reason => console.log('reject:', reason)) //一个成功一个失败自会返回失败回调的参数，两个失败
.catch(value => console.log('catch:', value)) //则同两个成功
log => resolve: 222

//应用在ajax请求数据(根据用户名批量获取数据)
function getUsers(names) {
    let promises = names.map(name => {
        return ajax(`http://127.0.0.1:5500/Promise?name=${name}`);
    });
    return Promise.all(promises);
};
getUsers(['周星华','刘智绅']).then(users => {
    console.log(users);
});


```

##### Promise.allSettled()

```javascript
//与Promise.all()类似但不会被成功或失败回调影响相当于都是成功 返回的值是一个对象数组对象中有回调状态(成功和失败)和参数
const firstPromise = new Promise((resolve, reject) => {
    resolve('111');   
});
const secondPromise = new Promise((resolve, reject) => {
    reject('222');
});
Promise.allSettled([firstPromise,secondPromise])
.then(value => console.log('resolve:', value),reason => console.log('reject:',reason))
.catch(value => console.log('catch:', value))

log => resolve: [{status: 'fulfilled', value: '111'},{status: 'rejected', value: '222'}]
```

##### Promise.race()

```javascript
//与all || allSettled 类似发送若干个请求返回最早完成请求的值
const firstPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('111');
    },1000)
});
const secondPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('222');
    },2000)
});
Promise.race([firstPromise,secondPromise])
.then(value => console.log('resolve:', value),reason => console.log('reject:',reason))
.catch(value => console.log('catch:', value))

log => resolve: 111
```

### Promise任务队列(异步中的同步??)

```javascript
//按顺序执行Promise
//.then返回的是一个Promise 并将其赋值给原变量 即可形成Promise任务队列
let promise = Promise.resolve('1');
promise
.then(value => Promise.resolve('2'))
.then(value => Promise.resolve('3'))
.then(value => Promise.resolve('4'))
.then(value => Promise.resolve('5'))

function query(num){
    let promise = Promise.resolve();
    num.map( v => {
        promise = promise.then(_ => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(v);
                    resolve();
                },1000);
            });
        });
    });
}
query([1,2,3,4,5])
log => / 1 second log 1 , 2 , 3 , 4 , 5
```

### Async 和 Await(new Promise和.then的语法糖)

```javascript
//请求案例
async function get(){
    let data = await ajax('http://127.0.0.1:5500/Promise/text.json');
    //请求完成后才能执行以下输出
    console.log(data);
}
get();
```

##### Asunc 和 Await 包装定时器

```javascript
async function sleep(delay = 1000){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve()
        },delay)
    })
}
async function show() {
    for(const item of new Array(3).fill(1)){
        await sleep();
        console.log(item);
    }
}
show()
```

##### await 猜想

```javascript
function f1(user){
    let data = ajax(`http://localhost:8001/getname?name=${user}`);
    return data;
}
await f1();
//使用await执行一个异步函数时 会自动Promise封装这个函数
//不是
await f1(); //相当于f1().then(val => {})
//而是添加一个.then作为Promise的执行
await f1() = f1().then()
//函数体里的同步执行得等await返回数据后才能继续执行

```

##### await 错误处理

```javascript
//async函数外部处理
async function f2(){
    return await ajax('http://localhost:8001/getname?name=周星华');
}
f2()
.then(val => console.log(val))
.catch(error => {
    console.log(error.message)
})

//async函数内处理
async function f2(){
    try{
        return await ajax('http://localhost:8001/getname?name=周星华');
    }
    catch(error){
        console.log(error.message)
    }
}
```

