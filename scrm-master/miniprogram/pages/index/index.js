const app = getApp();

Page({
  data: {
    show:false,
    hasLoggedIn:true,
    userInfo:{},
    userId: "",
    statData:{
      visitors_today:0,
      visitors_total:0,
      customers:0,
      msg_today:0
    },
    login:false,
  },
  onShow(){
    // console.log("ONSHOW");
    // this.setData({
    // show:true
    // })
  },
  onLoad(){
    this.setData({
      userId:""
      //userId: app.globalData.userInfo._id
    });

    let that=this;
    const db=wx.cloud.database();
    const _=db.command;
    console.log("ONLOAD");
    app.callbacks.push((userInfo)=>{
      //console.log(userInfo)
      this.setData({
        userInfo:userInfo
      });
    });

    app.callbacks.push((userInfo)=>{
      db.collection("statistics-first-page")  
        .where({
          _openid:userInfo._openid
        })
        .limit(1)     
        .get({        
          success:function(res){
            if(res&&res.data&&res.data.length){
              that.setData({
                statData:res.data[0]
              });       
            }
          },
          fail:function(event){
            console.error(event);
          }
        })
    });
    
    //app.callbacks.push((userInfo)=>{
      //that.selectComponent("#card-default").getCardDetail();
    //});
    if(this.data.login==false){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
          wx.getUserInfo({
            success: res => {
              
              //console.log(res);
              app.globalData.userInfo = res.userInfo
              app.globalData.userInfo.avatar=res.userInfo.avatarUrl;
              app.globalData.userInfo.creatTime=new Date();
              console.log("授权");
              //console.log(app.globalData)
              //TODO:写入或者更新Session

              /**
               * 业务逻辑：
               * 如果能根据openid在自己的数据库中获取到用户信息，则update当前的全局userInfo对象
               * 否则，自动创建一条user记录和一条card记录
               */
              wx.cloud.callFunction({
                  name:'login',
                  complete:res=>{
                      
                      if(!res||!res.result||!res.result.openid){
                        //登录失败
                        console.log("调用失败");
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
                                //console.log(res);
                                if(!res||!res.data||!res.data.length){
                                  //没有获取到数据，自动创建一条user记录和一条card记录
                                  console.log("没有获取到数据");
                                  db.collection("users")
                                    .add({
                                      data:app.globalData.userInfo,
                                      success:function(res){
                                        //console.log(that.globalData.userInfo);
                                      }
                                    });
                                  db.collection("card-items")
                                    .add({
                                      data:app.globalData.userInfo,
                                      success:function(res){
                                        //console.log(that.globalData.userInfo);
                                      }
                                    });
                                }else{
                                  
                                  console.log("获取到了用户数据");
                                  //获取到了用户数据，update当前的全局userInfo对象
                                  app.globalData.userInfo=res.data[0];
                                  
                                  //console.log(app.globalData.userInfo);
                               
                                }

                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                                if(app.callbacks&&app.callbacks.length){
                                  app.callbacks.forEach((item,index,array)=>{
                                    item(app.globalData.userInfo);
                                  });
                                }
                            },
                            fail:function(event){
                                console.error(event);
                            }
                        });
                  }
              });
            }
          })
        }
      }
    })
    this.setData({
      login:true
    })
    }
  },
  onShow(e){
    console.log("RELOED HERE");
    var that = this;
    that.onLoad();

  },
  toSearch(e){
  },
  toDetail(e){
    wx.navigateTo({
      url: "../card-detail/card-detail"
    });
  },
  toEdit(e){
    wx.navigateTo({
      url: "../edit-main/edit-main"
    });
  },
  toShare(e){
    wx.navigateTo({
      url: "../share-main/share-main"
    });
  },
  scanCode(e){
      wx.scanCode({
          success (res) {
              console.log(res)
          }
      });
  },
  mpAlert(e){
    wx.showToast({
      title: 'Coming soon ...',
      icon: 'success',
      duration: 2000
    })
  }
})
