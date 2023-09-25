import React, { useState } from "react";

const TextInput = (props) => {
  const [searchString, setSearchString] = useState();
  return (
    <input
      type="text"
      placeholder={props.placeHolderText}
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
    />
  );
};

export default TextInput;
