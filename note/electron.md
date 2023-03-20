# Electron

* #### BrowserWindow

```js
const {  BrowserWindow, app } = require('electron');
app.whenReady().then(res => {   //类似于window.onready
    const win = new BrowserWindow({  //创建一个窗口  new 一个实例
         width: 600,     //窗口宽度
         height: 700,    //窗口高度
         alwaysOnTop:true,   //
         x:200,             //屏幕位置x轴
         y:1000,          //y轴
         frame:false,   //窗口栏
         transparent: true  //窗口大小随父亲改变
    })
    // win.webContents.toggleDevTools()
    win.setAspectRatio(1)   //比例 1：1
    win.loadFile(path.resolve(__dirname,'index.html'))   //加载文件
    win.loadURL('')  //加载网站
})
```



* #### package.json配置

  ```json
  {
    "name": "electron",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",  //electron的main文件
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "nodemon --exec electron ." //配置快捷命令
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "electron": "^23.1.1"
    }
  }
  
  ```

  

* #### electron+nodemon实现模块热更新

  安装nodemon

  ```js
  npm i install -g nodemon
  ```

  配置nodemon的config

  nodemon.json

  ```json
  {
      "ignore": [  //忽略
          "node_modules",
          "dist"
      ],
      "colours": true,
      "verbose": true,
      "restartable": "res",
      "watch":[
          "*.*"
      ],
      "ext":"html,js,css"  //热更新的文件扩展名
  }
  ```

  

* #### electron结合vite-vue

  首先安装一个concurrently

  这个作用就是能一次性跑vite和electron两个命令

  ```js
  //相关配置
  "scripts": {
      "dev": "concurrently \"vite\" \"electron .\"",
  }
  //electron结合vite要想使用commonjs的语句都在js扩展名前加上c => .cjs
  win.loadURL('http://localhost:5173/')
  ```

  

* #### preload跟主进程通信

  ```js
  //preload.js  => 子
  const {ipcRenderer,contextBridge} = require('electron')
  
  contextBridge.exposeInMainWorld('api',{
      a: () => {
          ipcRenderer.send('saveFile')
      }
  })
  
  //renderer.js  => 孙
  window.api.a()
  
  //main.js
  const {ipcMain} = require('electron')
  ipcMain.on('saveFile',() => {
      console.log('saveFile@@@@@@@@@@@@@@');
  })
  
  
  //主要过程  => 父
  renderer.js渲染进程中不能在通过ipcRendrer接口向main.js发送数据得依靠preload.js进程
  而renderer进程不能直接在window上添加全局参数只能通过contextBridge.exposeInMainWorld
  方法向全局对象window上添加数据
  preload进程可以通过ipcRenderer.send方法发送数据到主进程上
  在main进程使用ipcMain.on接收事件
  
  子不能再window对象上添加参数
  
  相当于vue里的自定义事件来实现通信
  
  
  在preload预加载进程中可以与main主进程通信   通过ipcRenderer.send('string')
  
  在renderer渲染进程中可以与preload进程通信  通过在preload进程中使用contextBridge.exposeInMain
  World('string',参数)与renderer进程通信  传递回调使得renderer可以使用preload中的ipcRenderer
  
  所以renderer进程想与main进程通信得借助preload进程  通过ipcMain.on('string',回调函数)执行...
  ```
  
  ![image-20230226125436012](C:\Users\28568\AppData\Roaming\Typora\typora-user-images\image-20230226125436012.png)
  
  
  
  

* #### 设置安全策略

  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline';">
  ```

  

* #### BrowserWindow事件

  ```js
  const {app,BrowserWindow} = require('electron')
  const path = require('path')
  const createWindow = () => {
      const win = new BrowserWindow({
          width:300,
          height:300,
          show:false,
      })
      win.loadFile(path.resolve(__dirname,'index.html'))
      win.webContents.toggleDevTools()
      //once设置事件   但只触发一次
      win.once('ready-to-show',() => {
          win.show()
      })
      //on设置事件
      win.on('close',() => {   //窗口关闭的事件
          console.log('is been close');
      })
      win.on('ready-to-show',() => {   //准备显示的事件
          win.show()
          console.log('is been ready to show');
      })
      
  }
  ```

  