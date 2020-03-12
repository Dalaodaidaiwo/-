const app = getApp();

Page({
  data: {
    hasLoggedIn:true,
    userInfo:{},
    statData:{
      visitors_today:0,
      visitors_total:0,
      customers:0,
      msg_today:0
    }
  },
  onLoad(){
    let that=this;
    const db=wx.cloud.database();
    const _=db.command;
    
    app.callbacks.push((userInfo)=>{
      //console.log("hi")
      //console.log(userInfo)
      this.setData({
        userInfo:userInfo
      });
    });

    app.callbacks.push((userInfo)=>{
      
      db.collection('statistics-first-page').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          customers: "1790",
          msg_today: "666",
          visitors_today: "55",
          visitors_total: "886",
          userId:"1583630225707_0.8837796301953007_33609536"
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      });
      
      db.collection("statistics-first-page")
        .where({
          _openid:userInfo._openid
        })
      
        .limit(1)
        .get({
          
          success:function(res){
            //console.log(userId)
            //console.log(userInfo._openid);
            //console.log("diu");
            //console.log(res);
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

    app.callbacks.push((userInfo)=>{
      that.selectComponent("#card-default").getCardDetail();
    });
  },
  onShow(e){
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
