
import areaList from './area.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const app = getApp();

const number = {
  '周一': ['预约', '治疗中', '已治愈'],
  '周二': ['预约', '治疗中', '已治愈'],
  '周三': ['预约', '治疗中', '已治愈'],
  '周四': ['预约', '治疗中', '已治愈'],
  '周五': ['预约', '治疗中', '已治愈'],
  '周六': ['预约', '治疗中', '已治愈'],
  '周日': ['预约', '治疗中', '已治愈']
};


Component({

  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    userInfo: {},
    areaList,
    oldCitys: [],
    citys: [],
    week: "周一",
    status: "预约",
    radio: '1',
    isPut: false,
    isShow: false,
    
    show: false,
    showArea: false,
    patient: 0,
    numvalue: "",
    columns: [
      {
        values: Object.keys(number),
        className: 'column1'
      }, {
        values: number['周一'],
        className: 'column2',
        defaultIndex: 0
      }
    ]
  },
  methods: {

    async handleForm() {
      if (this.data.isShow == false) {
        Dialog.confirm({
          context: this,
          title: '',
          message: '请填写病人的地理位置信息'
        }).then(() => {
          // on confirm
          this.setData({ show: true });
        }).catch(() => {
          // on cancel
        });
        //Toast.fail('请填写病人的地理位置信息')
      }
      else {
        let citys = []
        this.data.citys.forEach((item) => {
          citys.push(item.split('-')[0].slice(0, 2))
        })
        citys = [...new Set(citys)]
        //Toast.success('成功提交');
        Dialog.confirm({
          context: this,
          title: '成功提交',
          message: '该地区病人数 +1'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
        await wx.cloud.callFunction({
          name: 'updataArea',
          data: {
            citys: citys,
            isCommited: this.data.isCommited
          }
        }).then((res) => {
          // console.log("4/4")
          // console.log(res)
          // console.log("4/4")
        })

    

      }
    },
    async handleForm1() {
      
       
        await wx.cloud.callFunction({
          name: 'updateNum',
          data: {
            week: this.data.week,
            status: this.data.status,
            number: this.data.patient
          }
        }).then((res) => {
          console.log("3/4")
          console.log(res)
          console.log("3/4")
        })
        Dialog.confirm({
          context: this,
          title: '',
          message: '成功提交'
        }).then(() => {
         
          // on confirm
        }).catch(() => {
          // on cancel
        });


      
    },
    handleCommit(e) {
      let city = ''
      let citys = this.data.citys
      e.detail.values.forEach((item) => {
        city = city + item.name + '-'
      })
      city = city.slice(0, -1)
      citys.push(city)
      citys = [...new Set(citys)]
      this.setData({
        citys
      })
      this.setData({ show: false, showArea: false, isPut: true, isShow: true });
      //Toast.success('选择成功');
      // Dialog.confirm({
      //   context: this,
      //   title: '标题',
      //   message: '弹窗内容'
      // }).then(() => {
      //   // on confirm
      // }).catch(() => {
      //   // on cancel
      // });

    },
    showPopup() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false, showArea: false });
    },
    tabClick: function (e) {
      console.log(e);
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    onChange(event) {
      const { picker, value, index } = event.detail;
      console.log(value);
      this.setData({
        numvalue: value,
        week: value[0],
        status: value[1]
      })


      picker.setColumnValues(1, number[value[0]]);
      //Toast(`当前值：${value}`);
      // Dialog.confirm({
      //   context: this,
      //   title: '',
      //   message: ''
      // }).then(() => {
      //   // on confirm
      // }).catch(() => {
      //   // on cancel
      // });
      console.log(this.data.week);
      console.log(this.data.status);
    },
    onFieldChange(event) {
      // event.detail 为当前输入的值
      this.setData({
        patient: event.detail.value
      })
      console.log(this.data.patient);
    }
  },

  ready() {
    // this.loadStatData();
    /*
    setTimeout(function () {
        console.log(chart3);
    }, 2000);
    */
  }
})