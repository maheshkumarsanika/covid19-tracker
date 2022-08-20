const Districts = ({ state, districts }) => {
  return (
    <div className="box">
      <table className="table is-striped is-fullwidth">
        <tr className="is-selected">
          <td>District</td>
          <td>Active</td>
          <td>Confirmed</td>
          <td>Deaths</td>
          <td>Recovered</td>
          <td>Delta</td>
        </tr>
        {Object.entries(districts["districtData"]).map(([district, stats]) => {
          return (
            <tr>
              <td>{district}</td>
              <td>{Number(stats?.active).toLocaleString()}</td>
              <td>{Number(stats?.confirmed).toLocaleString()}</td>
              <td>{Number(stats?.deceased).toLocaleString()}</td>
              <td>{Number(stats?.recovered).toLocaleString()}</td>
              <td>
                <small>
                  <div>
                    Delta Confirmed:{" "}
                    {Number(stats?.delta?.confirmed).toLocaleString()}
                  </div>
                  <div>
                    Delta Deaths:{" "}
                    {Number(stats?.delta?.deceased).toLocaleString()}
                  </div>
                  <div>
                    Delta Recovered:{" "}
                    {Number(stats?.delta?.recovered).toLocaleString()}
                  </div>
                </small>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Districts;
