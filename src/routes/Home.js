import React from "react";
import { VscFolderOpened, VscCloudUpload } from "react-icons/vsc";
import "../styles/home.css" 


export default function Home() {
  return (
    <main>
      <div class="mainIcons">
        <div>
          <button id=""><VscFolderOpened /></button>
          <h1>Open</h1>
        </div>

        <div>
          <button id="mainIcons"><VscCloudUpload /></button>
          <h1>Import</h1>
        </div>
        
        
        
    

      </div>
    </main>
  );
}