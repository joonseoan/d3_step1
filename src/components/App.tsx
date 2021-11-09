import BasicDemo from "./Basic_Demo";
import BasicChart from "./Basic_Charts";
import ExternalDataSource from "./ExternalDataSource";
import APIFetch from "./APIFetch";
import Scaling from "./Scaling";
import Axis from "./Axis";
import Filters from "./Filters";

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
