

const app = getApp()
let sliderWidth = 96;

Page({
  data: {
    tabs: ["动态", "我的医生"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


  },

  onLoad: function () {
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
