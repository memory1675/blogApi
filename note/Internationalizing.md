### 数据格式化

##### Number

```javascript
const num = 3992333.30;
console.log(navigator.language, new Intl //navigator是电脑属性
  .NumberFormat(navigator.language)
  .format(num));
log => zh-CN 3,992,333.3

const options = {  //设置类型
  style: 'currency', 
  unit: 'celsius',
  currency: 'RMB'
}

console.log(navigator.language, new Intl
  .NumberFormat(navigator.language,options)  //使用
  .format(num));
log => zh-CN RMB 3,992,333.30
```

##### Date

```js
const now = new Date();
console.log(new Intl.DateTimeFormat(zh-CN).format(now));
log => 2023/2/8

const optionsOfDate = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
}
console.log(new Intl.DateTimeFormat('zh-CN',optionsOfDate).format(now));
log => 2023/2/8 18:18:41
```



