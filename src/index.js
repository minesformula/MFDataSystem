import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SideNav from "./components/SideNav";
import Home from "./routes/Home";
import Ingest from "./routes/Ingest";
import Dashboard from "./routes/Dashboard";
import Live from "./routes/Live";
import Config from "./routes/Config";

import './index.css';
import 'antd/dist/antd.less';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <SideNav></SideNav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/import" element={<Ingest />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/live" element={<Live />} />
      <Route path="/settings" element={<Config />} />
    </Routes>
  </BrowserRouter>
);
