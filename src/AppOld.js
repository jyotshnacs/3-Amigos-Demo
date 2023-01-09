// Geoname API call using hard coded city name -> returns lat/lon
// save lat and lon into separate states
//  Radius API call using lat/long to get an object containing 10 locations within 1k radius
// Pull from these results: an array containing 10 XIDs
// save this array as 'results' state
//  create a function that iterates over the array of XIDs. For each XID item:
// XID API using XID to get location data (img-src etc)
// render an image for each one

import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [xid, setXid] = useState("");

  const API_KEY = "5ae2e3f221c38a28845f05b65e6317c0eb39dcc7051b73818a2d7bc7";
  const URL = `https://api.opentripmap.com/0.1/en/places/geoname?name=london&apikey=${API_KEY}`;
  const radiusURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=-0.12574&lat=51.50853&limit=20&apikey=${API_KEY}`;
  const xidURL = `https://api.opentripmap.com/0.1/en/places/xid/Q18159614?apikey=${API_KEY}`;

  useEffect(() => {
    async function getData() {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      // console.log(response.lat);
      setLat(data.lat);
      // console.log(response.lon);
      setLon(data.lon);
      console.log(lon);
      console.log(lat);
    }
    getData();

    async function getRadius() {
      const response = await fetch(radiusURL);
      //get radius from lat lon:")
      const data = await response.json();
      console.log(data);
      setXid(data.xid);
      console.log(xid);
    }
    getRadius();

    async function getXid() {
      const response = await fetch(xidURL);
      //get radius from lat lon:")
      const data = await response.json();
      console.log(data);
      setXid(data.xid);
      console.log(xid);
    }
    getXid();
  }, []);

  // Returns true if the request was successful.
  function handleChange(event) {
    //call fetch data again but with the search url
    // const searchURL = xidURL;
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  function handleClick(event) {
    // if (event.key === "Enter") {
    // setData(event.target.value);
    // console.log(event.target.value, "event");
    // setSearchTerm(event.target.value);
    //console.log(searchTerm);
    console.log(event.target.value);
  }

  return (
    <div className="App">
      <h1>3 Amigos</h1>
      <input
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
        // onKeyDown={handleClick}
      ></input>
      <button
        type="submit"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Submit
      </button>
      {/* <img src={xid.otm} alt="img" key={xid.name}></img> */}
    </div>
  );
}
export default App;

// REQUESTS:
// to get lat long from city name: https://api.opentripmap.com/0.1/en/places/geoname?name=london&apikey=5ae2e3f221c38a28845f05b62614b44a8ee2b1647ac578d28da4803a
// t get radius from lat lon: https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=0.1276&lat=51.5072&apikey=5ae2e3f221c38a28845f05b62614b44a8ee2b1647ac578d28da4803a
// to get object information from XID: https://api.opentripmap.com/0.1/en/places/xid/15900987?apikey=5ae2e3f221c38a28845f05b62614b44a8ee2b1647ac578d28da4803a
