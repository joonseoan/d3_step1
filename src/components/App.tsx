import BasicDemo from "./Basic_Demo";
import BasicChart from "./Basic_Charts";
import ExternalDataSource from "./ExternalDataSource";
import APIFetch from "./APIFetch";
import Scaling from "./Scaling";
import Axis from "./Axis";
import Filters from "./Filters";

// https://betterprogramming.pub/5-steps-to-render-d3-js-with-react-functional-components-fcce6cec1411
const App = () => {
  return (
    <div>
      {/* step 1 */}
      <BasicDemo />
      {/* step 2 */}
      <BasicChart />
      {/* step 3 */}
      <ExternalDataSource />
      {/* step 4 */}
      <APIFetch />
      {/* step 5 */}
      <Scaling />
      {/* step 6 */}
      <Axis />
      {/* step 7 */}
      <Filters />
    </div>
  );
};

export default App;

// https://betterprogramming.pub/5-steps-to-render-d3-js-with-react-functional-components-fcce6cec1411
// import { useState, useEffect, useLayoutEffect } from "react";

// const UseLayoutEffectTest = () => {
//   const [value, setValue] = useState(-1);

//   useEffect(() => {
//     setValue(2);
//     console.log("useEffect sets value to 2");
//   }, [value]);

//   // Most of the time, we should use useEffect.
//   // However, if the code mutates the DOM, useLayoutEffect should be used to block the display until the DOM finishes mutating.
//   // This way, we can avoid the display flicking.
//   useLayoutEffect(() => {
//     setValue(1);
//     console.log("useLayoutEffect sets value to 1");
//   }, [value]);

//   return (
//     <>
//       <button
//         onClick={() => {
//           setValue(0);
//           console.log("onClick sets value to 0");
//         }}
//       >
//         Update Data
//       </button>
//       <div>{value}</div>
//     </>
//   );
// };

// export default UseLayoutEffectTest;
