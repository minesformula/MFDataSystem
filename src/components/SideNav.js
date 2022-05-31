import React from 'react';
import { VscCloudDownload, VscGraphLine, VscHome, VscRadioTower, VscTools } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <nav class="sidenav">
      <Link to="/"><VscHome /></Link>
      <Link to="/import"><VscCloudDownload /></Link>
      <Link to="/dashboard"><VscGraphLine /></Link>
      <Link to="/live"><VscRadioTower/></Link>
      <Link to="/settings"><VscTools/></Link>
    </nav>
  );
}
