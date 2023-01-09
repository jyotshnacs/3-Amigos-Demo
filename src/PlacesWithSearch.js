import { useState, useEffect } from "react";
import Places from "./Places";
import SearchBar from "./SearchBar";

const PlacesWithSearch = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = "5ae2e3f221c38a28845f05b65e6317c0eb39dcc7051b73818a2d7bc7";

  const fetchPlaces = async () => {
    try {
      const GEO_NAME_URL = `https://api.opentripmap.com/0.1/en/places/geoname?name=${searchTerm}&apikey=${API_KEY}`;
      const geoResponse = await fetch(GEO_NAME_URL);
      const geoData = await geoResponse.json();
      //console.log(geoData);
      const { lat, lon } = geoData;
      const radiusURL = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&limit=20&apikey=${API_KEY}`;
      const radiusResponse = await fetch(radiusURL);
      const placesData = await radiusResponse.json();
      //console.log(placesData);

      const xids = placesData.features.map((feature) => {
        return feature.properties.xid;
      });
      //console.log(xids);
      let placesEnrichedData = [];
      let currentIndex = 0;
      while (currentIndex <= xids.length) {
        const minIndex = currentIndex;
        const maxIndex = currentIndex + 5;
        const xidsubSet = xids.slice(minIndex, maxIndex);
        currentIndex = maxIndex;
        // console.log(xidsubSet);
        await new Promise((r) => setTimeout(r, 1000));

        const responses = await Promise.all(
          xidsubSet.map(async (xid) => {
            const xidURL = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${API_KEY}`;
            const res = await fetch(xidURL);
            return res.json();
          })
        );
        //console.log(responses);
        placesEnrichedData = [...placesEnrichedData, ...responses];
        //console.log(placesEnrichedData);
      }
      console.log(placesEnrichedData);
      setPlaces(placesEnrichedData);

      setError(null);
    } catch (err) {
      // setError(err.message);
      setPlaces(null);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchTerm = (event) => {
    const keyword = event.target.value;
    if (keyword.length >= 3) {
      setSearchTerm(event.target.value);
    } else {
      setSearchTerm("");
    }
    console.log(`searchTerm: ${searchTerm}`);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      fetchPlaces();
    }, 1000);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <>
      {" "}
      {/* React fragment */}
      <div>
        <h2
          style={{ padding: "5px", display: "flex", justifyContent: "center" }}
        >
          Travel Companion - Experiences that matter !{" "}
        </h2>
        {loading && (
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Top Destinations Loading...
          </div>
        )}
        {error && (
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >{`Problem fetching places - ${error}`}</div>
        )}
        <SearchBar searchTerm={searchTerm} handleChange={updateSearchTerm} />
        {/* <Places places={places.features} /> */}

        <Places places={places} />
      </div>
    </>
  );
};

export default PlacesWithSearch;
