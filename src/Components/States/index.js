import { useEffect, useState } from "react";
import Districts from "../Districts";
import Filters from "../Filters";

const StateStats = ({ states, districts }) => {
  const [statesData, setStatesData] = useState([]);

  useEffect(() => {
    setStatesData(states);
  }, [states]);

  const [selectedState, setSelelctedState] = useState(null);

  const handleSortBy = (sortBy) => {
    const d = [...states];
    const [key, direction] = sortBy.split("__");

    d.sort((a, b) => {
      if (direction === "asc") {
        if (Number(a[key]) > Number(b[key])) return 1;
        else if (Number(a[key]) < Number(b[key])) return -1;
        return 0;
      } else {
        if (Number(b[key]) > Number(a[key])) return 1;
        else if (Number(b[key]) < Number(a[key])) return -1;
        return 0;
      }
    });

    setStatesData(d);
  };

  const handleFilterByText = (value) => {
    setStatesData(
      states.filter((a) =>
        a?.state?.toLowerCase().includes(value?.toLowerCase())
      )
    );
  };

  const total = states.find((s) => s.state === "Total");
  const onlyStates = statesData.filter((s) => s.state !== "Total");

  return (
    <div>
      <div key={total?.state} className="box has-background-dark">
        <div className="title is-4 has-text-white-bis">{total?.state}</div>
        <hr />
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="title is-4 has-text-primary">
                {Number(total?.active).toLocaleString()}
              </p>
              <p className="heading is-6  has-text-primary">Active</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="title is-4 has-text-white-bis">
                {Number(total?.confirmed).toLocaleString()}
              </p>
              <p className="heading is-6 has-text-white-bis">Confirmed</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="title is-4  has-text-danger">
                {Number(total?.deaths).toLocaleString()}
              </p>
              <p className="heading is-6  has-text-danger">Deaths</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="title is-4  has-text-success">
                {Number(total?.recovered).toLocaleString()}
              </p>
              <p className="heading is-6  has-text-success">Recovered</p>
            </div>
          </div>
        </nav>
        <hr />
        <div className="columns">
          <div className="column px-3 has-text-small has-text-white-bis">
            <small>
              Delta Stats:{" "}
              {`${Number(
                total?.deltaconfirmed
              ).toLocaleString()} Confirmed, ${Number(
                total?.deltadeaths
              ).toLocaleString()} Deaths, ${Number(
                total?.deltarecovered
              ).toLocaleString()} Recovered`}
            </small>
          </div>
        </div>
      </div>

      <Filters
        selectOptions={[
          {
            label: "Sort by Number of Active Cases (DESC)",
            value: "active__desc",
          },
          {
            label: "Sort by Number of Active Cases (ASC)",
            value: "active__asc",
          },
          {
            label: "Sort by Number of Confirmed Cases (DESC)",
            value: "confirmed__desc",
          },
          {
            label: "Sort by Number of Confirmed Cases (ASC)",
            value: "confirmed__asc",
          },
          { label: "Sort by Number of Deaths (DESC)", value: "deaths__desc" },
          { label: "Sort by Number of Deaths (ASC)", value: "deaths__asc" },
          {
            label: "Sort by Number of Recovered (DESC)",
            value: "recovered__desc",
          },
          {
            label: "Sort by Number of Recovered (ASC)",
            value: "recovered__asc",
          },
        ]}
        onSortBy={handleSortBy}
        onFilter={handleFilterByText}
      />

      {onlyStates.map((stats) => {
        const subject = `Covid19 Stats for ${stats?.state}`;
        const body = `Active Cases: ${Number(
          stats?.active
        ).toLocaleString()} | Confirmed Cases: ${Number(
          stats?.confirmed
        ).toLocaleString()} | Deaths: ${Number(stats?.deaths).toLocaleString()}`;
        const href = `mailto:?subject=${subject}&body=${body}`;

        return (
          <div key={stats?.state} className="box">
            <div className="title is-4 has-text-info">
              {stats?.state}
              <span className="is-pulled-right">
                <a href={href}>&#9993;</a>
              </span>
            </div>
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
                {stats?.state !== "Total" && (
                  <button
                    type="button"
                    onClick={(e) =>
                      setSelelctedState(
                        selectedState === stats?.state ? null : stats?.state
                      )
                    }
                    className="is-rounded  button is-primary is-small is-pulled-right"
                  >
                    {selectedState === stats?.state ? "Hide" : "View"} District
                    wise Stats
                  </button>
                )}
              </div>
            </div>
            {selectedState && selectedState === stats?.state && (
              <Districts
                state={selectedState}
                districts={districts[selectedState]}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StateStats;
