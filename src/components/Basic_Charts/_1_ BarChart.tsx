import { useRef, useEffect } from "react";
import { select } from "d3";

const BarChart = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const w = 300;
  // const h = 100;
  const h = 120;
  const padding = 2;
  const dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18];
  const colorPicker = (data: number) => {
    if (data <= 20) {
      return "#666666";
    }

    return "#FF0333";
  };

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

      // [Adding colors]
      .attr("x", (d, i) => {
        return (i * w) / dataset.length;
      })
      .attr("y", (d) => h - d * 4)
      .attr("width", w / dataset.length - padding)
      .attr("height", (d) => d * 4)

      // 2) specifying color in terms of the data
      .attr("fill", (d) => colorPicker(d));

    // 1) Different colors
    // adding colors4
    // .attr("fill", (d) => `rgb(${d * 10}, 0, 0)`);

    // [Adding Labels]
    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("text-anchor", "middle")
      .attr(
        "x",
        (d, i) => i * (w / dataset.length) + (w / dataset.length - padding) / 2
      )
      .attr("y", (d) => h - d * 4 + 14) // 100 --->  120
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("fill", "white");
  }, []);

  return (
    <div>
      <h1>Bar Chart</h1>
      <div ref={barRef} />
    </div>
  );
};

export default BarChart;
