// miniprogram/pages/search/search.js
const db = wx.cloud.database();
const _ = db.command;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:"",
    searchList:[],
    mynick:"",
    myreal:""
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
  console.log("SEARCHING "+options.searchVal);
    this.setData({
    searchVal:options.searchVal
    })
    console.log("Inside the search function.");
    console.log(this.data.searchVal);
    wx:wx.showLoading({
      title: '努力加载中...',
      mask:true,
      success:function(res){console.log("ok")},
      fail:function(res){conosle.log("GG")},
      complete:function(res){console.log("com")}
    })
    this.setData({
      'searchList':[]
    })
var that =this;
db.collection('card-items').where({
  _openid:app.globalData.userInfo.openid
})
.get({
  success: function (res) {
    console.log(res.data[0].nickName);
   that.setData({
      mynick: res.data[0].nickName,
      myreal: res.data[0].realName
    })
    console.log(that.data.mynick);
    console.log(that.data.myreal);
  },
  fail: function (event) {
    console.error(event);
  }
});




    db.collection('world').
     where({
         flag:"1"
      })
      .where(_.or([
        {
          nickName:db.RegExp({
          regexp:this.data.searchVal,
           options:'i',
          })
        },
        {
          realName:db.RegExp({
            regexp:this.data.searchVal,
            options:'i'
          })
        }
       ]))
        .get().then(res=>{
           if(res.data.length ==0){
             wx.hideLoading();
             wx.showToast({
               title: '无此用户',
               icon: 'none',
               duration:3000
             })
             }
            else{
          console.log("Data " + res.data[0]._id)
          for(var i=0;i<res.data.length;i++){
            var name = "searchList["+i+"].realname"
            var id = "searchList["+i+"].id"
            var nickname = "searchList["+i+"].nickname"
            this.setData({
              [id]:res.data[i]._id,
              [name]:res.data[i].realName,
              [nickname]:res.data[i].nickName
            })
            console.log(this.data.searchList[i].id)
            wx.hideLoading();
          }
          }
        })
        .catch(err =>{
          console.error(err);
          wx.hideLoading();
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  add: function (e) {
    console.log("Inside the add funciton");
    var nick = e.currentTarget.dataset.nickname;
    var real = e.currentTarget.dataset.realname;
    console.log(nick);
    console.log(this.data.mynick);
    console.log(this.data.myreal);
    console.log(real)
 
    db.collection('actions').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        duation: "300",
      
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        fromUser: {
          _id: "2",
          openid: app.globalData.userInfo.openid,
          nickName: this.data.mynick,
          realName: this.data.myreal,
          userName: "z"
        },
        toUser: {
          _id: "2",
          nickName: nick,
          realName: real,
          avatar:"https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKH4hAtXcKpNhvVzssyX4M390eMBQK2JeelrOHqu1SaPwLO4Muic2Y6KAeJZvrLFgSMoPSqtBh2DFQ/132",
          userName: "z",
          openid: "666",
        },
      },
      success: function (res) {
        wx:wx.showToast({
          title: '添加成功！',
        })
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})