import React, { useState } from 'react';
import { DatePicker, message, Select} from 'antd';
import 'antd/dist/antd.less';
import LineGraph from '../components/linegraph'
import TrendChart from '../components/adaptiveGraph'

const { Option } = Select;

export default function Dashboard() {
  
  const [date, setDate] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  return (
    <main>
      <nav className="live-nav">
        <DatePicker onChange={handleChange} />

        <label>Driver:</label>
        <select name="cars" id="cars">
          <option value="volvo">Max</option>
          <option value="saab">Chirs</option>
          <option value="opel">Gabi</option>
          <option value="audi">Other</option>
        </select>
        
        <label>Lap:</label>
        <select name="cars" id="cars">
          <option value="volvo">1</option>
          <option value="saab">2</option>
          <option value="opel">3</option>
          <option value="audi">4</option>
        </select>
      </nav>

      <div style={{ width: 500, margin: '20px'}}>
        <TrendChart></TrendChart>
      </div>
      <div style={{ width: 500, marginLeft: '550px' }}>
        <TrendChart></TrendChart>
      </div>
    </main>
  );
};