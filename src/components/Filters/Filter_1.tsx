import {
  useRef,
  useEffect,
  ChangeEvent,
  useState,
  useLayoutEffect,
} from "react";
import { select, min as d3min, max as d3max, Selection } from "d3";

interface MonthlySale {
  month: number;
  sales: number;
}

const Filter_1 = () => {
  const [svg, setSvg] = useState<Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  > | null>(null);
  const [selected, setSelected] = useState<string>("all");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

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

  // test comparing useLayoutEffect vs useEffect
  // https://betterprogramming.pub/5-steps-to-render-d3-js-with-react-functional-components-fcce6cec1411
  useEffect(() => {
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

    function salesKPI(d: number) {
      if (d >= 250) return "#33CC66";

      return "#666666";
    }
    if (!svg) {
      setSvg(select(svgRef.current));
    } else {
      svg.attr("width", w).attr("height", h);

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

      // svg.exit().remove();
      svg
        .selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text((d) => {
          console.log("ddd000dddddddddd");
          return showMinMax("sales", d.sales, "all");
        })
        .attr("x", (d) => d.month * 3 - 10)
        .attr("y", (d) => h - d.sales - 10)
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        // text color
        .attr("fill", "#666666")
        .attr("text-anchor", "start");

      select(selectRef.current).on("change", () => {
        const sel = select("#label-option").property("value");
        setSelected(sel);
        console.log("sel: ", sel);
        // setSelected(sel);

        svg
          .selectAll("text")
          .data(monthlySales)
          .enter()
          .text((d) => {
            console.log("kkkk");
            return showMinMax("sales", d.sales, selected);
          });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg, selected]);

  // const handleOhChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setSelected(value);
  // };

  return (
    <div>
      <div>
        <h1>Scatter Chart</h1>
        <select
          id="label-option"
          ref={selectRef}
          // onChange={handleOhChange}
          // value={selected}
        >
          <option value="all">All</option>
          <option value="minmax">Min/Max</option>
          <option value="none">None</option>
        </select>
      </div>
      <svg ref={svgRef} />
    </div>
  );
};

export default Filter_1;
