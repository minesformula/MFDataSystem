import React, { useState } from 'react';
import { VscCloudDownload, VscGraphLine, VscHome, VscRadioTower, VscTools } from "react-icons/vsc";

const SideNav = () => {
    return (
        <>
            <nav class="sidenav">
                <a href="../../public/index.html"><VscHome /></a>

                <a href="../../public/index.html"><VscCloudDownload /></a>
                
                <a href="../../public/index.html"><VscGraphLine /></a>

                <a href="../../public/index.html"><VscRadioTower/></a>
                
                <a href="../../public/index.html"><VscTools/></a>
            </nav>
        </>
    );
};
export default SideNav;