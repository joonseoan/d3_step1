import { useRef, useEffect } from "react";
import monthSales from "./data-json/MonthlySales.json";
import * as d3 from "d3";

interface MonthlyData {
  month: number;
  sales: number;
}

const JSON = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 400;

  const lineFunc = d3
    .line<MonthlyData>()
    .x((d) => (d.month - 20130001) / 3.25)
    .y((d) => h - d.sales)
    .curve(d3.curveLinear);

  useEffect(() => {
    d3.select(ref.current)
      .append("h1")
      .text("This is Headline!!!")
      .style("color", "blue");

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .append("path")
      .attr("d", lineFunc(monthSales))
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    // [Important: adding table in the chart
    const t = d3.select(ref.current).append("table");

    let salesTotal = 0;
    const metrics = [];

    for (let i = 0; i < monthSales.length; i++) {
      salesTotal += +monthSales[i].sales;
    }

    const average = salesTotal / monthSales.length;

    metrics.push("Sales total: " + salesTotal);
    metrics.push("Average: " + average.toFixed(2));

    t.selectAll("tr")
      .data(metrics)
      .enter()
      // two tr and two td because of the length of metrics.
      .append("tr")
      .append("td")
      .text((d) => d);
  }, []);

  return (
    <div>
      <h1>JSON File</h1>
      <div ref={ref} />
    </div>
  );
};

export default JSON;
