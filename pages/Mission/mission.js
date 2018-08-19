//index.js
//获取应用实例

Page({
  data: {
    city:null,
    missions: [{ id: 1, title: "任务#1", text: "呵呵呵", show: true, allItem: [{ id: 1, paths: [], text: "" }] }, { id: 2, title: "任务#2", text: "呵呵", show: false, allItem: [{ id: 2, paths: [], text: "" }] }],
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    if(option.city != null){
      this.data.city = option.city;
    }else if(option.item != null){
      var temp = JSON.parse(option.item);
      console.log(temp);
      this.data.missions[temp.id - 1] = temp;
    }
    console.log(wx.getStorageSync("heheda"))
    this.setData({
      city: this.data.city,
      missions: this.data.missions
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //展示任务的信息//
  showMissionDes: function (event) {
    for (var i = 0; i < this.data.missions.length; i++){
      console.log(this.data.missions[i].id);
      if(this.data.missions[i].id == event.currentTarget.dataset.id){
        this.data.missions[i].show = !this.data.missions[i].show;
        this.setData({
          missions: this.data.missions,
        })
        console.log(this.data.missions[i].id);
        break;
      }
    }
  },

  //跳转到该任务进行编辑
  OpenEditMissionPlane:function(e){
    var index = e.currentTarget.dataset.id-1;
    var item = JSON.stringify(this.data.missions[index]);
    wx.navigateTo({
      url: '../EditorMission/editormission?item=' + item
    })
  },

  //添加多一个书写对象
  addNewItem: function () {
    var count = this.data.missions.length + 1;
    var newItem = { id: count, title: "任务#" + count, text: "呵呵呵", show: false, allItem: [{  paths: [], text: null }] };
    this.data.missions.push(newItem);
    this.setData({ missions: this.data.missions });
  },
})
