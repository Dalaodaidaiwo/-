const db=wx.cloud.database();
const _=db.command;
const app = getApp();

Component({
    properties:{
        userId:String
    },
    data:{
      cur_key: "",
      today_visit:0,
      total_visit:0,
        recordid:"",
        loading:true,
        relations:[]
    },
    methods:{
        loadData(){
            console.log("加载数据...");
            let that=this;
            that.setData({
                loading:true
            });
            db.collection("actions")
                .where({
                    fromUser:{
                      openid: app.globalData.userInfo.openid   
                    }
                })
                .limit(10)
                .orderBy("time","desc")
                .get({
                    success:function(res){
                        console.log(res);
                        that.setData({
                            loading:false,
                            relations:[...res.data]
                        });
                    },
                    fail:function(event){
                        console.error(event);
                    }
                });
           db.collection("statistics-first-page")
           .where({
             _openid: app.globalData.userInfo.openid    
             })
           .get({
             success:function(res){
               if (res && res.data && res.data.length) {
                that.setData({
                  today_visit:res.data[0].visitors_today,
                  total_visit:res.data[0].visitors_total
                })
                }
                else{
                  console.log("Res Invalid");
                }
             },
             fail:function(event){
               console.log("DB failed"+event);
             }
            }),
             console.log("USER INFO", app.globalData.userInfo.openid);
        },
      
        loadMore(){
            console.log("下拉加载更多...");
            this.loadData();
        },
        touch(e) {
        var i = e.currentTarget.id;
        var arr = new Array();
        var fi = ""; var se = "";
        arr = i.split(" ");
        if (arr[0].charAt(0) > arr[1].charAt[0]) {
          this.setData({
            cur_key: arr[0] + arr[1]
          })
        }
        else {
          this.setData({
            cur_key: arr[1] + arr[0]
          })
        }
        console.log(this.data.cur_key + "This is the room_id now.");
      }
    },
    ready() {
        this.loadData();
    }
})