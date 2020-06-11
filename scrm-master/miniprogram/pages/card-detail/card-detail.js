const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
    data: {
        userId:"",
        cardDetails:{},
    },
  onLoad: function () {
    var _this = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log(res);
        if (!res || !res.result || !res.result.openid) {
          return;
        }
        _this.setData({
          id: res.result.openid
        })
      }
    });
  
    this.setData({
      userId: app.globalData.userInfo._id
    });
    this.loadCardDetails();
  },
  loadCardDetails:function(){
    let that=this;
    const db=wx.cloud.database();
    const _=db.command;
    db.collection("card-details")
    .where({
        _openid:this.data._openid
    })
    .limit(1)
    .get({
        success:function(res){
            if(res&&res.data&&res.data.length){
                that.setData({
                    cardDetails:res.data[0]
                });
            }
        }
    });

    },
 
    toEdit(e){
        wx.navigateTo({
            url: "../edit-main/edit-main"
        });
    },

})