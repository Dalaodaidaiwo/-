
const app = getApp();
Page({
    data: {
        formats: {},
        text:"",
        bottom: 0,
        readOnly: false,
        placeholder: '介绍一下你的详情吧，支持文字和图片...',
        _focus: false,
    },
    readOnlyChange() {
        this.setData({
            readOnly: !this.data.readOnly
        })
    },
    onLoad() {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    },
  toEditMain(e) {
    wx.showToast({
      title: '编辑成功',
    })

    const that = this;
    var _this=this;
    const db = wx.cloud.database()
    const _ = db.command;
      that.editorCtx.getContents({
        success: function (res) {
          //因为success函数是一个闭包，无法通过this来setData      
          //太恶心了，原来是异步执行orz  呕
          _this.setData({
            text: res.html
          }),
         //console.log(_this.data.text);
         // console.log("First?????");
         // console.log("NOW::", _this.data.text);
          db.collection('card-details').doc("31812d39-2849-483e-b344-8ea364c507ce").update({
            data: {
              richDetails: _this.data.text
            },
            success: res => {
              this.setData({
                richDetails: _this.data.text
              })
              console.log("DB UPATAE OKK");
            },
            fail: err => {
              icon: 'none',
                console.error('[数据库] [更新记录] 失败：', err)
            }
          })
        },
      }),
      wx.navigateBack({
         delta: 1
      });
  },
    onEditorReady() {
        const that = this;
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context;
        }).exec();
    },
    undo() {
        this.editorCtx.undo();
    },
    redo() {
        this.editorCtx.redo();
    },
    format(e) {
        let {name, value } = e.target.dataset;
        if (!name) return;
        this.setData({
        }),
        console.log('format', name, value)
        this.editorCtx.format(name, value);
    },
    onStatusChange(e) {
        const formats = e.detail;
        this.setData({ formats });
    },
    insertDivider() {
        this.editorCtx.insertDivider({
            success: function () {
            console.log('insert divider success')
            }
        });
    },
    clear() {
        this.editorCtx.clear({
            success: function (res) {
            console.log("clear success")
            }
        });
    },
    removeFormat() {
        this.editorCtx.removeFormat();
    },
    insertDate() {
        const date = new Date()
        const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        this.editorCtx.insertText({
            text: formatDate
        });
    },
    
    insertImage() {
        const that = this
        wx.chooseImage({
            count: 1,
            success: function (res) {
            that.editorCtx.insertImage({
              /*
                src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',*/
               
                src:res.tempFilePaths[0],
                data: {
                id: 'abcd',
                role: 'god'
                },
                width:'80%',
                success: function () {
                console.log('insert image success')
                }
            })
            }
        });
    },

    chooseImage(e) {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                const images = this.data.images.concat(res.tempFilePaths);
                this.data.images = images.length <= 3 ? images : images.slice(0, 3);
            }
        })
    }
})