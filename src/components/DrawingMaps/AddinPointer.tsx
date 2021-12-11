import { FC, useRef, useEffect, useImperativeHandle } from "react";
import {
  select,
  geoPath,
  geoAlbersUsa,
  csv,
  scaleLinear,
  max,
  DSVRowArray,
} from "d3";
import usMap from "./data/us.json";

interface StateSalesData {
  state: string;
  sales: string;
}

interface Properties {
  GEO_ID: string;
  STATE: string;
  NAME: string;
  LSAD: null;
  CENSUSAREA: number;
  value?: number;
}

const AddingPointer: FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const w = 500;
  const h = 300;

  // 2) geoAlbersUSA.
  const projection = geoAlbersUsa()
    .translate([w / 2, h / 2]) // centering the map!å
    .scale(500);

  const path = geoPath().projection(projection);

  useEffect(() => {
    (async () => {
      const svg = select(divRef.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // define color range.
      // must use <string> to have string based color code.
      const color = scaleLinear<string>()
        // https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=6
        // pick orange and select 6 in class dropdown.
        .range([
          "#fef0d9", // ---> number
          "#fdd49e", // ---> number
          "#fdbb84", // .
          "#fc8d59", // .
          "#e34a33", // .
          "#b30000", // .
        ]);

      // geoJSON data parsing.
      const ds = await csv("./data/state-sales.csv");

      if (!ds || !ds.length) {
        throw new Error("Failed to parse map data.");
      }

      // eslint-disable-next-line array-callback-return
      const sales = ds.map(({ sales }) => {
        if (sales) {
          return +sales;
        }
      });

      console.log("sales: ", sales);

      // color domain!!! along with range.
      color.domain([0, Math.max(...(sales as any))]);

      // create "value" attribute to be used as a parameter to invoke color.
      ds.forEach(({ state, sales }) => {
        usMap.features.forEach(({ properties }: { properties: Properties }) => {
          if (state === properties.NAME && sales) {
            properties["value"] = +sales;
          }
        });
      });

      svg
        .selectAll("path")
        .data(usMap.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", ({ properties }: { properties: Properties }) =>
          properties.value ? color(properties.value) : "#666666"
        );
      // .attr("fill", "#666666");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Adding Pointer</h1>
      <div ref={divRef} />
    </div>
  );
};

export default AddingPointer;
