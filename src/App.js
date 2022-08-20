import Header from "./Components/Header";

const App = () => {
  return (
    <>
      <Header title="COVID-19 Tracker" />
      <div className="columns p-6">
        <div className="column">Map Component</div>
        <div className="column">State Component</div>
      </div>
    </>
  )
}

export default App;