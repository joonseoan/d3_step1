import { useEffect } from "react";
import * as d3 from "d3";

const Scale_1 = () => {
  /**
   * - domain
   *  . control the "real data" value. The parameter is an array with the max and min values.
   *
   * - range
   *  . controls the range (length) in the browser. The parameter is an array
   *      1) with the start point (mapping with the min of "domain above")
   *      2) with the end point (mapping with the max of "domain" above)
   */
  const scale = d3.scaleLinear().domain([130, 350]).range([10, 100]);

  // parameter: real data value
  // return value: the mapped value in the rage from 10 to 100.
  console.log(scale(300));
  console.log(scale(270));
  console.log(scale(150));

  return <div>Scale _1</div>;
};

export default Scale_1;
