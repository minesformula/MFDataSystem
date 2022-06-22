import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import React, { useState } from 'react';
const PouchDB = require('pouchdb').default;
 
export class MapChart extends React.Component {
    
  render() {
    const triangleCoords = [
        {lat: 39.75007885, lng: -105.2178648},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
        {lat: 25.774, lng: -80.190}
      ];
    var gpsPoints = [{lat: 39.75006555, lng: -105.2180168}, {lat: 39.75006551, lng: -105.2180152}, {lat: 39.75006547, lng: -105.2180136}, {lat: 39.75006543, lng: -105.218012}, {lat: 39.75006539, lng: -105.2180104}]
    var coords;
    var db = new PouchDB('test1');
    db.find({selector: {Time: {$gte:null}}, sort: ['Time']}).then(function (result) {
        console.log(result)
        result = result.docs;
        console.log(result)
        for (var key in result) {
            var currentDoc = result[key].doc;
            //console.log(result[key]);
            //console.log([currentDoc.GPS_Latitude, currentDoc.GPS_Longitude]);/
            try{
            if(currentDoc.GPS_Latitude != null){
            
            gpsPoints.push({lat: parseFloat(currentDoc.GPS_Latitude), lng: parseFloat(currentDoc.GPS_Longitude)});
            }
        }
            catch{

            }
        
        }
        //console.log(gpsPoints);
        coords = JSON.stringify(gpsPoints);
        console.log(gpsPoints)
        //gpsPoints.splice(100,4700)
        console.log(coords)
        
    }).catch(function (err) {
        console.log(err);
    });
    return (
        <Map google={this.props.google}
        style={{width: '100%', height: '100%'}}
        className={'map'}
        zoom={5}>
        <Polyline
          path={gpsPoints}
          options={{geodesic: true,
          strokeColor: "#0000FF",
          strokeOpacity:1.0,
          strokeWeight:2,}}
           />
    </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCPgSn9PAKqLkW3jq0G9heioZomiee3ofg")
})(MapChart)