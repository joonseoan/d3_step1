import { useEffect, useRef } from "react";
import { select } from "d3";

const _2 = () => {
  const barsRef = useRef<HTMLDivElement | null>(null);

  const w = 200;
  const h = 100;
  const padding = 2;
  const dataset = [5, 10, 15, 20, 25];

  useEffect(() => {
    // separate along with the each html element.
    const svg = select(barsRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // add rectangles.
    svg
      .selectAll("rect") // "selectAll": make all elements as rectangles
      .data(dataset) // apply dataset for each rectangle in oder.
      .enter() // enter all rectangles into the svg elements if they do not exist already.
      .append("rect") // then basic rectangle which is
      .attr("x", (d, i) => {
        console.log("d", d); // dataSet element
        console.log("i", i); // index i = 0 ==> no space for the first rectangle.

        // 2) Use svg width and a number of dataSet elements.
        return (i * w) / dataset.length;

        // 1) it is correct but it is still hardcoded.
        // return i * 25; // 25: 20 (rectangle width) + 5 (space)
      }) // space from the left side
      .attr("y", (d) => {
        console.log("y: ", d);
        // important!!!!!! y is space from the top!!!
        return h - d;
      }) // space from the top side
      .attr("width", w / dataset.length - padding) // rectangle's width. It must be less than "x" value.
      // value of the data
      .attr("height", (d) => d); // rectangle's height along with dataSet element.
  }, []);

  return (
    <div>
      <div ref={barsRef} />
    </div>
  );
};

export default _2;
