import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export interface MonthlyData {
  month: number;
  sales: number;
}

export interface MonthSales {
  contents: {
    category: string;
    monthlySales: MonthlyData[];
  }[];
}

const APIFetch = () => {
  const [monthSales, setMonthSales] = useState<MonthSales>({ contents: [] });
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 400;

  const lineFunc = d3
    .line<MonthlyData>()
    .x((d) => (d.month - 20130001) / 3.25)
    .y((d) => h - d.sales)
    .curve(d3.curveLinear);

  useEffect(() => {
    if (!monthSales.contents.length) {
      (async () => {
        const data = await fetch(
          "https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json"
        );

        // In the url above, the data type is "File".
        // And also, the "content" attribute of "monthlySales" is encoded on the basis of "base64".
        // In this case, we need to us "atob". (https://developer.mozilla.org/en-US/docs/Web/API/atob)

        /**
         * blob vs atob
         * blob is not encoded. It converts the file typed data into the binary code array (buffer).
         * so we can upload the file by implementing blob to convert the file data into the binary code array.
         *
         * On the other hand, atob is normally used to convert the encoded data into the readable data.
         * When fetch.get the data from the API server, that server can send the encoded contents. In this case, we can use atob.
         */
        const encodedData = await data.json();
        // console.log("encodedData ++++> ", encodedData);
        const readableData = JSON.parse(window.atob(encodedData.content));
        // console.log("readableData: ", readableData);

        setMonthSales({ ...readableData });
      })();
    }

    const buildHeadline = (category: string) => {
      d3.select(ref.current).append("h1").text(category).style("color", "blue");
    };

    const buildLineAndTable = (monthlySales: MonthlyData[]) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthSales]);

  // console.log("moNTHSALES: ", monthSales);

  return (
    <div>
      <h1>API Data</h1>
      <div ref={ref} style={{ backgroundColor: "yellow" }} />
    </div>
  );
};

export default APIFetch;
