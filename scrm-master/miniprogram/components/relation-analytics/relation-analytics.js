/**
 * @see 请参考Echarts官方文档
 * https://github.com/ecomfe/echarts-for-weixin
 */
import * as echarts from "../ec-canvas/echarts";
import geoJson from './mapData.js';
const app = getApp();



function initOption(data) {
  return {
    title: {
      text: '地域分布',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '病人数:{c0}'
    },
    position: 'top',
    visualMap: {
      show: true,
      type: 'piecewise',
      min: 0,
      max: 100,
      align: 'left',
      top: 'center',
      left: 0,
      left: 'auto',
      inRange: {
        color: [
          '#ffc0b1',
          '#ff8c71',
          '#ef1717',
          '#9c0505'
        ]
      },
      pieces: [
        { min: 1000 },
        { min: 500, max: 999 },
        { min: 40, max: 499 },
        { min: 10, max: 39 },
        { min: 1, max: 9 }
      ],
      orient: 'vertical',
      showLabel: true,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 10
      }
    },
    series: [{
      left: 'center',
      type: 'map',
      name: '人数',
      label: {
        show: true,
        position: 'inside',
        fontSize: 6
      },
      mapType: 'china',
      data: data.data,
      zoom: 1.2,
      roam: false,
      showLegendSymbol: false,
      emphasis: {},
      rippleEffect: {
        show: true,
        brushType: 'stroke',
        scale: 2.5,
        period: 4
      }
    }]
  }
}

function initOption_pie(data) {
    return {
        title: {
            text: '分布数据',
            left: 'left'
        },
        backgroundColor: "#ffffff",
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
        series: [{
          label: {
            normal: {
              fontSize: 12
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['40%', '60%'],
          data: data.data
        }]
      }
  }

  function initOption_line(data) {
    return {
        title: {
            text: '统计数据',
            left: 'left'
        },
        color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
        legend: {
            data: ['预约', '治疗中', '已治愈'],
            top: 25,
            left: 'center',
            backgroundColor: 'white',
            z: 100
          },
        grid: {
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
            lineStyle: {
                type: 'dashed'
            }
            }
            // show: false
        },
        series: data.data
    }
  }

function initChart1(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    var option = {
        title: {
            text: '客户关系',
            left: 'left'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                    show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                // edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                    textStyle: {
                        fontSize: 20
                    }
                    }
                },
                data: [{
                    name: '客户1',
                    x: 300,
                    y: 300,
                    itemStyle: {
                    color: '#37A2DA'
                    }
                }, {
                    name: '客户2',
                    x: 800,
                    y: 300,
                    itemStyle: {
                    color: '#32C5E9'
                    }
                }, {
                    name: '客户3',
                    x: 550,
                    y: 100,
                    itemStyle: {
                    color: '#9FE6B8'
                    }
                }, {
                    name: '客户4',
                    x: 550,
                    y: 500,
                    itemStyle: {
                    color: '#FF9F7F'
                    }
                }],
                links: [{
                    source: 0,
                    target: 1,
                    symbolSize: [5, 20],
                    label: {
                    normal: {
                        show: true
                    }
                    },
                    lineStyle: {
                    normal: {
                        width: 4,
                        curveness: 0.2
                    }
                    }
                }, {
                    source: '客户2',
                    target: '客户1',
                    label: {
                    normal: {
                        show: true
                    }
                    },
                    lineStyle: {
                    normal: { curveness: 0.2 }
                    }
                }, {
                    source: '客户1',
                    target: '客户3'
                }, {
                    source: '客户2',
                    target: '客户3'
                }, {
                    source: '客户2',
                    target: '客户4'
                }, {
                    source: '客户1',
                    target: '客户4'
                }],
                lineStyle: {
                    normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                    }
                }
            }
        ]
    };

    chart.setOption(option);
    chart1=chart;
    return chart;
}





Component({
    properties:{
        userId:String
    },
    data: {
        
        ec: {
            lazyLoad: true
        },
        ec1: {
            onInit: initChart1
        },
        ec2: {
          lazyLoad: true
        },
        ec3: {
            lazyLoad: true
        },
        userInfo:{}
    },
    methods:{
        loadStatData(){
          
        }
    },
    ready() {
      this.ecComponent = this.selectComponent('#mychart-dom-bar');
      wx.cloud.callFunction({
        name: 'getArea'
      }).then((res) => {
        let result = res.result
        let option = initOption(result)
        this.ecComponent.init((canvas, width, height) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          echarts.registerMap('china', geoJson);
          chart.setOption(option)
          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          //this.chart = chart;
          return chart;
        });
      })
      
      this.ecComponent_pie = this.selectComponent('#mychart-dom-pie');
      wx.cloud.callFunction({
        name: 'getArea'
      }).then((res) => {
        let result = res.result
        let option_pie = initOption_pie(result)
        this.ecComponent_pie.init((canvas, width, height) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          chart.setOption(option_pie)
          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          this.chart = chart;
          return chart;
        });
      })

      this.ecComponent_line = this.selectComponent('#mychart-dom-line');
      wx.cloud.callFunction({
        name: 'getNum'
      }).then((res) => {
        let result = res.result
        //console.log("yeah")
        //console.log(result)
        let option_line = initOption_line(result)
        this.ecComponent_line.init((canvas, width, height) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          chart.setOption(option_line)
          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          this.chart = chart;
          return chart;
        });
        
      })
        this.loadStatData();
        setTimeout(function () {
            // console.log(chart1);
            // console.log(chart2);
            // console.log(chart3);
        }, 2000);
    }
})