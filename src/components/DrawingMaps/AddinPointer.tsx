import { FC, useRef, useEffect } from "react";
import { select, geoPath, geoAlbersUsa, csv } from "d3";
import usMap from "./data/us.json";

const DrawingOutline: FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const w = 500;
  const h = 300;

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

      svg
        .selectAll("path")
        .data(usMap.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", "#666666");

      const ds = await csv("./data/sales-by-city.csv");

      if (!ds) {
        return;
      }

      const cx: any = function ({ lon, lat }: { lon: string; lat: string }) {
        const projectionData = projection([+lon, +lat]);
        if (projectionData) {
          return projectionData[0];
        }
      };

      // longitude and latitude value definition
      const cy: any = function ({ lon, lat }: { lon: string; lat: string }) {
        const projectionData = projection([+lon, +lat]);
        if (projectionData) {
          return projectionData[1];
        }
      };

      const r: any = function ({ sales }: { sales: string }) {
        if (sales) {
          return Math.sqrt(parseInt(sales)) * 0.02;
        }
      };

      svg
        .selectAll("circle")
        .data(ds)
        .enter()
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
        .attr("fill", "red");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Drawing Map</h1>
      <div ref={divRef} />
    </div>
  );
};

export default DrawingOutline;
