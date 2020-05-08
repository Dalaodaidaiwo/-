const app = getApp();
Component({
    properties:{
        userId: String
    },
    data:{
        userInfo: {},
        cardInfo:{}
    },
    methods:{
        getCardDetail(){
            let that=this;
            const db=wx.cloud.database();
            const _=db.command;
          app.callbacks.push((userInfo) => {
            this.setData({
              userInfo: userInfo
            });
   
          });
          console.log("!!!!!!!!!", this.data.userInfo_openid);
            db.collection("card-items")
                .where({
                  _openid: this.data.userInfo._openid
                })
                .limit(1)
                .get({
                    success:function(res){
                        if(res&&res.data&&res.data.length){
                            that.setData({
                                cardInfo:res.data[0]
                            });
                            console.log("card Info", res.data[0]);
                        }
                    },
                    fail:function(event){
                        console.error(event);
                    }
                });
        }
    },
    ready() {
        this.getCardDetail();
    }
})