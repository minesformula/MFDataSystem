import "../styles/live.css"
import MapChart from "../components/MapChart";
import React, { useState } from 'react';
import { DatePicker, message, Select} from 'antd';
import 'antd/dist/antd.less';
import LineGraph from '../components/linegraph'
import TrendChart from '../components/adaptiveGraph'

const { Option } = Select;

export default function Live() {
  return (
    <main>
      <nav className="live-nav">
        <a>General</a>
        <a>Powertrain</a>
        <a>Electrical</a>
        <a>Suspension</a>
        <a>Aerodynamics</a>
        <button>Connect</button>
      </nav>
      <div>
      <MapChart />
    </div>
    </main>
  );
}