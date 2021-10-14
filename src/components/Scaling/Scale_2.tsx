import { useRef, useEffect } from "react";
import monthSales from "./data-json/MonthlySalesbyCategoryMultiple.json";
import * as d3 from "d3";

interface MonthlyData {
  month: number;
  sales: number;
}

const Scale_2 = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 400;

  useEffect(() => {
    const buildHeadline = (category: string) => {
      d3.select(ref.current).append("h1").text(category).style("color", "blue");
    };

    const buildLineAndTable = (monthlySales: MonthlyData[]) => {
      console.log("monthSales: ", monthlySales);

      const scaleX = d3
        .scaleLinear()
        .domain([
          // because it can return undefined or string.
          d3.min(monthlySales, ({ month }) => month) as number,
          d3.max(monthlySales, ({ month }) => month) as number,
        ])
        .range([0, w]);

      const scaleY = d3
        .scaleLinear()
        .domain([
          d3.min(monthlySales, ({ sales }) => sales) as number,
          d3.max(monthlySales, ({ sales }) => sales) as number,
        ])
        .range([h, 0]);

      /**
       * LineFunc: It is a guide for where the line pixel with x and y coords should be positioned.
       * Not it is scalable by mapping each month and sales value along with x and y scales above.
       */
      const lineFunc = d3
        .line<MonthlyData>()
        .x((d) => scaleX(d.month))
        // .x((d) => (d.month - 20130001) / 3.25)
        .y((d) => scaleY(d.sales))
        // .y((d) => h - d.sales)
        .curve(d3.curveLinear);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg
        .append("path")
        .attr("d", lineFunc(monthlySales))
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none");

      // [Important: adding table in the chart
      const t = d3.select(ref.current).append("table");

      let salesTotal = 0;
      const metrics = [];

      for (let i = 0; i < monthlySales.length; i++) {
        salesTotal += +monthlySales[i].sales;
      }

      const average = salesTotal / monthlySales.length;

      metrics.push("Sales total: " + salesTotal);
      metrics.push("Average: " + average.toFixed(2));

      t.selectAll("tr")
        .data(metrics)
        .enter()
        // two tr and two td because of the length of metrics.
        .append("tr")
        .append("td")
        .text((d) => d);
    };

    monthSales.contents.forEach(({ category, monthlySales }) => {
      buildHeadline(category);
      buildLineAndTable(monthlySales);
    });
  }, []);

  return (
    <div>
      <h1>Scale 2</h1>
      <div ref={ref} style={{ backgroundColor: "yellow" }} />
    </div>
  );
};

export default Scale_2;
