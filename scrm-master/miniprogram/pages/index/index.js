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
    }
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
