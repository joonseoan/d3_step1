import { useRef, useEffect, useState } from "react";
import monthSales from "./data-json/MonthlySalesbyCategoryMultiple.json";
import "./style.css";
import {
  select,
  min as d3min,
  max as d3max,
  scaleTime,
  scaleLinear,
  axisLeft,
  axisBottom,
  line,
  curveLinear,
  timeMonth,
  Selection,
  easeLinear,
} from "d3";

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
  const [selected, setSelected] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const h = 100;
  const w = 300;
  const padding = 20;

  const buildHeadline = (category: string) => {
    select(divRef.current).append("h1").text(category).style("color", "blue");
  };

  const buildLineAndTable = (monthlySales: MonthlyData[], category: string) => {
    const minDate = getDate(monthlySales[0].month);
    const maxDate = getDate(monthlySales[monthlySales.length - 1].month);

    const scaleX = scaleTime()
      .domain([minDate, maxDate])
      .range([padding + 5, w - padding]);

    const scaleY = scaleLinear()
      .domain([
        d3min(monthlySales, ({ sales }) => sales) as number,
        d3max(monthlySales, ({ sales }) => sales) as number,
      ])
      .range([h - padding, 10]);

    const yAxisGen = axisLeft(scaleY).ticks(4);
    const xAxisGen = axisBottom(scaleX).ticks(timeMonth, "%b");

    const lineFunc = line<MonthlyData>()
      .x((d) => scaleX(getDate(d.month)))
      .y((d) => scaleY(d.sales))
      .curve(curveLinear);

    const svg = select(divRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", `svg-${category}`);

    // Axis Y
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxisGen);

    // Axis X
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxisGen);

    svg
      .append("path")
      .attr("d", lineFunc(monthlySales))
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("class", `path-${category}`);

    const t = select(divRef.current)
      .append("table")
      .attr("id", `table-${category}`);

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

  useEffect(() => {
    monthSales.contents.forEach(({ category, monthlySales }) => {
      buildHeadline(category);
      buildLineAndTable(monthlySales, category);
    });

    select(selectRef.current).on("change", (event) => {
      setSelected(event.target.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLineAndTable = (
    monthlySales: MonthlyData[],
    category: string
  ) => {
    const minDate = getDate(monthlySales[0].month);
    const maxDate = getDate(monthlySales[monthlySales.length - 1].month);

    const scaleY = scaleLinear()
      .domain([
        d3min(monthlySales, ({ sales }) => sales) as number,
        d3max(monthlySales, ({ sales }) => sales) as number,
      ])
      .range([h - padding, 10]);

    const scaleX = scaleTime()
      .domain([minDate, maxDate])
      .range([padding + 5, w - padding]);

    const yAxisGen = axisLeft(scaleY).ticks(4);
    const xAxisGen = axisBottom(scaleX).ticks(timeMonth, "%b");

    const lineFunc = line<MonthlyData>()
      .x((d) => scaleX(getDate(d.month)))
      .y((d) => scaleY(d.sales))
      .curve(curveLinear);

    const svg = select(`#svg-${category}`);

    // Axis Y
    svg.select(".y-axis").call(yAxisGen as any);

    // Axis X
    svg.select(".x-axis").call(xAxisGen as any);

    // Line graph
    svg
      .select(`.path-${category}`)
      //Animation
      .transition()
      .duration(1000)
      .ease(easeLinear)

      // Mor variant.
      // https://observablehq.com/@d3/easing-animations
      // .ease(easeElastic)
      // .ease(easeBounce)

      .attr("d", lineFunc(monthlySales));

    const table = select(`#table-${category}`);

    let salesTotal = 0;
    const metrics = [];
    // console.log("monthly sales: ", monthlySales);

    for (let i = 0; i < monthlySales.length; i++) {
      salesTotal += +monthlySales[i].sales;
    }

    const average = salesTotal / monthlySales.length;

    metrics.push("Sales total: " + salesTotal);
    metrics.push("Average: " + average.toFixed(2));

    table
      .selectAll("tr")
      .data(metrics)
      .text((d) => d);
  };

  useEffect(() => {
    if (selected) {
      monthSales.contents.forEach(({ category, monthlySales }) => {
        updateLineAndTable(
          monthlySales.slice(
            monthlySales.length - selected,
            monthlySales.length
          ),
          category
        );
      });
    }
  }, [selected]);

  // console.log("selected: ", selected);

  return (
    <div>
      <h1>Filter_2 with Line Chart</h1>
      <p>
        Choose Data Range:
        <select ref={selectRef}>
          <option value={12}>Last Year</option>
          <option value={6}>Last 6 months</option>
          <option value={3}>Last Quarter</option>
        </select>
      </p>

      <div ref={divRef} />
    </div>
  );
};

export default Filter_2;
