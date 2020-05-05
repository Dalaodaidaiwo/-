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
        },
        fail:function(event){
            console.error(event);
        }
    });

    },
 
    toEdit(e){
        wx.navigateTo({
            url: "../edit-main/edit-main"
        });
    },
    makeCall(e){
        wx.makePhoneCall({
            phoneNumber: '13013000000'
        })
    },
    scanCode(e){
        wx.scanCode({
            success (res) {
                console.log(res)
            }
        });
    },
    previewImg:function(e){
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var imgArr = this.data.imgArr;
        wx.previewImage({
            current: imgArr[index],
            urls: imgArr,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
})