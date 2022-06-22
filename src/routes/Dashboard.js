import React, { useState } from 'react';
import { DatePicker, message, Select} from 'antd';
import 'antd/dist/antd.less';
import LineGraph from '../components/linegraph'
import TrendChart from '../components/adaptiveGraph'

const { Option } = Select;

export default function Dashboard() {
  
  const [date, setDate] = useState(null);
  const [x, setX] = useState("Time");
  const [y, setY] = useState("Engine_Speed");
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  const handleSelectXChange = (event) => {
    console.log(event.target.value);
    setX(event.target.value);
  };
  const handleSelectYChange = (event) => {
    console.log(event.target.value);
    setY(event.target.value);
  };
  const options = [{value:'AFR'},
  {value:'Brake_Press_F'},
  {value:'Brake_Volt_F'},
  {value:'Distance'},
  {value:'ECU_THROTTLE'},
  {value:'Engine_Speed'},
  {value:'GPS_Altitude'},
  {value:'GPS_Elevation'},
  {value:'GPS_Gyro'},
  {value:'GPS_Heading'},
  {value:'GPS_LatAcc'},
  {value:'GPS_Latitude'},
  {value:'GPS_LonAcc'},
  {value:'GPS_Longitude'},
  {value:'GPS_Nsat'},
  {value:'GPS_PosAccuracy'},
  {value:'GPS_Slope'},
  {value:'GPS_SpdAccuracy'},
  {value:'GPS_Speed'},
  {value:'InlineAcc'},
  {value:'Intake_Temp'},
  {value:'LateralAcc'},
  {value:'MAP'},
  {value:'Oil_Pressure'},
  {value:'Oil_Temp_1'},
  {value:'PitchRate'},
  {value:'PreCalcGear'},
  {value:'Steering_Angle'},
  {value:'Throttle_Pos'},
  {value:'Time'},
  {value:'VerticalAcc'},
  {value:'Water_Temp_1'},
  {value:'YawRate'}
]
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
      <select defaultValue="Time" name="X" id="x" onChange={handleSelectXChange}>
          {options.map(({ value }, index) => <option value={value} >{value}</option>)}
        </select>
        <select defaultValue="Engine_Speed" name="Y" id="y" onChange={handleSelectYChange}>
          {options.map(({ value }, index) => <option value={value} >{value}</option>)}
        </select>
      <div style={{ width: 1000, margin: '0px'}}>
        <TrendChart x={x} y={y}></TrendChart>
      </div>
    </main>
  );
};