// pages/index/index.js
var kit = require('../../utils/kit.js');
var startPot = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEyeClose: false, //用于判断用户是否点击了显示与隐藏
    eyeIconSrc: '/images/eye-show.png', //首页让信息显示的图标地址
    currentDate: '', //当前年份和月份（这里只存到 例如2018-01）
    resultValue: [], //结果数据列表
    showItemWay: 0, //显示明细方式 
    clickList: [], //用于首页每天的记录可以点击显示与隐藏
    down:false 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentTime();
    this.getRecordData(this.data.currentDate + '-1');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getRecordData(this.data.currentDate + '-1');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

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


  //打开记账页面
  OpenAddPage: function() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  //打开设置界面
  OpenSetPage: function() {
    wx.navigateTo({
      url: '/pages/set/set',
    })
    wx.ania
  },

  //改变眼睛图片
  SetEyeState: function() {
    this.setData({
      isEyeClose: !this.data.isEyeClose,
    });

    if (this.data.isEyeClose) {
      //console.log(this.data.isEyeClose);
      this.setData({
        eyeIconSrc: '/images/eye-hide.png'
      });
    } else {
      //console.log(this.data.isEyeClose);
      this.setData({
        eyeIconSrc: '/images/eye-show.png'
      });
    }

  },

  //打开每条记录详细
  openItemDetail: function(e) {
    console.log(e);
    var data=e.currentTarget.dataset.model;
    var recordModel = JSON.stringify(data);
    wx.navigateTo({
      url: '/pages/add/add?recordModel=' + recordModel,
    });
    console.log(recordModel);
  },

  //打开当前月账单计页面
  openCurrentMonthCount: function() {
    wx.navigateTo({
      url: '/pages/count/count?date=' + this.data.currentDate,
    })
  },

  //打开每日详细记录容器
  openDailyDetailContainer: function(e) {
    //console.log(e);

    var id = e.currentTarget.dataset.id;

    var list = this.data.clickList;

    list[id] = !list[id];

    //console.log(list);

    this.setData({
      clickList: list,
    });

  },

  /**
   * 获取记账记录
   */
  getRecordData: function(date) {
    var self = this;
    var params = {
      url: '/Record/GetRecords',
      method: 'POST',
      data: {
        date: date
      },
    };
    kit.wxRequest(params)
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.Data.DayRcord.length; i++) {
          console.log(res.data.Data.DayRcord[i].Date);
          res.data.Data.DayRcord[i].Date = self.dateFtt("yyyy-MM-dd",res.data.Data.DayRcord[i].Date);
          for (var j = 0; j < res.data.Data.DayRcord[i].Records.length; j++) {
            res.data.Data.DayRcord[i].Records[j].Date = self.dateFtt("yyyy-MM-dd", res.data.Data.DayRcord[i].Records[j].Date);
            //res.data.Data.DayRcord[i].Records[j].RecordDate = self.dateFtt("yyyy-MM-dd hh:mm:ss", res.data.Data.DayRcord[i].Records[j].RecordDate);
          }
        }
        self.setData({
          resultValue: res.data.Data,
        });
      })
  },
  /***
   * 格式化日期
   */
  dateFtt: function(fmt, dt) { 
    var date = new Date(dt);
    //console.log(date);
    if (fmt =="yyyy-MM-dd")
    {
      return date.getFullYear() + "-" + (parseInt(date.getMonth())+1) +"-"+ date.getDate()
    }
    else if (fmt == "yyyy-MM-dd hh:mm:ss")
    {
      return date.getFullYear() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }
  },
  /**
   * 选择年月份
   */
  selectDate: function(e) {
    var self = this;
    //console.log(e);
    var value = e.detail.value;
    self.setData({
      currentDate: value,
    });
    this.getRecordData(value + '-1');
  },

  /**
   * 获取系统当前时间 只返回到月份
   * */
  getCurrentTime: function() {
    var self = this;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    self.setData({
      currentDate: year.toString() + '-' + month.toString(),
    });
    return year.toString() + '-' + month.toString();
  },
  /**
   * 删除记账记录
   */
  deleteRecord: function(e) {
    var self = this;
    var recordID = e.currentTarget.dataset.model.ID;
    //console.log(recordID);
    wx.showModal({
      title: '删除',
      content: '是否删除',
      success: function(res) {
        if (res.confirm) {
          var params = {
            url: '/Record/DeleteRecord',
            method: 'POST',
            data: {
              recordID: recordID
            },
          };
          kit.wxRequest(params)
            .then((res) => {
              //console.log(res);
              if (res.data.Succeed == true) {
                wx.showToast({
                  title: '删除成功',
                })
                self.getRecordData(self.data.currentDate + '-1');
              } else {
                wx.showToast({
                  title: '删除失败',
                })
              }
            }, (res) => {
              wx.showToast({
                title: '删除失败',
              })
            })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 跳转到添加页面
   */
  addAccount:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  /**
   * 绑定滚动事件
   */
  bindScroll: function (e){
    var self=this;
    console.log(e);
    var deltaY = e.detail.deltaY;
    var scrollTop = e.detail.scrollTop;
    var scrollHeight=e.detail.scrollHeight;
    console.log(scrollTop);
    console.log(scrollHeight);
    if (scrollTop<10)
    {
        return;
    }
    if (scrollTop < 10 || deltaY > 5)
    {
      self.setData({
        down: false
      })
      return;
    }
    if (deltaY<-10)
    {
      self.setData({
        down:true
      })
    }
  },
  lower:function(e){
    
  }
})