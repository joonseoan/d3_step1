import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface MonthlyData {
  month: number;
  sales: number;
}

const CSV = () => {
  const [data, setData] = useState<MonthlyData[] | []>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 400;

  const lineFunc = d3
    .line<MonthlyData>()
    .x((d) => d.month * 2013)
    .y((d) => h - d.sales)
    .curve(d3.curveLinear);

  useEffect(() => {
    if (!data.length) {
      const getCSVdata = async () => {
        const ds = (await d3.csv("./data/monthlySales.csv"))
          .slice(0, 12)
          .map(({ month, sales }) => {
            return {
              month: month ? +month : 0,
              sales: sales ? +sales : 0,
            };
          });

        setData([...ds]);
      };
      getCSVdata();
    }

    console.log("data: ", data);

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .append("path")
      .attr("d", lineFunc(data))
      .attr("stroke", "purple")
      .attr("fill", "none");
  }, [data]);

  return <div ref={ref} />;
};

export default CSV;
