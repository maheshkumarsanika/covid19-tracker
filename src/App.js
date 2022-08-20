import { useEffect, useState } from "react";
import Header from "./Components/Header";
import StateStats from "./Components/States";
import { statesDataAPI } from "./utils/apis";

const App = () => {
  const [statesData, setStatesData] = useState({});
  const [districtWiseData, setDistrictWiseData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await statesDataAPI();
      setStatesData(data)
    })();
  }, []);

  return (
    <>
      <Header title="COVID-19 Tracker" />
      <div className="columns p-6 mt-6">
        <div className="column is-5">Map Component</div>
        <div className="column is-7">
          <StateStats data={statesData} />
        </div>
      </div>
    </>
  )
}

export default App;