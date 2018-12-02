const requestRoot = "";
//const requestRoot = "http://localhost:90";

function wxRequest(params)
{
  //获取本地的sessionID数据
  var sessionID = wx.getStorageSync("SessionID");
  //console.log(sessionID);
  
  return new Promise((resolve, reject)=>{
    wx.request({
      url: requestRoot + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'ASP.NET_SessionId=' + sessionID
      },
      success:(res)=>{
        if(res.data.State==2) //session过期
        {
          login().then((res)=>{
            return wxRequest(params)
              .then((res) => {
                resolve(res);
              }) //load again
          })
        }
        else
        {
          resolve(res); 
        }
      },
      fail:(res)=>{
        reject(res);
      },
      complete:(res)=>{

      }
    })
  });
}

function login()
{
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '正在登录...',
    })
    wx.login({
      success: (res) => {
        wx.request({
          url: requestRoot + '/User/Login',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: (res) => {
            console.log(res);
            console.log(res.data.State == 0);
            if (res.data.State == 0)//未注册
            {
              wx.reLaunch({
                url: '/pages/guide/guide',
              })
            }
            else {
              //设置sessionid和基本的用户信息
              wx.setStorage({
                key: 'SessionID',
                data: res.data.SessionID,
              })
              wx.setStorage({
                key: 'userInfo',
                data: res.data.Data
              })
              resolve(res);
            }
          },
          fial: () => {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
            reject(res);
          },
          complete: () => {
            wx.hideLoading();
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  });
}

function register(res)
{
  return new Promise((resolve, reject)=>{
    wx.login({
      success: (result) => {
        var userInfo = res.detail.userInfo;
        userInfo.code = result.code;
        console.log(userInfo);
        wx.request({
          url: requestRoot + '/User/Register',
          data: userInfo,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: (res) => {
            console.log(res);
            if (res.data.Succeed)//注册成功
            {
              //设置sessionid和基本的用户信息
              wx.setStorage({
                key: 'SessionID',
                data: res.data.SessionID,
              })
              wx.setStorage({
                key: 'userInfo',
                data: res.data.Data
              })
              wx.reLaunch({
                url: '/pages/index/index',
              })
              resolve(res);
            }
          },
          fial: (res) => {
            reject(res);
          },
          complete: () => {

          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  });
  
}


module.exports = {
  wxRequest,
  login,
  register
}