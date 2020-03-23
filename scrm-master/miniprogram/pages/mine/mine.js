const app = getApp()

Page({
  data: {
    name:"",
    title:"",
    avatar:""
  }, 
  onReady:function(){
    let that = this;
    var _this = this;
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('card-items').doc('1584168811451_0.20173603248867011_33574151').get({
      success: function (res) {
        //console.log(res.data.realName);
        //console.log(res.data.title);
        console.log("OMG");
        _this.setData({
          name: res.data.realName,
          title: res.data.title,
          avatar:res.data.avatar
        })
      }
    })
  },
  handleTap: function(evt) {
    console.log(evt);
  },
  mpAlert(e){
    wx.showToast({
      title: 'Coming soon ...',
      icon: 'success',
      duration: 2000
    })
  }
})
