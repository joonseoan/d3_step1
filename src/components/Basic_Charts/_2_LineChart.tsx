import { useRef, useEffect } from "react";
import { select, line, curveLinear } from "d3";

interface MonthlySale {
  month: number;
  sales: number;
}

const LineChart = () => {
  const ref = useRef(null);
  const h = 350;
  const w = 400;
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

  // [ Draw the line ]
  // "line" is a generator to draw svg-based "lines".
  const lineFunc = line<MonthlySale>()
    // ?
    .x((d: MonthlySale) => d.month * 3)
    // 350 - 100 = 250, 350 -130 = 220 ...... y point from the top
    .y((d: MonthlySale) => h - d.sales)
    // select line shape
    .curve(curveLinear);

  useEffect(() => {
    // [ Define the position where we draw the line ]
    const svg = select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    // not working!!!
    // .attr("stroke", "yellow")
    // .attr("fill", "yellow");

    // [Visualize data]
    // "path: "svg" object that draws things on the basis of data.
    // path is used to draw undefined shape like a map, (defined shape: rect, circle, and etc)
    const viz = svg
      .append("path")
      .attr("d", lineFunc(monthlySales))
      // line color
      .attr("stroke", "purple")
      // fill means ?
      .attr("fill", "none");

    const label = svg
      .selectAll("text")
      .data(monthlySales)
      .enter()
      .append("text")
      .text((d: MonthlySale) => d.sales)
      .attr("x", (d) => d.month * 3 - 5)
      .attr("y", (d) => h - d.sales - 8)
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      // text color
      .attr("fill", "#666666")
      .attr("text-anchor", "start")
      .attr("dy", ".34em")
      .attr("font-weight", (d, i) => {
        if (i === 0 || i === monthlySales.length - 1) {
          return "bold";
        }

        return "normal";
      });
  }, []);

  return (
    <div>
      <h1>Line Chart</h1>
      <div ref={ref} />
      {/* 
        since svg path object is used, it generates a path element with coordinate values based on data.
        <path d="M20,20L40,14L60,20L80,21L100,15L120,22L140,9L160,6L180,23L200,7" stroke="purple" fill="yellow"></path>  
      */}
    </div>
  );
};

export default LineChart;
