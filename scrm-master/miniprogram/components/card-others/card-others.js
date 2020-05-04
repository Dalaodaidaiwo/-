const app = getApp();
Component({
  properties: {
    cardInfo:{
      type:Object,
      observer:function(newval,oldval){
        console.log("DO NIOT");
        console.log(newval);
      }
    },
    userId: String
  },
  data: {
   // userInfo: {},
  },
  methods: {
    getCardDetail() {
      console.log("Inside card-others");
    }
  },
  ready:function() {
  console.log(this.properties);
    this.getCardDetail();
  }
})