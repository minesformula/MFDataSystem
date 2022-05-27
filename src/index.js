import React, { useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message, Alert } from 'antd';
import 'antd/dist/antd.less';
import './index.css';
import LineGraph from './components/linegraph.js'



const App = () => {
  var input = [
    {
      time: '1991',
      speed: 3,
    },
    {
      time: '1992',
      speed: 4,
    },
    {
      time: '1993',
      speed: 3.5,
    },
    {
      time: '1994',
      speed: 5,
    },
    {
      time: '1995',
      speed: 4.9,
    },
    {
      time: '1996',
      speed: 6,
    },
    {
      time: '1997',
      speed: 7,
    },
    {
      time: '1998',
      speed: 9,
    },
    {
      time: '1999',
      speed: 13,
    },
  ];
  const [date, setDate] = useState(null);
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>
        <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
      </div>
      <div>
        <LineGraph x='time' y='speed' data={input}></LineGraph>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));