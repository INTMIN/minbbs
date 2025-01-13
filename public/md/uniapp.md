```
uniapp 中实现的echarts使用
```
``` ts app.ts
<template>
  <view class="content">
    <!-- #ifdef APP-PLUS || H5 -->
    <view
      @click="echarts.onClick"
      :prop="option"
      :change:prop="echarts.updateEcharts"
      id="echarts"
      class="echarts"
    ></view>
    <!-- <button @click="changeOption">更新数据</button> -->
    <!-- #endif -->
    <!-- #ifndef APP-PLUS || H5 -->
    <view>非 APP、H5 环境不支持</view>
    <!-- #endif -->
  </view>
</template>
<script>
var datas = [];
export default {
  data() {
    return {
      option: {
        series: [
          {
            data: [],
          },
        ],
      },
    };
  },
  props: {
    word_cloud: {
      default: () => [],
    },
  },
  mounted() {
    this.word_cloud_datas = this.word_cloud;
    this.upChartsOption();
  },
  methods: {
    upChartsOption() {
      this.option.series[0].data = this.word_cloud;
    },
    onViewClick(options) {
      console.log(options);
    },
  },
};
</script>
<script module="echarts" lang="renderjs">
import 'echarts-wordcloud';
import * as echarts from 'echarts';

let myChart;
export default {
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      if(echarts.init){
        myChart = echarts.init(document.getElementById('echarts'))
        // 观测更新的数据在 view 层可以直接访问到
        myChart.setOption({
        backgroundColor: '#fff', // canvas背景颜色
        // canvas标题配置项
        series: [
          {
            type: 'wordCloud',
            shape: 'circle', //circle cardioid diamond triangle-forward triangle
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: '100%',
            gridSize: 0, //值越大，word间的距离越大，单位像素
            sizeRange: [10, 40], //word的字体大小区间，单位像素
            rotationRange: [-90, 90], //word的可旋转角度区间
            textStyle: {
                color: function () {
                    const colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                    return colors[parseInt(Math.random() * 10)];
              },
              emphasis: {
                shadowBlur: 2,
                shadowColor: '#000',
              },
            },
            data: [],
            backgroundColor: 'rgba(100, 255, 255, 0.6)',
          },
        ],
      })
      }
    },
    updateEcharts(newValue, oldValue, ownerInstance, instance) {
      // 监听 service 层数据变更
      if(myChart){
        myChart.setOption(newValue)
      }
    },
    onClick(event, ownerInstance) {
      // 调用 service 层的方法
      ownerInstance.callMethod('onViewClick', {
        test: 'test'
      })
    }
  }
}
</script>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.echarts {
  /* margin-top: 100rpx; */
  width: 100%;
  height: 400rpx;
}
</style>

```