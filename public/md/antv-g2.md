```
可以实现一个滚动柱状图
```

```ts app.ts
import { Chart, registerAnimation } from '@antv/g2';
import React, { useEffect, useRef, useState } from 'react';
registerAnimation('label-appear', (element, animateCfg, cfg) => {
  const label = element.getChildren()[0];
  const coordinate = cfg.coordinate;
  const startX = coordinate.start.x;
  const finalX = label.attr('x');
  const labelContent = label.attr('text');
  label.attr('x', startX);
  label.attr('text', 0);
  const distance = finalX - startX;
  label.animate(ratio => {
    const position = startX + distance * ratio;
    const text = (labelContent * ratio).toFixed(0);
    return {
      x: position,
      text,
    };
  }, animateCfg);
});
registerAnimation('label-update', (element, animateCfg, cfg) => {
  const startX = element.attr('x');
  const startY = element.attr('y');
  // @ts-ignore
  const finalX = cfg.toAttrs.x;
  // @ts-ignore
  const finalY = cfg.toAttrs.y;
  const labelContent = element.attr('text');
  // @ts-ignore
  const finalContent = cfg.toAttrs.text;
  const distanceX = finalX - startX;
  const distanceY = finalY - startY;
  const numberDiff = +finalContent - +labelContent;
  element.animate(ratio => {
    const positionX = startX + distanceX * ratio;
    const positionY = startY + distanceY * ratio;
    const text = (+labelContent + numberDiff * ratio).toFixed(0);
    return {
      x: positionX,
      y: positionY,
      text,
    };
  }, animateCfg);
});
//排序
function handleData(source) {
  source.sort((a, b) => {
    return a.total_sale_money - b.total_sale_money;
  });
  return source;
}
const LineChart = props => {
  const { id, data, name, saveOneData, times } = props;
  const e = document.createEvent('Event');
  e.initEvent('resize', true, true);
  window.dispatchEvent(e);
  const [chartData, setChartData] = useState({});
  const [chart, setChart] = useState(null);
  const countRef = useRef(0);
  // const chartRef = useRef();
  // console.log('countRef.current', countRef.current);
  //Mount
  useEffect(() => {
    let chart = new Chart({
      container: id ? id : 'container',
      autoFit: true,
      height: 500,
      renderer: 'svg',  // 此处一定要用svg
      padding: [30, 70],
    });
    //chart.data(JsonData);
    // if (id === 'brand') {
    //   chart.data(handleData(JsonData));
    // } else {
    //   chart.data(handleData(JsonData1));
    // }
    chart.coordinate('rect').transpose();
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(`${name}`, {
      animateOption: {
        update: {
          duration: 1000,
          easing: 'easeLinear',
        },
      },
      // 坐标label样式
      label: {
        style: {
          fontSize: 12,
          fontWeight: 'bold',
          fill: '#fff',
          textAlign: 'end',
        },
      },
    });
    chart.on('interval:click', ev => {
      const intervalElement = ev.target.get('element');
      const data = intervalElement.getModel().data; // 单条数据
      saveOneData(data);
      // to do something
    });
    setChart(chart);
    chart.render();
  }, []);
  //data改变
  useEffect(() => {
    const dataValue = Object.values(data);
    let chartData = [];
    if (dataValue.length > 26) {
      chartData = dataValue.slice(0, 26);
    } else {
      if (dataValue.length > 0) {
        chartData = dataValue;
      }
    }
    setChartData(chartData);
  }, [data]);
  useEffect(() => {
    if (chart) {
      if (countRef.current === 0) {
        chart.data(handleData(chartData));
      } else {
        chart
          .interval()
          .position(`${name}*total_sale_money`)
          .color(`${name}`)
          .label('total_sale_money', value => {
            return {
              animate: {
                appear: {
                  animation: 'label-appear',
                  delay: 0,
                  duration: 1000,
                  easing: 'easeLinear',
                },
                update: {
                  animation: 'label-update',
                  duration: 1000,
                  easing: 'easeLinear',
                },
              },
              // label字体样式
              style: {
                fill: '#fff',
                fontSize: '12',
                // fontWeight: 'bold', // 文本粗细
                // shadowBlur: 5, // 文本阴影模糊
                // shadowColor: '#fff', // 阴影颜色
              },
              offset: 6,
            };
          })
          .animate({
            appear: {
              duration: 1000,
              easing: 'easeLinear',
            },
            update: {
              duration: 1000,
              easing: 'easeLinear',
            },
          });
        chart.changeData(handleData(chartData));
      }
      let temp = countRef.current + 1;
      countRef.current = temp;
      chart.animate(true);
    }
  }, [chartData]);
  return <div id={id} />;
};
export default LineChart;




调用

<NewLineChart
    id="brand"
   data={brandLineData} // 这是一个对象数组
   name="brand_name"
   times={brandtimes}
   saveOneData={value => this.saveOneBrandData(value)}
/>


```