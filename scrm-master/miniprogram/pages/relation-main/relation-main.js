import areaList from './area.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

const app = getApp()
let sliderWidth = 96;

Page({
    data: {
        tabs: ["动态", "客户"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        areaList,
      oldCitys:[],
      citys:[],
      radio: '1',
    isPut:false,
      show: false,
      showArea: false,
      isShow:false,
    },
    async handleForm(){
        if(this.data.isShow==false){
            Toast.fail('请填写病人的地理位置信息')
        }
        else{
        let citys = []
        this.data.citys.forEach((item)=>{
          citys.push(item.split('-')[0].slice(0,2))
        })
        citys = [...new Set(citys)]
        Toast.success('成功提交');
          await wx.cloud.callFunction({
            name: 'updataArea',
            data: {
              citys: citys,
              isCommited:this.data.isCommited
            }
          }).then((res)=>{
            console.log("4/4")
            console.log(res)
            console.log("4/4")
          })
  
          Toast.success('该地区病人数 +1');
        }
      },
      handleCommit(e){
        
        let city = ''
        let citys = this.data.citys
        e.detail.values.forEach((item)=>{
          city = city +item.name +'-'
        })
        city = city.slice(0,-1)
        citys.push(city)
        citys = [...new Set(citys)]
        this.setData({
          citys
        })
        this.setData({ show: false, showArea: false,isPut:true,isShow:true });
        Toast.success('选择成功');
      },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    showPopup() {
        this.setData({ show: true });
      },
      onClose() {
        this.setData({ show: false , showArea: false});
      },
    tabClick: function (e) {
        console.log(e);
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
})
