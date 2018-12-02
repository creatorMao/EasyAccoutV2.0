// pages/count/count.js

/*引用图表插件*/
var wxCharts = require('../../common/wxcharts.js');
var ringChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {   
    rawList:[],                                                                  //原始数据
    resultList: [],                                                              //由于插件的图表的数据 有一定的格式
    colors: ['#20b6ab', '#00a294', '#eeb328', '#f79954', '#ef7340', '#e95e45'],  //图表的每个类型的颜色
    sum:0,                                                                       //支出/收入 总和 
    currentDate:'',                                                              //当前的日期（只记录年份和月份）
    isClicked:false,                                                             //用于判断用于选择的是支出还是收入
    height:0,
    width:0,
  },

  //点击图表具体项
  touchHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },

  //更新数据 主要用于支出 收入 两种之间的转换
  updateData: function () {
    var self=this;
    if(this.data.isClicked==false)
    {
      if (!this.data.rawList.costcount.length==0)
      {
        var list = [];
        for (var i = 0; i < this.data.rawList.costcount.length; i++) {
          list.push({
            name: this.data.rawList.costcount[i].SpecificWay,
            data: parseInt(this.data.rawList.costcount[i].Sum),
          });
        }
        console.log(list);
        this.setData({
          resultList: list,
        })
        ringChart.updateData({
          series: this.data.resultList,
          title: {
            name: this.data.rawList.AllCost,
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '总支出',
            color: '#666666',
            fontSize: 15
          },
          width: self.data.width,
        });
      }
      else
      {
          ringChart.updateData({
            series: [{ name: '', data: 1 }],
            title: {
              name: '无数据',
              color: '#7cb5ec',
              fontSize: 25
            },
            subtitle: {
              name: '总支出',
              color: '#666666',
              fontSize: 15
            },
            width: self.data.width,
          });
      }
    }
    else
    {
      if (!this.data.rawList.incomecount.length==0)
      {
        var list = [];
        for (var i = 0; i < this.data.rawList.incomecount.length; i++) {
          list.push({
            name: this.data.rawList.incomecount[i].SpecificWay,
            data: parseInt(this.data.rawList.incomecount[i].Sum),
          });
        }
        console.log(list);
        this.setData({
          resultList: list,
        })
        ringChart.updateData({
          series: this.data.resultList,
          title: {
            name: this.data.rawList.AllIncome,
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '总收入',
            color: '#666666',
            fontSize: 15
          },
          width: self.data.width,
        });
      }
      else
      {
        ringChart.updateData({
          series: [{name:'',data:1}],
          title: {
            name: '无数据',
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '总收入',
            color: '#666666',
            fontSize: 15
          },
          width: self.data.width,
        });
      }
    }
    console.log(this.data.width+'update...');
  },     


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);
    var date = options.date+'-'+'01';
    this.setData({
      currentDate: options.date,
    });
    var self = this;
    var userid = getApp().globalData.useropenid;
    console.log(userid);
    wx.request({
      url: '' + userid,
      data: {
        datetime: date,
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        var result = JSON.parse(res.data);
        console.log(result.costcount);

        var list = [];
        for (var i = 0; i < result.costcount.length; i++) {
          list.push({
            name: result.costcount[i].SpecificWay,
            data: parseInt(result.costcount[i].Sum),
          });
        }
        
        self.setData({
          resultList: list,
          rawList: result,
        })
        console.log(self.data.rawList);

        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          var itemWidth = res.screenWidth/100;
          windowWidth = (res.screenWidth - itemWidth*4)-20;
          self.setData({
            width: windowWidth
          });
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        console.log(windowWidth);

        ringChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'ring',
          title: {
            name: self.data.rawList.AllCost,
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '总支出',
            color: '#666666',
            fontSize: 15
          },
          series: self.data.resultList.length != 0 ? self.data.resultList:[{name:'',data:1}],
          width: self.data.width,
          height: 300,
          dataLabel: true,
          legend: false,
        });
      }
    })

    
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取系统信息
    var self=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        self.setData({
          height: res.windowHeight-15,
        })
      }
    })
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


  //选择日期
  SelectDate: function (e) {
    var self = this;
    this.setData({
      currentDate: e.detail.value,
    });

    var self = this;
    var userid = getApp().globalData.useropenid;
    console.log(userid);
    wx.showLoading({
      title: '获取数据中...',
    });
    wx.request({
      url: '' + userid,
      data: {
        datetime: e.detail.value,
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        var result = JSON.parse(res.data);
        console.log(result.costcount);
        var list = [];
        var sum = 0;
        for (var i = 0; i < result.costcount.length; i++) {
          list.push({
            name: result.costcount[i].SpecificWay,
            data: parseInt(result.costcount[i].Sum),
          });
          sum = sum + parseInt(result.costcount[i].Sum);
        }
        console.log(list);
        self.setData({
          resultList: list,
          sum: sum,
          rawList: result,
        })
        console.log(self.data.rawList);

        //self.updateData();

        /*var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.screenWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        console.log(windowWidth);*/

        
        ringChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'ring',
          title: {
            name: self.data.sum.toString(),
            color: '#7cb5ec',
            fontSize: 25
          },
          subtitle: {
            name: '总支出',
            color: '#666666',
            fontSize: 15
          },
          series: self.data.resultList.length != 0 ? self.data.resultList : [{ name: '', data: 1 }],
          width: self.data.width,
          height: 300,
          dataLabel: true,
          legend: false,
        });
        console.log(self.data.width+'233');

        wx.hideLoading();

      },
      fail:function(res){
        wx.hideLoading();
        console.log(res);
        wx.showToast({
          title: '数据获取失败',
        })
      }
    })


  },


  //转换 支出 收入
  switch:function(){
      console.log(this.data.isClicked);

      this.setData({
        isClicked:!this.data.isClicked,
      });
      this.updateData();

      console.log(this.data.isClicked);

      
  }

})