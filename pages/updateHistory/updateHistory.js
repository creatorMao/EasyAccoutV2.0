var kit=require('../../utils/kit.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      updateHistory:[
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    var parmes={
      url:'/log/GetUpdateLog',
      method: 'POST',
    }
    kit.wxRequest(parmes)
    .then((res)=>{
      var data = res.data.Data;
      for (var i = 0; i < data.length; i++) {
        //不知道为什么用"-"分割出来之后，会对出一条空白的数据，暂时先把第一条删掉，后续再回来看这个问题
        var updateLogList = data[i].Content.split("-").slice(1);
        data[i].Content = updateLogList;
      }
      console.log(data);
      self.setData({
        updateHistory: data
      })
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
  
  }
})