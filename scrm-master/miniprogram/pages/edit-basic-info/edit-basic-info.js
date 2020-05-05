const app = getApp();
Page({
  data: {
    userInfo: {},
    address: "",
    name: "",
    school: "",
    speciality: "",
    hometown: "",
    companyName: "",
    cellphone: "",
    title: "",
    openid: "",
    counterId: "",
    userId: ""
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  async toEditMain(e) {
    const db = wx.cloud.database()
    const _ = db.command
    
    await wx.cloud.callFunction({
      name: 'editMsg',
      data: {
        nickName: this.data.name,
        cellphone: this.data.cellphone,
        companyName: this.data.companyName,
        title: this.data.title,

        hometown: this.data.hometown,
        speciality: this.data.speciality,
        school: this.data.school,
        openid: app.globalData.userInfo.openid
      }
    })

 
    wx.navigateBack({
      delta: 1
    });
  },
  bindcompanyNameInput: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    
  },
  bindnameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
   
  },
  bindcellphoneInput: function (e) {
    this.setData({
      cellphone: e.detail.value
    })
   
  },
  bindtitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
   
  },
  bindhometownInput: function (e) {
    this.setData({
      hometown: e.detail.value
    })
   
   
  },
  bindspecialityInput: function (e) {
    this.setData({
      speciality: e.detail.value
    })

  },
  bindschoolInput: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  chooseLocation(e) {
    let that = this;
    wx.getLocation({
      type: "gcj2",
      success: function (res) {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: function (res) {
            that.setData({
              address: res.address
            });
          }
        })
      }
    });
  }
})