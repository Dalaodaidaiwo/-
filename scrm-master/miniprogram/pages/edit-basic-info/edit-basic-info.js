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
    toEditMain(e){
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('card-items').doc("1584168811451_0.20173603248867011_33574151").update({
        data: {
          nickName: this.data.name,
          cellphone: this.data.cellphone,
          companyName: this.data.companyName,
          title: this.data.title,
          realName: this.data.name,
          userId: this.data.userInfo.userId

        },
        success: res => {
          this.setData({
            name: this.data.name,
            cellphone: this.data.cellphone,
            companyName: this.data.companyName,
            title: this.data.title,
            realName: this.data.name
          })
        },
        fail: err => {
          icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
        }
      }),

        db.collection('card-details').doc("31812d39-2849-483e-b344-8ea364c507ce").update({
         data: {
            hometown: this.data.hometown,
            speciality: this.data.speciality,
            school: this.data.school,
            userId:  this.data.userInfo.userId

          },
          success: res => {
            this.setData({
              hometown: this.data.hometown,
              speciality: this.data.speciality,
              school: this.data.school
            })
            console.log("DB OKK");
          },
          fail: err => {
            icon: 'none',
              console.error('[数据库] [更新记录] 失败：', err)
          }

        }),
        wx.navigateBack({
            delta: 1
        });
    },
  bindcompanyNameInput: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    console.log(e.detail.value)
    console.log(e)
  },
  bindnameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindcellphoneInput: function (e) {
    this.setData({
      cellphone: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindtitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindhometownInput: function (e) {
    this.setData({
      hometown: e.detail.value
    })
    console.log(e.detail.value)
    console.log(e)
  },
  bindspecialityInput: function (e) {
    this.setData({
     speciality: e.detail.value
    })
    console.log(e.detail.value)
    console.log(e)
  },
  bindschoolInput: function (e) {
    this.setData({
      school: e.detail.value
    })
    console.log(e.detail.value)
    console.log(e)
  },
    chooseLocation(e){
        let that=this;
        wx.getLocation({
            type: "gcj2",
            success: function(res){
                wx.chooseLocation({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    success:function(res){
                        console.log(res);
                        that.setData({
                            address:res.address
                        });
                    }
                })
            }
        });
    }
})