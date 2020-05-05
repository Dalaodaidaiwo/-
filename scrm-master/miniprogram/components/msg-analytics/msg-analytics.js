import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

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
    areaList:[],
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
  attached: function() {
    console.log("hi")
    const db = wx.cloud.database()
    db.collection('region').doc('region').get().then(res => {
     this.setData({
       areaList:res.data
     })
      delete (this.data.areaList._id)
    })
  },
  methods: {

    async handleForm() {
      console.log(this.data.areaList)
      if (this.data.isShow == false) {
        Dialog.confirm({
          context: this,
          title: '',
          message: '请填写病人的地理位置信息'
        })
      }
      else {
        let citys = []
        this.data.citys.forEach((item) => {
          citys.push(item.split('-')[0].slice(0, 2))
        })
        citys = [...new Set(citys)]
        Dialog.confirm({
          context: this,
          title: '成功提交',
          message: '该地区病人数 +1'
        })
        await wx.cloud.callFunction({
          name: 'updataArea',
          data: {
            citys: citys,
            isCommited: this.data.isCommited
          }
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
      })
      Dialog.confirm({
        context: this,
        title: '',
        message: '成功提交'
      })
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
    },
    showPopup() {

      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false, showArea: false });
    },
    tabClick: function (e) {
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
    },
    onFieldChange(event) {
      this.setData({
        patient: event.detail.value
      })
    },
 
  }

})