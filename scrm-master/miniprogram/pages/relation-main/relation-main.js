

const app = getApp()
let sliderWidth = 96;

Page({
  data: {
    tabs: ["我的好友", "我的医生"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


  },

  onLoad: function () {
    if(app.globalData.userInfo.doctor=="0"){
      this.setData({
          tabs:["我的好友","我的医生"]
      })   
  }
  else{
      this.setData({
          tabs:["我的病人","我的同事"]
      })
  }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

wx.cloud.callFunction({
  name:'ini_relations',

  success:function(res){
 console.log(res);
 console.log("INI_relation");
  },
  fail:console.error
})
    
    
  },

  tabClick: function (e) {
    console.log(e);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})
