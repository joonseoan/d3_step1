import CSV from "./CSV";
import Json from "./Json";
import MultiJsons from "./MultiJsons";

const ExternalDataSource = () => {
  return (
    <div>
      <CSV />
      <Json />
      <MultiJsons />
    </div>
  );
};

export default ExternalDataSource;
