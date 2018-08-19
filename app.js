//app.js
var Util = require("utils/util.js");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //this.Login();
  },

  // 登录
  Login:function(){
    console.log("app login")
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.loginCode = res.code;

        that.GetSetting();
      }
    })
  },

  // 获取用户信息
  GetSetting:function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserInfo();
        } else {
          //未授权
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              this.getUserInfo();
            }
          })
        }
      }
    })
  },

  getUserInfo: function () {
    var that = this;
    //获取用户信息
    wx.getUserInfo({
      withCredentials:true,      
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        //this.globalData.userInfo = res.userInfo        

        wx.request({
          url:this.globalData.ipAddress,
          data: {
            id:"1001",
            code: this.globalData.loginCode,
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          header:{
            "content-type": "application/json",
            "Cookie": wx.getStorageSync("3rd_session"),
          },
          method:"POST",
          success: function(result){
            console.log(result)
            var session = result.data;

            wx.setStorageSync("3rd_session", session.toString());
            console.log("setStorageSync:" + wx.getStorageSync("3rd_session"));
            //that.globalData.userInfo = result.data;
          },
          fail: function(result){
            console.log(result)
          }
        })

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  
  ServerFailResult:function(){
    
  },

  globalData: {
    userInfo: null,
    loginCode: null,  //登录成功的code(有效期只有五分钟)
    ipAddress: "http://localhost:8080/"
  }
})