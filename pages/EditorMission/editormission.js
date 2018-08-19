//index.js
//获取应用实例

Page({
  data: {
    city: null,
    item:null,
    imagesMax: 1,
  },
    
  onLoad: function (item) {
    console.log(item)
    if (item.item != null){
      var value = JSON.parse(item.item);
      this.data.item = value;
    }else{
      this.data.item = { id: 1, title: "任务#1", text: "111", show: true, allItem: [{ id: 1, paths: [], text: "1" }] };
    }

    this.setData({
      item: this.data.item
    })
    console.log(this.data.item)
  },

  //返回上一页//
  OnNavigateBack:function(){
    wx.navigateBack({
      
    });
  },

  //选择图片
  choseImge: function (event) {
    var index = event.currentTarget.dataset.id-1;
    var that = this;
    wx.chooseImage({
      count: this.data.imagesMax,
      success: function(res) {
        that.data.item.allItem[index].paths = res.tempFilePaths;
        console.log(that.data.item.allItem[index].paths)
        that.setData({
          item: that.data.item
        })
      },
    })
  },

  //预览图片  
  previewImge: function (e) {
    var current = e.target.dataset.src-1;
    wx.previewImage({
      current: current,
      urls: this.data.item.allItem[current].paths
    })
  },

  //文本输入完成 
  textFinish: function (e) {
    //console.log(e.target.dataset.id - 1)
    //console.log(this.data.item.allItem[e.target.dataset.id - 1])
    this.data.item.allItem[e.target.dataset.id - 1].text = e.detail.value;
    this.setData({ item: this.data.item });
  },

  //标题输入完成 
  titleFinish: function (e) {
    this.data.item.title = e.detail.value;
    this.setData({ item: this.data.item });
  },

  //添加多一个书写对象
  addNewItem:function(){
    var newItem = { id: this.data.item.allItem.length+1, paths:[], text:null};
    this.data.item.allItem.push(newItem);    
    this.setData({ item: this.data.item});
  },

  //保存并返回数据到任务列表界面
  SaveItemsToMissionPlane:function(){
    console.log(this.data.item)
    var result = JSON.stringify(this.data.item);
    wx.navigateTo({
      url: '../Mission/mission?item=' + result,
    })
  }
})
