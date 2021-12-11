import DrawingOutline from "./DrawingOutline";
import AddingColor from "./AddingColor";
import AddingPointer from "./AddinPointer";

// Please, find the GEOJSON setup.txt to get the file.

const DrawingMaps = () => {
  return (
    <div>
      <DrawingOutline />
      <AddingColor />
      <AddingPointer />
    </div>
  );
};

export default DrawingMaps;
