//index.js
//获取应用实例
const app = getApp()
var Util = require("../../utils/util.js");
var order = ['red', 'yellow', 'blue', 'green', 'red']

Page({
  data: {
    skill: '你的技能:',
    missionTab: '#00e80e',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  countryBindTap: function() {
    wx.navigateTo({
      url: '../Province/province'
    })
  },
})
