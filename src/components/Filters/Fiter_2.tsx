import { useRef, useEffect, useState } from "react";
import monthSales from "./data-json/MonthlySalesbyCategoryMultiple.json";
import * as d3 from "d3";
import "./style.css";

interface MonthlyData {
  month: number;
  sales: number;
}

const getDate = (d: number) => {
  const strDate = d.toString();

  const year = +strDate.substr(0, 4);
  const month = +strDate.substr(4, 2) - 1;
  const day = +strDate.substr(6, 2);

  return new Date(year, month, day);
};

const Filter_2 = () => {
  const [selected, setSelected] = useState<number>(12);

  const ref = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLSelectElement | null>(null);

  const h = 100;
  const w = 300;
  const padding = 20;

  useEffect(() => {
    const buildHeadline = (category: string) => {
      d3.select(ref.current).append("h1").text(category).style("color", "blue");
    };

    const buildLineAndTable = (
      monthlySales: MonthlyData[],
      category: string
    ) => {
      console.log("monthlySSSSALES: ", monthlySales);
      const minDate = getDate(monthlySales[0].month);
      const maxDate = getDate(monthlySales[monthlySales.length - 1].month);

      const scaleX = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([padding + 5, w - padding]);

      const scaleY = d3
        .scaleLinear()
        .domain([
          d3.min(monthlySales, ({ sales }) => sales) as number,
          d3.max(monthlySales, ({ sales }) => sales) as number,
        ])
        .range([h - padding, 10]);

      const yAxisGen = d3.axisLeft(scaleY).ticks(4);
      const xAxisGen = d3.axisBottom(scaleX).ticks(d3.timeMonth, "%b");

      const lineFunc = d3
        .line<MonthlyData>()
        .x((d) => scaleX(getDate(d.month)))
        .y((d) => scaleY(d.sales))
        .curve(d3.curveLinear);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", `svg-${category}`);

      // Axis Y
      svg
        .append("g")
        .call(yAxisGen)
        .attr("class", "y-axis")
        .attr("transform", `translate(${padding}, 0)`);

      // Axis X
      svg
        .append("g")
        .call(xAxisGen)
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${h - padding})`);

      svg
        .append("path")
        .attr("d", lineFunc(monthlySales))
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("class", `path-${category}`);

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
        .append("tr")
        .append("td")
        .text((d) => d);
    };

    monthSales.contents.forEach(({ category, monthlySales }) => {
      buildHeadline(category);
      buildLineAndTable(monthlySales, category);
    });

    d3.select(selectedRef.current).on("change", (event) => {
      console.log(event.target.value);

      monthSales.contents.forEach(({ category, monthlySales }) => {
        buildLineAndTable(
          monthlySales.slice(
            monthlySales.length - event.target.value,
            monthlySales.length
          ),
          category
        );
      });
    });
  }, []);

  // useEffect(() => {
  //   const updateLineAndTable = (
  //     monthlySales: MonthlyData[],
  //     category: string
  //   ) => {
  //     const minDate = getDate(monthlySales[0].month);
  //     const maxDate = getDate(monthlySales[monthlySales.length - 1].month);

  //     const scaleX = d3
  //       .scaleTime()
  //       .domain([minDate, maxDate])
  //       .range([padding + 5, w - padding]);

  //     const scaleY = d3
  //       .scaleLinear()
  //       .domain([
  //         d3.min(monthlySales, ({ sales }) => sales) as number,
  //         d3.max(monthlySales, ({ sales }) => sales) as number,
  //       ])
  //       .range([h - padding, 10]);

  //     const yAxisGen = d3.axisLeft(scaleY).ticks(4);
  //     const xAxisGen = d3
  //       .axisBottom(scaleX)
  //       .ticks(d3.timeMonth, "%b")
  //       .ticks(monthlySales.length - 1);

  //     const lineFunc = d3
  //       .line<MonthlyData>()
  //       .x((d) => scaleX(getDate(d.month)))
  //       .y((d) => scaleY(d.sales))
  //       .curve(d3.curveLinear);

  //     const svg = d3
  //       // .select(ref.current)
  //       // svg should exist in the second useEffect?
  //       // .select("svg")
  //       // svg-category should exist in the second useEffect?
  //       .select(`svg-${category}`)
  //       .attr("width", w)
  //       .attr("height", h);

  //     // Axis Y
  //     svg.selectAll("g.y-axis");
  //     // .append("g")
  //     // .call(yAxisGen) // <------------------------- need to modify it
  //     // .attr("class", "axis")
  //     // .attr("transform", `translate(${padding}, 0)`);

  //     // Axis X
  //     svg.selectAll("g.x-axis");
  //     // .append("g")
  //     // .call(xAxisGen) // <------------------------- need to modify it.
  //     // .attr("class", "axis")
  //     // .attr("transform", `translate(0, ${h - padding})`);

  //     svg.selectAll(`.path-${category}`).attr("d", lineFunc(monthlySales));
  //     // .attr("stroke", "purple")
  //     // .attr("stroke-width", 2)
  //     // .attr("fill", "none");

  //     // [Only for the table]
  //     //   const t = d3
  //     //     .select(ref.current)
  //     //     .append("table");

  //     //   let salesTotal = 0;
  //     //   const metrics = [];

  //     //   for (let i = 0; i < monthlySales.length; i++) {
  //     //     salesTotal += +monthlySales[i].sales;
  //     //   }

  //     //   const average = salesTotal / monthlySales.length;

  //     //   metrics.push("Sales total: " + salesTotal);
  //     //   metrics.push("Average: " + average.toFixed(2));

  //     //   t.selectAll("tr")
  //     //     .data(metrics)
  //     //     .enter()
  //     //     .append("tr")
  //     //     .append("td")
  //     //     .text((d) => d);
  //   };
  // }, [selected]);

  return (
    <div>
      <h1>Filter_2 with Line Chart</h1>
      <p>
        Choose Data Range:
        <select ref={selectedRef}>
          <option value={12}>Last Year</option>
          <option value={6}>Last 6 months</option>
          <option value={3}>Last Quarter</option>
        </select>
      </p>

      <div ref={ref} />
    </div>
  );
};

export default Filter_2;
