### DOM

##### window.getComputedStyle

```js
getComputedStyle(element)

console.log(getComputedStyle(element).width);
log => element width
```

##### document.documentElement.style.setProperty

```js
document.documentElement.style.setProperty(:root,'')//:root样式名 ''样式值
```

##### document.querySelector

```js
document.querySelector('.item') //=> className为item的第一个元素
document.querySelector('#item') //=> id为item的元素
```

##### element.getAttribute

```js
<a href="#"> </a>
const a = document.querySelector('a')
a.href // => http://localhost:8080/#
a.getAttribute('href')  //=> #
```

##### element.dataset

```js
<div data-version-number="3.0"></div>
const div = document.querySelector('div')
div.dataset //=>获取以data开头的以对象形式输出的参数
div.dataset.versionNumber  // => 输出3.0  后面参数以驼峰命名
```

##### classList

```js
element.classList.add() //element添加一个类
element.classList.remove() //element移除一个类
element.classList.toggle() //element添加删除切换一个类
element.classList.contains() //element是否包含此类名

```

##### document.scrollIntoView

```js
document.scrollIntoView({behavior:'smooth'}); // => 移动到document的位置 参数为配置 smooth:平滑的
```

##### document.childNodes

```js
document.childNodes // => 所有子节点
document.child // => 直系子节点
document.firstElementChild // =>第一个直系子节点
document.lastElementChild // =>最后一个直系子节点
document.parentNode //=> 父节点
document.patentElement //=> 父节点
document.closest(选择器) //=>
document.previousElementSibling // => 兄弟节点
document.nextElementSibling // => 下一个节点
document.previousSibling // => 兄弟节点对象
document.nextSibling // => 下一个节点对象
```

