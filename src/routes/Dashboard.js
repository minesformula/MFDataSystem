import React, { useState } from 'react';
import { DatePicker, message, Alert, Select} from 'antd';
import 'antd/dist/antd.less';
import LineGraph from '../components/linegraph'

const { Option } = Select;

export default function Dashboard() {
  var input = [
    {
      time: '1991',
      speed: 3,
      test: 2
    },
    {
      time: '1992',
      speed: 4,
      test: 3
    },
    {
      time: '1993',
      speed: 3.5,
      test: 4
    },
    {
      time: '1994',
      speed: 5,
      test: 5
    },
    {
      time: '1995',
      speed: 4.9,
      test: 6
    },
    {
      time: '1996',
      speed: 6,
      test: 7
    },
    {
      time: '1997',
      speed: 7,
      test: 8
    },
    {
      time: '1998',
      speed: 9,
      test: 9
    },
    {
      time: '1999',
      speed: 13,
      test: 10
    },
  ];
  const [date, setDate] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  const handleSelectXChange = (value) => {
    console.log(`selected X: ${value}`);
    setX(value);
  };
  const handleSelectYChange = (value) => {
    console.log(`selected Y: ${value}`);
    setY(value);
  };
  return (
    <main>
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
        </div>
        <div>
          <Select
          defaultValue="x"
          style={{
            width: 120,
          }}
          onChange={handleSelectXChange}
          >
            <Option value="x" disabled>X Axis</Option>
            <Option value="time">Time</Option>
            <Option value="speed">Speed</Option>
            <Option value="test">Test</Option>
            <Option value="invalid">Invalid</Option>
          </Select>
          <Select
          defaultValue="y"
          style={{
            width: 120,
          }}
          onChange={handleSelectYChange}
          >
            <Option value="y" disabled>Y Axis</Option>
            <Option value="time">Time</Option>
            <Option value="speed">Speed</Option>
            <Option value="test">Test</Option>
            <Option value="invalid">Invalid</Option>
          </Select>
          <LineGraph x={x} y={y} data={input}></LineGraph>
        </div>
      </div>
    </main>
  );
};