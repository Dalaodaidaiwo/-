// pages/login.js
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
    app.globalData.userInfo = userInfo;//全局储存用户信息
   
    
    const db = wx.cloud.database();
    const _ = db.command;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log(res);
        if (!res || !res.result || !res.result.openid) {
          //登录失败
          console.log("调用失败");
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
              console.log(res);
              if (!res || !res.data || !res.data.length) {
                //没有获取到数据，自动创建一条user记录和一条card记录
                console.log("没有获取到数据");
                db.collection("users")
                  .add({
                    data: app.globalData.userInfo,
                    success: function (res) {
                      //console.log(that.globalData.userInfo);
                    }
                  });
                db.collection("card-items")
                  .add({
                    data: app.globalData.userInfo,
                    success: function (res) {
                      //console.log(that.globalData.userInfo);
                    }
                  });
              } else {

                console.log("获取到了用户数据");
                //获取到了用户数据，update当前的全局userInfo对象
                app.globalData.userInfo = res.data[0];

                console.log(app.globalData.userInfo);

              }

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.callbacks && app.callbacks.length) {
                app.callbacks.forEach((item, index, array) => {
                  item(app.globalData.userInfo);
                });
              }
            },
            fail: function (event) {
              console.error(event);
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
    wx.login({//登录并获取code
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
    console.log(event.detail)
    this.setData({
      radio: event.detail
    });
  }
})