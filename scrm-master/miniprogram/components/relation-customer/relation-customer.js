const db=wx.cloud.database();
const _=db.command;
const app=getApp();
Component({
    properties:{
        userId:String
    },
    data:{
     
      doctor:false,
        cur_key:"",
        loading:true,
        relations:[],
        number:0,
        key:""
    },
    methods:{
        loadData(){

          let that = this;
          db.collection('card-items')
          .where({
            _openid: app.globalData.userInfo.openid
          })
          .get({
            success:function(res){
              that.setData({
                key:res.data[0].companyName
              })
              console.log("Key + " + that.data.key);
              console.log("加载数据...");
              console.log(app.globalData.userInfo);
              console.log("Key + " + that.data.key);
              that.setData({
                loading: true
              });
              db.collection("doctors")
                .where({ toUser: { companyName: that.data.key } })
                .limit(10)
                .orderBy("time", "desc")
                .get({
                  success: function (res) {
                    console.log(res);
                    that.setData({
                      number: res.data.length,
                      loading: false,
                      relations: [...res.data]
                    });
                    console.log(this.data.number, "WHATS THIS?");
                  },
                  fail: function (event) {
                    console.error(event);
                  }
                });
            },
            fail:function(res){
              console.log("Error!" + res);                        }
          })
          
          if (app.globalData.userInfo.doctor == "1") {
            this.setData({
              doctor: true
            })
          }
  
        },
        loadMore(){
            console.log("下拉加载更多...");
            this.loadData();
        },
         touch(e) {
        var i = e.currentTarget.id;
        var arr = new Array(); 
        arr = i.split(" ");
           if (arr[0].charAt(0) > app.globalData.userInfo.openid.charAt[0]){
          this.setData({
            cur_key: arr[0] + app.globalData.userInfo.openid
          })
      }
      else{
        this.setData({
          cur_key: app.globalData.userInfo.openid + arr[0]
        })
      }
        console.log(this.data.cur_key + "This is the room_id now.");
      }
    },
    ready() {
        this.loadData();
    }
    
   
})