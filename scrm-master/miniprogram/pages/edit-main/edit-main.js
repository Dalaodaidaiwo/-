Page({
    data: {
    },
    onLoad: function () {
      //  var pages = getCurrentPages();
      //  var beforepage = pages[pages.length-2];
      //  wx.navigateBack({
      //    success:function(){
      //      beforepage.onLoad();
      //    }
      //  }) 
    },

    toDetail(e){
        wx.navigateTo({
            url: "../card-detail/card-detail"
        });
    }
})