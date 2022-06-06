import React from "react";
import { VscFolderOpened, VscCloudUpload } from "react-icons/vsc";
import "../styles/home.css" 




export default function Home() {
  return (
    <main>
      <h1 class="header">Mines Formula Data Systems</h1>

      <div class="wrapper">
        <div class="openIcon icon">
            <VscFolderOpened class="icon"/>
            <p class="iconText">Open</p>
        </div>

        <div class="importIcon icon">
          <label for="file-input">
            <VscCloudUpload class="icon"/>
            <p class="iconText">Import</p>
          </label>
          <input id="file-input" type="file"/>
        </div>
        
      </div>

      <div>
        <p class="tableLabel">Recent Sessions</p>

        <table>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Driver</th>
          <th>Session</th>
          <th># of Labs</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>5/31/2022</td>
          <td>CTLM Lot</td>
          <td>Max</td>
          <td>1</td>
          <td>10</td>
          <td>Initial Car Testing</td>
        </tr>
        <tr>
          <td>5/31/2022</td>
          <td>CTLM Lot</td>
          <td>Max</td>
          <td>2</td>
          <td>15</td>
          <td>Initial Car Testing</td>
        </tr>
        <tr>
          <td>5/31/2022</td>
          <td>CTLM Lot</td>
          <td>Max</td>
          <td>3</td>
          <td>4</td>
          <td>Initial Car Testing</td>
        </tr>
        <tr>
          <td>5/31/2022</td>
          <td>CTLM Lot</td>
          <td>Gabi</td>
          <td>1</td>
          <td>20</td>
          <td>Initial Car Testing</td>
        </tr>
        <tr>
          <td>5/31/2022</td>
          <td>CTLM Lot</td>
          <td>Gabi</td>
          <td>2</td>
          <td>9</td>
          <td>Initial Car Testing</td>
        </tr>
      </table>
      </div>

      
    </main>
  );
}