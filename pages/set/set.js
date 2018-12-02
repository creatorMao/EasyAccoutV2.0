// pages/set/set.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDetailWayList: ['只显示当天', '全部展开', '全部收起'],  //明细显示方式列表
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  /**
   * 从本地获取用户信息
   */
  getUserInfo:function(){
    var userInfo = wx.getStorageSync("userInfo");
    this.data.userInfo = userInfo
    this.setData({
      userInfo: userInfo
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //跳转到更新历史界面
  NavigateToUpdateHistoryPage:function(){
    wx.navigateTo({
      url: '/pages/updateHistory/updateHistory',
    })
  },


  /*跳转到建议窗口*/
  giveMeAdvice:function(e){
      wx.navigateTo({
        url: '/pages/advice/advice',
      })
  },

  /*打开关于作者页面*/
  NavigateToAboutMePage:function(){
    wx.navigateTo({
      url: '/pages/me/me',
    })
  }
  
})