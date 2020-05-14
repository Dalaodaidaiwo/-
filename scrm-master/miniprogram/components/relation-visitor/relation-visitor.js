const db=wx.cloud.database();
const _=db.command;
const app = getApp();

Component({
    properties:{
        userId:String
    },
    data:{
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
                    toUser:{
                        _id:"2"
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
                console.log(res.data[0]+"OKKKKKKKKKK");
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
           console.log("USER INFO",this.data.userInfo);
        },

        loadMore(){
            console.log("下拉加载更多...");
            this.loadData();
        }
    },
    ready() {
        this.loadData();
    }
})