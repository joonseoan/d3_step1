import { useRef, useEffect } from "react";
import monthSales from "./data-json/MonthlySalesbyCategoryMultiple.json";
import * as d3 from "d3";
import "./style.css";

interface MonthlyData {
  month: number;
  sales: number;
}

const getDate = (d: Date) => {
  const strDate = d.toString();

  const year = +strDate.substr(0, 4);
  const month = +strDate.substr(4, 2) - 1;
  const day = +strDate.substr(6, 2);

  return new Date(year, month, day);
};

const Axis_1 = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 300;
  const padding = 20;

  useEffect(() => {
    const buildHeadline = (category: string) => {
      d3.select(ref.current).append("h1").text(category).style("color", "blue");
    };

    const buildLineAndTable = (monthlySales: MonthlyData[]) => {
      const scaleX = d3
        // need to implement time because of the values of the ticks are time.
        // .timeFormat()
        // .scale()
        // .scale
        .scaleLinear()
        .domain([
          // because it can return undefined or string.
          d3.min(monthlySales, ({ month }) => month) as number,
          d3.max(monthlySales, ({ month }) => month) as number,
        ])
        // To get axisY space, need to push the line chart to the right side.
        // "padding + 5": padding which is axis width + 10 (space between axis right and line chart) which starts 25.
        // "w - padding": w is the point, 100 from the "padding + 5" and subtract padding from "w"
        .range([padding + 5, w - padding])
        .nice();

      const scaleY = d3
        .scaleLinear()
        .domain([
          d3.min(monthlySales, ({ sales }) => sales) as number,
          d3.max(monthlySales, ({ sales }) => sales) as number,
        ])
        // Fit the graph in the axis scale.
        // "h - padding": It starts from top to down. "300 - 20" is a start point of the top.
        // "10":  give a space at the bottom
        .range([h - padding, 10])
        .nice();

      // still need scaleY to develop yAxis.
      // ticks(number): just show the number of ticks.
      const yAxisGen = d3.axisLeft(scaleY).ticks(4);

      // xAxis
      const xAxisGen = d3.axisBottom(scaleX);

      const lineFunc = d3
        .line<MonthlyData>()
        .x((d) => scaleX(d.month))
        .y((d) => scaleY(d.sales))
        .curve(d3.curveLinear);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      // "g" is the grouping of the child elements like the one in the MS PPT.
      const yAxis = svg
        .append("g")
        // add 'axis'.
        .call(yAxisGen)
        // add class for css file.
        .attr("class", "axis")
        // x value is padding and y value is 0.
        // because it needs some space to show each tick and its value.
        .attr("transform", `translate(${padding}, 0)`);

      const xAxis = svg
        .append("g")
        .call(xAxisGen)
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - padding})`);

      svg
        .append("path")
        .attr("d", lineFunc(monthlySales))
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none");

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
      <h1>Axis 1</h1>
      <div ref={ref} style={{ backgroundColor: "yellow" }} />
    </div>
  );
};

export default Axis_1;
