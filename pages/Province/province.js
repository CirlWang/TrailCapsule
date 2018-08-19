//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    provinceTitle: "",
    cityTitle: "",
    provinces: [ "广东","黑龙江","北京","天津","上海","重庆","河北","山西","辽宁","吉林","江西","江苏","安徽"],
    cities: [ "广州","深圳","佛山","东莞","中山","珠海","江门","肇庆","惠州","汕头","潮州","揭阳","阳江"],
    center_fontSize:15,
  },

  //选择省份
  selectProvince: function (event) {
    this.setData({
      provinceTitle: event.currentTarget.dataset.name,
    })
  },

  //选择城市
  selectCity: function (event) {
    /*this.setData({
      cityTitle: event.currentTarget.dataset.name,
    })*/
    wx.navigateTo({
      url: '../Mission/mission?city=' + event.currentTarget.dataset.name
    })
  },
})
