const StateStats = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([state, stats]) => {
        return (
          <div key={state} className="box">
            <div className="title is-4 has-text-info">{state}</div>
            <hr />
            <nav className="level is-mobile">
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-4 has-text-primary">
                    {Number(stats?.active).toLocaleString()}
                  </p>
                  <p className="heading is-6  has-text-primary">Active</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-4 has-text-grey">
                    {Number(stats?.confirmed).toLocaleString()}
                  </p>
                  <p className="heading is-6 has-text-grey">Confirmed</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-4  has-text-danger">
                    {Number(stats?.deaths).toLocaleString()}
                  </p>
                  <p className="heading is-6  has-text-danger">Deaths</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title is-4  has-text-success">
                    {Number(stats?.recovered).toLocaleString()}
                  </p>
                  <p className="heading is-6  has-text-success">Recovered</p>
                </div>
              </div>
            </nav>
            <hr />
            <div className="columns">
              <div className="column px-3 has-text-small has-text-grey">
                <small>
                  Delta Stats:{" "}
                  {`${Number(
                    stats?.deltaconfirmed
                  ).toLocaleString()} Confirmed, ${Number(
                    stats?.deltadeaths
                  ).toLocaleString()} Deaths, ${Number(
                    stats?.deltarecovered
                  ).toLocaleString()} Recovered`}
                </small>
              </div>
              <div className="column">
                <button className="is-rounded  button is-primary is-small is-pulled-right">
                  View District wise Stats
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StateStats;
