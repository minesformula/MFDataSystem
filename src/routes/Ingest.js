import React, { useState } from "react";
const PouchDB = require('pouchdb').default;
PouchDB.plugin(require('pouchdb-find').default);

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  var headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  headers = headers.map(element => {
    return element.trim();
  });

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  var rows = str.slice(str.indexOf("\n") + 1).split("\n");
  rows = rows.map(element => {
    return element.trim();
  });

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

export default function Ingest() {
  var db = new PouchDB('test');
  db.info().then(function (info) {
    console.log(info);
  })

  const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                const data = csvToArray(csvOutput);
                var data2 = { "docs" : data }; //Fix pouchdb issue
                //bulk load data

                db.bulkDocs(data2);

                //create index for faster lookups
                db.createIndex({
                  index: {
                    fields: ['Time']
                  }
                }).then(function (result) {
                  console.log("Ingested Data:")
                  console.log(data)
                  // handle result
                }).catch(function (err) {
                  console.log(err);
                });
            };
            fileReader.readAsText(file);
            
        }
    };

  return (
    <main>
      <h2>WIP Import</h2>
      <div style={{ textAlign: "center" }}>
            <h1>Import CSV Data </h1>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                >
                    IMPORT CSV
                </button>
            </form>
        </div>
    </main>
    
  );
}