const app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    hasLoggedIn: true,
    userInfo: {},
    userId: "",
    cardInfo: {},
    statData: {
      visitors_today: 0,
      visitors_total: 0,
      customers: 0,
      msg_today: 0
    }
  },
  onLoad() {
    let that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    console.log("ONLOAD", this.data.cardInfo.nickName);
    app.callbacks.push((userInfo) => {
      //console.log(userInfo)
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

    //app.callbacks.push((userInfo)=>{
    //that.selectComponent("#card-default").getCardDetail();
    //});
  },
  onShow(e) {
    var that = this;

    console.log("LOAD");
    // db.collection("card-items")
    //   .where({
    //     _openid: this.data.id
    //   })
    //   .limit(1)
    //   .get({
    //     success: function (res) {
    //       if (res && res.data && res.data.length) {
    //          that.setData({
    //            cardInfo: res.data[0]
    //          });
    //         console.log("card Info 优秀INDEX", res.data[0]);
    //       }
    //       console.log("card Info 优秀INDEX - NickName", this.data.cardInfo.nickName);
    //     },
    //     fail: function (event) {
    //       console.error(event);
    //     }
    //   });
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
        console.log("card Info 优秀INDEX - NickName", this.data.cardInfo.nickName);
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
