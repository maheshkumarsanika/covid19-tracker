import { useEffect, useState } from "react";
import Header from "./Components/Header";
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
        <div className="column is-5">Map Component</div>
        <div className="column is-7">
          <StateStats states={statesData} districts={districtWiseData} />
        </div>
      </div>
    </>
  )
}

export default App;