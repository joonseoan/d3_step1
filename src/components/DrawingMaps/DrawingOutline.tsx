import { FC, useRef, useEffect } from "react";
import {
  select,
  geoPath,
  geoMercator,
  geoAlbersUsa,
  GeoPermissibleObjects,
  GeoPath,
} from "d3";
import usMap from "./data/us.json";

// useful website: https://codepen.io/sgratzl/pen/LYGbObX

const DrawingOutline: FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const w = 500;
  const h = 300;

  // 2) geoAlbersUSA.
  const projection = geoAlbersUsa()
    // css transform.translate(x, y)
    .translate([w / 2, h / 2]) // centering the map!å
    // // fully filled with width 500 above
    .scale(500);

  // .center([0, 5]).scale(150).rotate([-180, 0]);
  const path = geoPath().projection(projection);

  useEffect(() => {
    const svg = select(divRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // svg.append("g");

    // const data = usMap.features.map((feature) => ({
    //   feature: feature,
    //   name: feature.properties.NAME,
    //   value: Math.random(), // random value
    // }));

    svg
      .selectAll("path")
      .data(usMap.features)
      .enter()
      .append("path")
      // I think it is caused by the version.
      .attr("d", path as any)
      .attr("fill", "#666666");

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
