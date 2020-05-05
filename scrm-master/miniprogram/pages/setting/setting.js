Page({
  data: {
    setting: {},
    show: false,
    screenBrightness: '获取中',
    keepscreenon: false,
    SDKVersion: '',
    enableUpdate: true,
    indexPage: {},
  },
  
  hide () {
    this.setData({
      show: false,
    })
  },
  updateInstruc () {
    this.setData({
      show: true,
    })
  },
  onShow () {
    let pages = getCurrentPages()
    let len = pages.length
    let indexPage = pages[len - 2]
    // 不能初始化到 data 里面！！！！
    this.setData({
      keepscreenon: getApp().globalData.keepscreenon,
      indexPage,
    })
   
    this.getScreenBrightness()
    wx.getStorage({
      key: 'setting',
      success: (res) => {
        let setting = res.data
        this.setData({
          setting,
        })
      },
      fail: (res) => {
        this.setData({
          setting: {},
        })
      },
    })
  },
  
  getScreenBrightness () {
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          screenBrightness: Number(res.value * 100).toFixed(0),
        })
      },
      fail: (res) => {
        this.setData({
          screenBrightness: '获取失败',
        })
      },
    })
  },
  
  setKeepScreenOn (b) {
    wx.setKeepScreenOn({
      keepScreenOn: b,
      success: () => {
        this.setData({
          keepscreenon: b,
        })
      },
    })
  },
  getHCEState () {
    wx.showLoading({
      title: '检测中...',
    })
    wx.getHCEState({
      success: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '该设备支持NFC功能',
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#40a7e7',
        })
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '该设备不支持NFC功能',
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#40a7e7',
        })
      },
    })
  },
  setScreenBrightness (val) {
    wx.setScreenBrightness({
      value: val / 100,
      success: (res) => {
        this.setData({
          screenBrightness: val,
        })
      },
    })
  },
  screenBrightnessChanging (e) {
    this.setScreenBrightness(e.detail.value)
  },
  switchChange(e) {
    let dataset = e.currentTarget.dataset
    let switchparam = dataset.switchparam
    let setting = this.data.setting
    if (switchparam === 'forceUpdate') {
      if (this.data.enableUpdate) {
        setting[switchparam] = (e.detail || {}).value
      } else {
        setting[switchparam] = false
        wx.showToast({
          title: '基础库版本较低，无法使用该功能',
          icon: 'none',
          duration: 2000,
        })
      }
    } else if (switchparam === 'keepscreenon') {
      this.setKeepScreenOn(!this.data.keepscreenon)
      getApp().globalData.keepscreenon = !this.data.keepscreenon
    } else {
      setting[switchparam] = !(e.detail || {}).value
    }
    this.setData({
      setting,
    })
    wx.setStorage({
      key: 'setting',
      data: setting,
      success: () => {
       
      },
    })
  },
  getsysteminfo () {
    wx.navigateTo({
      url: '/pages/systeminfo/systeminfo',
    })
  },
  async removeStorage (e) {
    const db = wx.cloud.database();
    const _ = db.command;
    let that = this;
    let datatype = e.currentTarget.dataset.type;

    if (datatype === 'setting') {
      wx.showModal({
        title: '提示',
        content: '确认要初始化设置',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success: (res) => {
          if (res.confirm) {
             wx.cloud.callFunction({
              name:'remove'
            }),
            // wx.cloud.callFunction({
            //   name: 'add',
            //   data:{
            //     a:5,b:6
            //   }
            
            // .then((res) => {
            //   console.log(" ???????? OK")
            //   console.log(res)
            //   wx.showToast({
            //     title: 'INI OK',
            //   })
           // }),
            // db.collection("card-items").doc("55ce5f2e-8a1b-4157-a783-f14015d7dd08").update({
            //   data:{
            //    cellphpne: "",
            //    companyName:"",
            //    nickName:"",
            //    realName:"",
            //    title:"",
            //    avatar:""
            //   }, 
            // success:function(res){
            // cosole.log("REOMVE OK");
            //  }
            // });
            wx.removeStorage({
              key: 'setting',
              success: function (res) {
                wx.showToast({
                  title: '设置已初始化',
                })
                that.setData({
                  setting: {},
                })
                //that.data.indexPage.reloadInitSetting()
              },
            })
          }
        },
      })
    } 
    
    else if (datatype === 'all') {
      wx.showModal({
        title: '提示',
        content: '确认要删除',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success (res) {
          if (res.confirm) {
            wx.clearStorage({
              success: (res) => {
                wx.showToast({
                  title: '数据已清除',
                })
                that.setData({
                  setting: {},
                  pos: {},
                })

               // that.data.indexPage.reloadInitSetting()
              
              },
            })
          }
        },
      })
    }
  },

})