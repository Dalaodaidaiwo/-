const app = getApp()
let sliderWidth = 96;

Page({
    data: {
        tabs: ["分析数据", "提交数据"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            },
            fail:function(e){
              console.log(e);
             console.log("GG");
            }
        });
    },
    tabClick: function (e) {
        console.log(e);
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
})
