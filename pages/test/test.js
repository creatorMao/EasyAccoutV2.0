// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  get1:function a(){
    console.log("get1");
    //1.创建一个promise对象，传入一个带有两个参数的函数
    //2.在这个函数里面写上相应的异步代码，异步方法成功的地方，写上resolve(res) 将结果传出来  以前是在这个地方写上一个回调函数
    //3.错误的地方 用reject(res) 将结果传出来
    var getLocation=new Promise((resolve,reject)=>{            
     setTimeout(()=>{
        resolve(1);
     },1000);
    });

    //解释同上
    var openLocation=new Promise((resolve,reject)=>{
       setTimeout(()=>{
          resolve(233);
       },2000);
    });

    //1.在外部调用这个promise对象的then()方法。
    //2.then()方法有两个参数，第一个成功的参数，第二个是失败的参数  参数是一个函数
    //3.相当于以前写在异步方法中的回调函数 现在写到这个位置上
    //4.调用链
    //5.then()的返回值是又是一个新的promise的对象，因此可以在后面继续then()实现以前的异步嵌套。
    //6.返回的新的promise对象的值具体取决于上一次resolve回调函数的返回值。
    //7.如果是一个普通的变量，那么继续then()会直接跳到resolve中
    //8.如果是一个promise对象的话，那么就等着...
    getLocation                
    .then((res)=>{
      console.log("成功了");
      console.log(res);
      return Get3(res);
    },(res)=>{
      console.log("失败了");
      console.log(res);
    })
    .then((res)=>{
      console.log("打开定点成功");
      console.log(res);
    },()=>{

    });

  },

  get2:()=>{
    console.log("get2");
    wx.getLocation({
      success:(res)=>{
        console.log(res);
      },
      fail:(res)=>{
        console.log(res);
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})


function Get2()
{
  console.log("get2");
}


function Get3(num)
{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(num+1);
      },2000);
  });
}