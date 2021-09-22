import { useRef, useEffect } from "react";
import { select } from "d3";

const BarChart = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const w = 300;
  const h = 100;
  const padding = 2;
  const dataset = [5, 10, 14, 20, 25];

  useEffect(() => {
    const svg = select(barRef.current)
      .append("svg")
      .attr("height", h)
      .attr("width", w);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return (i * w) / dataset.length;
      })
      .attr("y", (d) => h - d * 4)
      .attr("width", w / dataset.length - padding)
      .attr("height", (d) => d * 4);
  }, []);

  return (
    <div>
      <h1>Bar Chart</h1>
      <div ref={barRef} />
    </div>
  );
};

export default BarChart;
