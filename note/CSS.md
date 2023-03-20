# CSS笔记

### background

```css
/* 
设置背景是否重复 
no-repeat =>不重复只显示一张  
repeat => 重复
repeat-x => 水平方向重复
repeat-y => 垂直方向重复
*/
background-repeat:no-repeat;  
/*
第一个参数为宽度
第二个参数为长度
cover 扩大到覆盖整个元素
contain 图像的像素
*/
background-size:100vw 100vh;
/*
两个参数
如果只传一个参数那么第二个参数默认为center
top left
top center
top right
center left
center center
center right
bottom left
bottom center
bottom right
x% y%
xpos ypos
*/
background-position: center
/*
定义background-position相对什么来定位
padding-box => 内边距框
border-box => 边框盒
content-box => 内容框
*/
background-origin: content-box
/*
border-box	背景被裁剪到边框盒。	
padding-box	背景被裁剪到内边距框。	
content-box 背景被裁剪到内容框。
*/
background-clip:content-box;
/*
设置背景定位方式
scroll	默认值。背景图像会随着页面其余部分的滚动而移动。
fixed	当页面的其余部分滚动时，背景图像不会移动。
inherit	规定应该从父元素继承 background-attachment 属性的设置。
*/
background-attachment:fixed;
```

### 