import { useRef, useEffect } from "react";
import * as d3 from "d3";

const CSV = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const h = 100;
  const w = 400;
  // let ds;

  useEffect(() => {
    console.log("ddddddkkkkkkkk");
    d3.csv("../../data/MonthlySales.csv", (error: any, data: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("data: ", data);
      }
      return data;
    });
  }, []);

  return <div ref={ref} />;
};

export default CSV;
