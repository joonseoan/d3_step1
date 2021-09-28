import { useRef, useEffect } from "react";
import { select, min as d3min, max as d3max } from "d3";

interface MonthlySale {
  month: number;
  sales: number;
}

const ScatterChart = () => {
  const ref = useRef(null);
  const monthlySales: MonthlySale[] = [
    {
      month: 10,
      sales: 100,
    },
    {
      month: 20,
      sales: 130,
    },
    {
      month: 30,
      sales: 250,
    },
    {
      month: 40,
      sales: 300,
    },
    {
      month: 50,
      sales: 265,
    },
    {
      month: 60,
      sales: 225,
    },
    {
      month: 70,
      sales: 180,
    },
    {
      month: 80,
      sales: 120,
    },
    {
      month: 90,
      sales: 145,
    },
    {
      month: 100,
      sales: 130,
    },
  ];

  const h = 350;
  const w = 400;

  useEffect(() => {
    function salesKPI(d: number) {
      if (d >= 250) return "#33CC66";

      return "#666666";
    }

    function showMinMax(col: keyof MonthlySale, val: number, type: string) {
      const max = d3max(monthlySales, (d) => d[col]);
      const min = d3min(monthlySales, (d) => d[col]);

      if (type === "minmax" && (val === max || val === min)) {
        return val;
      } else {
        if (type === "all") {
          return val;
        } else {
          return null;
        }
      }
    }

    const svg = select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // add dot
    svg
      .selectAll("circle")
      .data(monthlySales)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.month * 3)
      .attr("cy", (d) => h - d.sales)
      .attr("r", 5)
      .attr("fill", (d) => salesKPI(d.sales));

    svg
      .selectAll("text")
      .data(monthlySales)
      .enter()
      .append("text")
      .text((d) => {
        return showMinMax("sales", d.sales, "minmax");
      })
      .attr("x", (d) => d.month * 3 - 10)
      .attr("y", (d) => h - d.sales - 10)
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      // text color
      .attr("fill", "#666666")
      .attr("text-anchor", "start");
  }, []);

  return (
    <div>
      <h1>Scatter Chart</h1>
      <div ref={ref} />
    </div>
  );
};

export default ScatterChart;
