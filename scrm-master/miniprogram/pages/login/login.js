const app = getApp();
Page({
  data: {
    code: '',
    redirect_url: '',
    radio: "1"
  },
  handleLogin(res) {
    let data = res.detail;
    let userInfo = {};
    userInfo.avatarUrl = data.userInfo.avatarUrl;
    userInfo.avatar = data.userInfo.avatarUrl;
    userInfo.nickName = data.userInfo.nickName;
    userInfo.doctor=this.data.radio;
    app.globalData.userInfo = userInfo;
   
    
    const db = wx.cloud.database();
    const _ = db.command;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log(res);
        if (!res || !res.result || !res.result.openid) {
          return;
        }
        app.globalData.userInfo.openid = res.result.openid;
        db.collection("users")
          .where({
            openid: res.result.openid
          })
          .limit(1)
          .get({
            success: function (res) {
              if (!res || !res.data || !res.data.length) {
                db.collection("users")
                  .add({
                    data: app.globalData.userInfo,
                  });
                db.collection("card-items")
                  .add({
                    data: app.globalData.userInfo,
                  });
              } else {
                app.globalData.userInfo = res.data[0];
              }
              if (app.callbacks && app.callbacks.length) {
                app.callbacks.forEach((item, index, array) => {
                  item(app.globalData.userInfo);
                });
              }
            }
          });
      }
    });
    wx.showModal({
      title: '登陆成功！',
      content: '请点击左上角进入首页',
    })
  },
  onLoad: function () {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        }
      }
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  }
})