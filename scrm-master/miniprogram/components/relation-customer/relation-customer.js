const db=wx.cloud.database();
const _=db.command;
const app=getApp();
Component({
    properties:{
        userId:String
    },
    data:{
        cur_key:"",
        loading:true,
        relations:[],
        number:0
    },
    methods:{
        loadData(){
      
            console.log("加载数据...");
            console.log(app.globalData.userInfo);
            let that=this;
            that.setData({
                loading:true
            });
            db.collection("doctors")
              .where({ fromUser: { openid: app.globalData.userInfo.openid} })
                .limit(10)
                .orderBy("time","desc")
                .get({
                    success:function(res){
                        console.log(res);
                        that.setData({
                            number:res.data.length,
                            loading:false,
                            relations:[...res.data]
                        });
                        console.log(this.data.number,"WHATS THIS?");
                    },
                    fail:function(event){
                        console.error(event);}
                });
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
      if(arr[0].charAt(0) > arr[1].charAt[0]){
          this.setData({
            cur_key:arr[0]+arr[1]
          })
      }
      else{
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