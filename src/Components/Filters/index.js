import { useState } from "react";

const Filters = ({ selectOptions = [], onSortBy, onFilter }) => {
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    onFilter(value);
  };

  const handleSortBy = (e) => {
    const value = e.target.value;
    if (value) {
      setSortBy(value);
      onSortBy(value);
    }
  };

  return (
    <div className="columns">
      <div className="column">
        <input
          value={filterText}
          onChange={handleFilterChange}
          type="text"
          placeholder="Type to Filter..."
          className="input"
        />
      </div>
      <div className="column">
        <div className="select">
          <select value={sortBy} onChange={handleSortBy}>
            <option value="">Sort By</option>
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filters;
