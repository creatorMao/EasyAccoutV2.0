var kit = require('../../utils/kit.js');
// pages/advice/advice.js
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  /**
   * 提交建议
   */
  postAdvice:function(e){
    var self = this;
    //console.log(e);
    var content = e.detail.value.content;
    if (content.length == 0) {
      wx.showToast({
        title: '写点意见再提交吧！emm....',
        icon: 'none'
      })
      return;
    }
    var data={
      formId: e.detail.formId,
      content: content
    }
    var params={
      url: '/Advice/Add',
      data: data,
      method: 'POST',
    };
    kit.wxRequest(params)
    .then((res)=>{
      if (res.data.Succeed) {
        wx.showToast({
          title: '提交成功',
        })
      }
      else {
        wx.showToast({
          title: '提交失败',
        })
      }
    },(res)=>{
      wx.showToast({
        title: '提交失败',
      })
    });
  }
})