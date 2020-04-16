const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
    data: {
        userId:"",
        cardDetails:{},
        chatroomid:"",
    },
  onLoad: function (options) {
    this.setData({
      chatroomid:options._id
    })
    console.log("BALL BALL" + this.data.chatroomid);
    var _this = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log(res);
        if (!res || !res.result || !res.result.openid) {
          //登录失败
          console.log("GG");
          return;
        }
        // db.collection("actions")
        //   .where({
        //     _openid: that.data.id
        //   })
        //   .get({
        //     success: function (res) {
        //      console.log("DATA");
        //      console.log(res.data[0].chatroomid);
        //      _this.setData({
        //        chatroomid:res.data[0].chatroomid
        //      })
        //      console.log("SETDATA");
        //      console.log(_this.data.chatroomid);
        //     }
        //   });
      }
    });
  
    this.setData({
      userId: app.globalData.userInfo._id
    });
    this.loadCardDetails();
  },

  loadCardDetails:function(){
           let that=this;
           for(k in this.data.cardDetails){
             console.log(k+" "+this.data.cardDetails[k]);
           }
           console.log(this.data.cardDetails+"    DETAIL");
            db.collection("actions")
                .where({
                  _id:this.data.chatroomid
                })
                .limit(1)
                .get({
                    success:function(res){
                      console.log(res.data+ " RES");
                        if(res&&res.data&&res.data.length){
                            that.setData({
                              //  cardDetails:res.data.fromUser
                            });
                        }
                    },
                    fail:function(event){
                      console.log("GG");
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