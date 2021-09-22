import { useEffect, useRef } from "react";
import { select } from "d3";

const _1 = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    select(barRef.current) // select html tag
      .append("svg") // add an <svg> inside of <div>
      .append("rect") // add an <rec /> inside of <svg>
      .attr("width", 50) // set the width attribute of <rec />
      .attr("height", 200) // set the height attribute
      .style("fill", "blue"); // add some style

    select(circleRef.current) // select html tag
      // for svg
      .append("svg") // add an <svg> inside of <div>
      // .attr('width', 50)
      // .attr('height', 50)
      // for circle tag inside of svg
      .append("circle")
      .attr("cx", 25)
      .attr("cy", 25)
      .attr("r", 25)
      .style("fill", "purple");

    select(textRef.current)
      .append("svg")
      .attr("width", 250)
      .attr("height", 50)
      .append("text")
      .text("Easy Peasy")
      .attr("x", 0)
      .attr("y", 25)
      .attr("fill", "blue");
  }, []);

  return (
    // using svg
    <div>
      {/* Vertical Bar */}
      <div>
        <h3>SVG Bar</h3>
        <svg>
          <rect width={50} height={200} style={{ fill: "blue" }} />
        </svg>
      </div>
      <div ref={barRef}>
        <h3>D3 Bar</h3>
      </div>

      {/* Circle */}
      <div ref={circleRef}>
        <h3>SVG Circle</h3>
        <svg>
          {/* cx: position from left, cy: position from top */}
          <circle cx={25} cy={25} r={25} style={{ fill: "blue" }} />
        </svg>
      </div>
      <div ref={textRef}>
        <svg width={250} height={50}>
          <text x={0} y={25}>
            Easy Peasy
          </text>
        </svg>
      </div>
    </div>
  );
};

export default _1;
