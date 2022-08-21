import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";

/**
 * Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
 * Looking topojson for other countries/world?
 * Visit: https://github.com/markmarkoh/datamaps
 */
const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 1000,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "#EEE";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

const LinearGradient = (props) => {
  const { data } = props;
  const boxStyle = {
    width: 180,
    margin: "auto",
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20,
  };

  return (
    <div>
      <div style={boxStyle} className="display-flex">
        <span>{data.min}</span>
        <span className="fill"></span>
        <span>{data.max}</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
    </div>
  );
};

const MapComponent = ({ states }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      states
        .filter((s) => s.state !== "Total")
        .map((s) => ({
          id: s.statecode,
          state: s.state,
          ...s,
        }))
    );
  }, [states]);

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.active > max ? item.active : max), 0),
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.active))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(
        `${geo.properties.name} Cases: Active - ${current.active} | Confirmed - ${current.confirmed} | Deaths - ${current.deaths}`
      );
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="full-width-height container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={700}
        height={600}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.active) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <LinearGradient data={gradientData} />
    </div>
  );
};

export default MapComponent;
