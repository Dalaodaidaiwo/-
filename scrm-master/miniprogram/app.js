App({
  onLaunch: function (path) {
    let that=this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'first-test-yo193',
        traceUser: true,//自动跟踪用户
      })
    }

    //必须等wx.cloud.init之后才能调用这些api
    const db=wx.cloud.database();
    const _=db.command;
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    let query = '';
    let redirect_url = '';
    
    //解析url中是否带有参数，若有则拼接成字符串
    for (let i in path.query) {
      if (i) {
        query = query + i + '=' + path.query[i] + '&'
      }
    }
    if (query) {
      redirec_url = parh.path + '?' + query;
    } else {
      redirect_url = path.path;
    }
    wx.getSetting({
      success: res => {
        console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          console.log("login1");
          wx.redirectTo({
            url: '../../pages/login/login?redirect_url=' + encodeURIComponent(`/${redirect_url}`),
          })
        }
      }
    })
  },
  globalData: {
    keepscreenon:false,
    systeminfo: {},
    isIPhoneX: false,
    userInfo: {},
    login:false
  },
  callbacks:[]
})
