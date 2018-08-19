//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    arrary: [{id:"1",name:"wang",label:"jita"}]
  },

  //事件处理函数
  searchBinTap: function () {
    /*wx.navigateTo({
      url: '../logs/logs'
    })*/
    
    this.getData();
  },

  getData:function(){
    var that = this;  //这个地方是函数的this，为了在回调时使用

    wx.request({
      url: "http://localhost:8080/",
      header:{
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        x: 12,
        y: 32
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          arrary: res.data
        })        
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  btnSearch: function () {
    wx.showToast({
      title: '哈哈',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
