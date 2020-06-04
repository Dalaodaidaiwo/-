const app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    hasLoggedIn: true,
    userInfo: {},
    doctor:false,
    userId: "",
    cardInfo: {},
    all_appointment:0,
      all_treat:0,
      all_heal:0,
  },
  onLoad() {
    if(app.globalData.userInfo.doctor=="1"){
      this.setData({
          doctor:true
      })
    }
    if(app.globalData.login==false){
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo;
                
                app.globalData.userInfo.avatar=res.userInfo.avatarUrl;
                app.globalData.userInfo.creatTime=new Date();
                wx.cloud.callFunction({
                    name:'login',
                    complete:res=>{
                        
                        if(!res||!res.result||!res.result.openid){
  
                          return;
                        }
                        app.globalData.userInfo.openid=res.result.openid;
                        db.collection("users")
                          .where({
                              openid:res.result.openid
                          })
                          .limit(1)
                          .get({
                              success:function(res){
                        
                                  if(!res||!res.data||!res.data.length){
                                    
                                    db.collection("users")
                                      .add({
                                        data:app.globalData.userInfo
                                        
                                      });
                                    db.collection("card-items")
                                      .add({
                                        data:app.globalData.userInfo
                                        
                                      });
                                  }else{
                                    
                                   
                                    app.globalData.userInfo=res.data[0];
                                  }                            
                                  if(app.callbacks&&app.callbacks.length){
                                    app.callbacks.forEach((item,index,array)=>{
                                      item(app.globalData.userInfo);
                                    });
                                  }
                              }
                          });
                    }
                });
              }
            })
          }
        }
      })
      app.globalData.login=true;
      
    }
    let that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    app.callbacks.push((userInfo) => {
      this.setData({
        userInfo: userInfo
      });
    });

    app.callbacks.push((userInfo) => {
      db.collection("statistics-first-page")
        .where({
          _openid: userInfo._openid
        })
        .limit(1)
        .get({
          success: function (res) {
            if (res && res.data && res.data.length) {
              that.setData({
                statData: res.data[0]
              });
            }
          },
          fail: function (event) {
            console.error(event);
          }
        })
    });

    db.collection("num")
        .where({
          name: db.RegExp({
            regexp: "预约",
            options: 's',
          })
        })
        .limit(1)
        .get({
          success: function (res) {
            var sum=0;
            for(var i=0;i<res.data[0].data.length;i++){
                sum+=res.data[0].data[i];
            }
            that.setData({
              all_appointment:sum
            })
          }
        })
        db.collection("num")
        .where({
          name: db.RegExp({
            regexp: "治疗中",
            options: 's',
          })
        })
        .limit(1)
        .get({
          success: function (res) {
            var sum=0;
            for(var i=0;i<res.data[0].data.length;i++){
                sum+=res.data[0].data[i];
            }
            that.setData({
              all_treat:sum
            })
          }
        })
        db.collection("num")
        .where({
          name: db.RegExp({
            regexp: "已治愈",
            options: 's',
          })
        })
        .limit(1)
        .get({
          success: function (res) {
            var sum=0;
            for(var i=0;i<res.data[0].data.length;i++){
                sum+=res.data[0].data[i];
            }
            that.setData({
              all_heal:sum
            })
          }
        })

  },
  onShow(e) {
    
    var that = this;
    db.collection('card-items')
      .where({
        _openid: this.data.id
      })
      .get()
      .then(res => {
        that.setData({
          cardInfo: res.data[0]
        })
        that.onLoad();
        console.log("INDEX", res.data[0]);
      })
      .catch(res => {
        console.log("GG");
      });
  },
  toSearch(e) {
  },
  toDetail(e) {
    wx.navigateTo({
      url: "../card-detail/card-detail"
    });
  },
  toEdit(e) {
    wx.navigateTo({
      url: "../edit-main/edit-main"
    });
  },
  toShare(e) {
    wx.navigateTo({
      url: "../share-main/share-main"
    });
  },
  scanCode(e) {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    });
  },
  mpAlert(e) {
    wx.showToast({
      title: 'Coming soon ...',
      icon: 'success',
      duration: 2000
    })
  }
})
