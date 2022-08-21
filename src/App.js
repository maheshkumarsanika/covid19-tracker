import { useEffect, useState } from "react";
import Header from "./Components/Header";
import MapComponent from "./Components/Map";
import StateStats from "./Components/States";
import { statesDataAPI, districtWiseDataAPI } from "./utils/apis";

const App = () => {
  const [statesData, setStatesData] = useState([]);
  const [districtWiseData, setDistrictWiseData] = useState({});

  useEffect(() => {
    (async () => {
      const statesData = await statesDataAPI();
      setStatesData(statesData);
      const districtsData = await districtWiseDataAPI();
      setDistrictWiseData(districtsData);
    })();
  }, []);

  return (
    <>
      <Header title="COVID-19 Tracker" />
      <div className="columns p-6 mt-6">
        <div style={{ position: 'fixed !important'}} className="column is-6">
          <MapComponent states={statesData} />
        </div>
        <div className="column is-6 stats-container">
          <StateStats states={statesData} districts={districtWiseData} />
        </div>
      </div>
    </>
  )
}

export default App;