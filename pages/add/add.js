// pages/add/add.js
var kit = require('../../utils/kit.js');
var timeTool = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '', //时期 2018-01-23 
    time: '', //时间  21：48
    swiperCurrentIndex: 0, //swiper 容器当前所在的index
    iconsList: {},
    recordModel: {
      SpecificID:'',
      ID:'',
      IconName:'',
      Money:'',
      Note:''
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var self = this;
    this.getCurrentTime();
    this.getIconsList().then((res)=>{
      if (options.recordModel) {
          self.initData(options.recordModel);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /***
   * 初始化数据
   */
  initData: function(recordModel) {
    var recordModel = JSON.parse(recordModel);
    console.log(recordModel);
    var self = this;
    var type = recordModel.Type;
    var list = self.data.iconsList;
    if (type == 0) //花费
    {
      //console.log("花费");
      for (var i = 0; i < list.costIconList.length; i++) {
        if (list.costIconList[i].ID == recordModel.SpecificID) {
          recordModel.IconName = list.costIconList[i].IconName;
          recordModel.SpecificID = list.costIconList[i].ID;
        }
      }
    } else if (type == 1) //收入
    {
      for (var i = 0; i < list.incomeIconList.length; i++) {
        if (list.incomeIconList[i].ID == recordModel.SpecificID) {
          recordModel.IconName = list.incomeIconList[i].IconName;
          recordModel.SpecificID = list.incomeIconList[i].ID;
          self.setData({
            swiperCurrentIndex: 1
          })
        }
      }
    }  
    var index= recordModel.RecordDate.indexOf("T");
    var time = recordModel.RecordDate.substr(index+1,5);
    console.log(time);
    self.setData({
      recordModel: recordModel,
      date: recordModel.Date,
      time: time
    })
  },
  /**获取系统当前时间 */
  getCurrentTime: function() {
    var self = this;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    self.setData({
      date: year.toString() + '-' + month.toString() + '-' + day.toString(),
      time: hour + ':' + minute,
    });
  },
  /**
   * 获取icon列表
   */
  getIconsList: function() {
    var that = this;
    var params = {
      url: '/Record/GetIconsList',
      method: 'POST',
      data: '',
    };
    return kit.wxRequest(params)
      .then((res) => {
        //console.log(res);
        that.data.iconsList = res.data.Data;
        that.setData({
          iconsList: that.data.iconsList
        });
      });
  },

  /*选择日期 */
  DatePickerValueChanged: function(e) {
    this.setData({
      date: e.detail.value,
    });
  },

  /*选择时间 */
  TimePickerValueChanged: function(e) {
    this.setData({
      time: e.detail.value,
    });
  },

  /*记一笔账单 */
  AddAnAccount: function(e) {
    var that = this;
    //console.log(e);
    var data = e.detail.value;
    data.formId = e.detail.formId;
    data.specificID = that.data.recordModel.SpecificID;
    data.recordDate = that.data.date + ' ' + that.data.time + ':' + new Date().getSeconds();
    data.ID = that.data.recordModel == null ? '' : that.data.recordModel.ID;
    //console.log(data);

    if (data.specificID == null || data.specificID == "" || data.specificID==undefined)
    {
        wx.showToast({
          title: '请选择一个类型',
          icon:'none'
        })
        return;
    }
    if (data.money == null || data.money == "" || data.money == undefined)
    {
      wx.showToast({
        title: '请选择金额',
        icon:'none'
      })
      return;
    }

    var params = {
      url: '/Record/Add',
      method: 'POST',
      data: data,
    };
    kit.wxRequest(params)
      .then((res) => {
        if (res.data.Succeed == true) {
          wx.showToast({
            title: '保存成功',
          });
          setTimeout(() => {
            wx.navigateBack({})
          }, 300)
        }
      });
  },
  //swiper的current发生改变，用户行进左右来回切换
  swiperCurrentChanged: function(event) {
    var current = event.detail.current;
    this.setData({
      swiperCurrentIndex: current,
    });
  },

  //选择一种方式
  ChooseAWay: function(event) {
    var self = this;
    var specificID = event.currentTarget.dataset.id;
    console.log(specificID);
    var list = self.data.iconsList.costIconList.concat(self.data.iconsList.incomeIconList)
    console.log(list);
    for (var i = 0; i < list.length; i++) {
      if (list[i].ID == specificID) {
        //console.log("23");
        var recordModel = self.data.recordModel;
        recordModel.SpecificID = list[i].ID;
        recordModel.IconName = list[i].IconName;
        self.setData({
          recordModel: self.data.recordModel
        })
      }
    }
  },
  /**
   * 绑定输入
   */
  bindblur:function(e){
    console.log(e);
    var self=this;
    var target=e.target.id;
    switch (target)
    {
      case "money":
      self.data.recordModel.Money=e.detail.value;
      break;
      case "note":
      self.data.recordModel.Note = e.detail.value;
      break;
    }
    self.setData({
      recordModel:self.data.recordModel
    })
  }
})