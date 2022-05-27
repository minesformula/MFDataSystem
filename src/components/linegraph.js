import React from 'react';
import { Line } from '@ant-design/charts';

//Use like this: <DemoLine x='time' y='speed' data={input}></DemoLine>
const LineGraph = (input) => {
  console.log(input)
  var config = {
    data: input.data,
    xField: input.x,
    yField: input.y,
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };
  return <Line {...config} />;
};

export default LineGraph;