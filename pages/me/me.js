// pages/me/me.js
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


  /*复制微信号 */
  copyWechat:function(){
    wx.setClipboardData({
      data: 'Q845447380',
      success:function(){
        wx.showToast({
          title: '已将微信号复制到剪贴板',
          icon:'none'
        })
      }
    })
  },

  /*复制微博号 */
  copyWeibo: function () {
    wx.setClipboardData({
      data: '5只猫',
      success: function () {
        wx.showToast({
          title: '已将微博号复制到剪贴板',
          icon: 'none'
        })
      }
    })
  },


  /*复制qq号 */
  copyQQ: function () {
    wx.setClipboardData({
      data: '845447380',
      success: function () {
        wx.showToast({
          title: '已将qq号复制到剪贴板',
          icon: 'none'
        })
      }
    })
  },

})