import React from "react";
const AppOption = ({ item }) => {
  return (
    <option data-testid="option" value={item ? item : "No text given"}>
      {item}
    </option>
  );
};

export default AppOption;
