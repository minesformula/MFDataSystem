import React from 'react';
import { Line } from '@ant-design/charts';
import { DataView } from '@antv/data-set';
const PouchDB = require('pouchdb').default;

//Use like this: <DemoLine x='time' y='speed' data={input}></DemoLine>
const LineGraph = (input) => {
  let data;
  let db = new PouchDB('test');
  return db.allDocs({
    include_docs: true,
    attachments: true
  }).then(res => {
    let rows = res.rows;
    const dv = new DataView().source(rows); 
    data = dv.rows.map((d) => ({
      doc: d.doc,
    }));
    var i = 0;
    while (i < data.length) {
      data[i]=data[i].doc
      if (!Object.getOwnPropertyNames(data[i]).includes(input.x) || !Object.getOwnPropertyNames(data[i]).includes(input.y)) {
        data.splice(i, 1);
      } else {
        ++i;
      }
    }
 
  console.log(input)
  var config = { 
    data: data,
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
  console.log(config);
  return <Line {...config} />;
});
}; 

export default LineGraph;