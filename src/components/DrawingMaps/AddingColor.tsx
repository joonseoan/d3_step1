import { FC, useRef, useEffect } from "react";
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

const AddingColor: FC = () => {
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

      // must use <string> to have string based color code.
      const color = scaleLinear<string>()
        // https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=6
        // pick orange and select 6 in class dropdown.
        .range([
          "#fef0d9",
          "#fdd49e",
          "#fdbb84",
          "#fc8d59",
          "#e34a33",
          "#b30000",
        ]);

      const ds = await csv("./data/state-sales.csv");

      // Need to solve this tomorrow!!
      // const sales = ds.map((data: StateSalesData) => {
      //   // if (data) {
      //     return +data.sales
      //   // }
      // });

      // color.domain([
      //   0,
      //   Math.max(...sales)
      // ]);

      svg
        .selectAll("path")
        .data(usMap.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", "#666666");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Adding Color</h1>
      <div ref={divRef} />
    </div>
  );
};

export default AddingColor;
