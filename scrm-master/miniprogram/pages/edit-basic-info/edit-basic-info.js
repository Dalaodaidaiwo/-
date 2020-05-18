const app = getApp();
const db = wx.cloud.database()
const _ = db.command;

Page({
  data: {
    pre_name:"",
    pre_cellphone:"",
    pre_companyName:"",
    pre_title:"",
    pre_hometown:"",
    pre_school:"",
    pre_hometown:"",
    pre_speciality:"",

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
    var that = this;
    db.collection('card-items').
    where({
      _openid: app.globalData.userInfo.openid
    }).get({
        success:function(res){
          if(res.data.length==0){
            console.log("???????无记录。");
          }
          else{
          that.setData({
            pre_name:res.data[0].nickName,
            pre_cellphone:res.data[0].cellphone,
            pre_companyName:res.data[0].companyName,
            pre_title:res.data[0].title
          })
          console.log("Phone"+that.data.pre_cellphone);
          }
        },
        fail:function(res){
          console.log("Fail?");
        }
    }),
      db.collection('card-details').
        where({
          _openid: app.globalData.userInfo.openid
        }).get({
          success: function (res) {
            if (res.data.length == 0) {
              console.log("???????无记录。");
            }
            else {
              that.setData({
                  pre_school:res.data[0].school,
                  pre_hometown:res.data[0].hometown,
                  pre_speciality:res.data[0].speciality
              })
            }
          },
          fail: function (res) {
            console.log("Fail?");
          }
        })

  },
  async toEditMain(e) {

    db.collection('world').where({
      openid: app.globalData.userInfo.openid
    }).
    get({
      success:function(res){
        console.log(app.globalData.userInfo.openid);
        console.log(res.data);
        if(res.data.length>0){
          //有记录，在world中更新记录
 
          console.log("Have record.");
          db.collection('world').
            where({
              openid: app.globalData.userInfo.openid
            }).set({
              data: {
                nickName: this.data.nickName,
                realName: this.data.title
              }
            });


        }
        else{
          //无记录，在world中新增记录
          console.log("No record");

          db.collection('world').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              flag: "1",
              openid: app.globalData.userInfo.openid,
              nickName: this.data.nickName,
              realName: this.data.title
            },
              success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log("ADD OK");
            },
            fail:function(res){
              console.log("ADD FAIL");
            }
          })
          ;
         
        }
      },
      fail:function(res){
        console.log("ERROR");
      }
    });
  
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