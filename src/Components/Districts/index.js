import { useEffect, useState } from "react";
import Filters from "../Filters";

const Districts = ({ state, districts }) => {
  const flattenDistrictsData = (d) => {
    return Object.entries(d.districtData).map(([district, stats]) => ({
      ...stats,
      district,
    }));
  };

  const [data, setData] = useState(flattenDistrictsData(districts));

  useEffect(() => {
    setData(flattenDistrictsData(districts));
  }, [districts]);

  const handleSortBy = (sortBy) => {
    const d = flattenDistrictsData(districts);
    const [key, direction] = sortBy.split("__");

    d.sort((a, b) => {
      if (direction === "asc") {
        if (a[key] > b[key]) return 1;
        else if (a[key] < b[key]) return -1;
        return 0;
      } else {
        if (b[key] > a[key]) return 1;
        else if (b[key] < a[key]) return -1;
        return 0;
      }
    });

    setData(d);
  };

  const handleFilterByText = (value) => {
    const d = flattenDistrictsData(districts);
    setData(
      d.filter((a) => a?.district?.toLowerCase().includes(value?.toLowerCase()))
    );
  };

  return (
    <div className="box" id={`${state}_districts`}>
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
          { label: "Sort by Number of Deaths (DESC)", value: "deceased__desc" },
          { label: "Sort by Number of Deaths (ASC)", value: "deceased__asc" },
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

      <table className="table is-striped is-fullwidth">
        <tbody>
          <tr className="is-selected">
            <td>District</td>
            <td>Active</td>
            <td>Confirmed</td>
            <td>Deaths</td>
            <td>Recovered</td>
            <td>Delta</td>
            <td></td>
          </tr>
          {data.map((stats) => {
            const subject = `Covid19 Stats for ${stats?.district}`;
            const body = `Active Cases: ${Number(
              stats?.active
            ).toLocaleString()} | Confirmed Cases: ${Number(
              stats?.confirmed
            ).toLocaleString()} | Deaths: ${Number(
              stats?.deceased
            ).toLocaleString()}`;
            const href = `mailto:?subject=${subject}&body=${body}`;

            return (
              <tr key={stats.district}>
                <td>{stats.district}</td>
                <td>{Number(stats?.active).toLocaleString()}</td>
                <td>{Number(stats?.confirmed).toLocaleString()}</td>
                <td>{Number(stats?.deceased).toLocaleString()}</td>
                <td>{Number(stats?.recovered).toLocaleString()}</td>
                <td>
                  <small>
                    <div>
                      Confirmed:{" "}
                      {Number(stats?.delta?.confirmed).toLocaleString()}
                    </div>
                    <div>
                      Deaths: {Number(stats?.delta?.deceased).toLocaleString()}
                    </div>
                    <div>
                      Recovered:{" "}
                      {Number(stats?.delta?.recovered).toLocaleString()}
                    </div>
                  </small>
                </td>
                <td>
                  <span className="is-pulled-right">
                    <a href={href}>&#9993;</a>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Districts;
