
const app = getApp();
Page({
    data: {
        formats: {},
        text:"",
        bottom: 0,
        readOnly: false,
        placeholder: '',
        _focus: false,
    },
    readOnlyChange() {
        this.setData({
            readOnly: !this.data.readOnly
        })
    },
    onLoad() {
      if (app.globalData.userInfo.doctor == "1"){
        this.setData({
          placeholder:"在这里上传您的医师资格证、介绍您擅长的领域，支持文字与图片..."
        })
      }
      else{
        this.setData({
          placeholder:"介绍一下您的详情吧，越详细越有助于医生判断噢！支持文字与图片..."
        })
      }
      this.setData({
        userInfo: app.globalData.userInfo
      });
    },
  async toEditMain(e) {
    wx.showToast({
      title: '编辑成功',
    })

    const that = this;
    var _this=this;
    const db = wx.cloud.database()
    const _ = db.command;
    
    
      that.editorCtx.getContents({
        success: function (res) {
          //  *nice ↓
          //因为success函数是一个闭包，无法通过this来setData      
         
          _this.setData({
            text: res.html
          })

           wx.cloud.callFunction({
            name: 'editRichDetails',
            data: {
              richDetails: _this.data.text,
              openid: app.globalData.userInfo.openid
            }
          })

        }
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