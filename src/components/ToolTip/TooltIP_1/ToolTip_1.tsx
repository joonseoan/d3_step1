import { useRef, useEffect } from "react";
import { select } from "d3";

const ToolTip_1 = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const w = 300;
  const h = 120;
  const padding = 2;
  const dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18];
  const colorPicker = (data: number) => {
    if (data <= 20) {
      return "#666666";
    }

    return "#FF0333";
  };

  useEffect(() => {
    const svg = select(barRef.current)
      .append("svg")
      .attr("height", h)
      .attr("width", w);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")

      .attr("x", (d, i) => {
        // each x value's start point.
        return (i * w) / dataset.length;
      })
      .attr("y", (d) => {
        // each y value's start point from the top. 0 ----> top.
        // console.log("result ---> ", h - d * 4, ", d: ", d);
        return h - d * 4;
      })
      // start point above  + width.
      .attr("width", w / dataset.length - padding)
      // start point above + height to bottom
      .attr("height", (d) => d * 4)

      .attr("fill", (d) => colorPicker(d))
      // 1)
      // Adding basic HTML Tooltip
      // .append("title")
      // .text((d) => d);

      // 2)
      // Manipulating Label
      .on("mouseover", function (event) {
        // [Important]
        // console.log("this: ", this); //  ==== event.target (true) ==> <rect /> target HTML element;
        // console.log("event.target: ", event.target.height);

        svg
          .append("text")
          .text(event.target.height.baseVal.value / 4)
          .attr("text-anchor", "middle")
          .attr(
            "x",
            // x value: 133.3333333333333333 ---> The reason to use parseFloat!!
            parseFloat(select(this).attr("x")) + // each start point
              parseFloat(select(this).attr("width")) / 2 // each width  and  "/ 2" (center of the bar width)
          )
          .attr("y", parseFloat(select(this).attr("y")) + 12) // 12: padding from the y start point.
          .attr("font-family", "sans-serif")
          .attr("font-size", 12)
          .attr("fill", "white")
          .attr("id", "tooltip");
      });

    svg.on("mouseout", () => {
      select("#tooltip").remove();
    });

    // [Label] --> It is replaced with Tooltip.
    // svg
    //   .selectAll("text")
    //   .data(dataset)
    //   .enter()
    //   .append("text")
    //   .text((d) => d)
    //   .attr("text-anchor", "middle")
    //   .attr(
    //     "x",
    //     (d, i) => i * (w / dataset.length) + (w / dataset.length - padding) / 2
    //   )
    //   .attr("y", (d) => h - d * 4 + 14) // 100 --->  120
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 12)
    //   .attr("fill", "white");
  }, []);

  return (
    <div>
      <h1>ToolTip_1</h1>
      <div ref={barRef} />
    </div>
  );
};

export default ToolTip_1;
