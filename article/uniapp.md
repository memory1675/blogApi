# uniapp

* ### 交互反馈

  ```js
  //提示框
  uni.showToast({
  	title:'loading...', //提示文字
  	icon:'loading', //图标类型
  	duration:1000, //显示时长
  	mask:true, //遮罩
  	position:'top' //定位
  });
  uni.hideToast(); //关闭提示框
  //加载提示框
  uni.showLoading({})//显示加载提示框
  uni.hideLoading(); //关闭加载提示框
  //交互框
  uni.showModal({
  	title:'确定框',
  	content:'确定删除吗?',
  	showCancel:true,
  	confirmText:'删除',
  	cancelText:'返回',
  	cancelColor:'pink',
  	success(res){
  		if(res.confirm){
  			uni.showToast({
  				title:'删除成功！',
  			})
  		}else{
  			uni.showToast({
  				title:'取消删除！',
  				icon:'error'
  			})
  		}
  	},
  	fail(){
  		uni.showToast({
  			title:'删除失败！',
  			icon:'error'
  		})
  	}
  })
  //选项菜单
  uni.showActionSheet({
  	title:'选择操作！',
  	itemList:['删除','修改','添加'],
  	success(e) {
  		console.log(e.tapIndex + 1); //通过tabIndex获取选择选项数组下标
  	}
  })
  ```

  

* ### 设置导航条

  ```js
  //设置导航条的标题
  uni.setNavigationBarTitle({
  	title: '新的标题'
  });
  //设置导航条的样式
  uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
          duration: 400,
          timingFunc: 'easeIn'
      }
  })
  //在当前页面显示导航条加载动画。
  uni.showNavigationBarLoading();
  uni.hideNavigationBarLoading();
  //隐藏返回首页按钮。
  uni.hideHomeButton();
  ```

  