import React, { useState } from "react";

const TextInput = (placeHolderText) => {
  const [searchString, setSearchString] = useState();
  return (
    <input
      type="text"
      placeholder={placeHolderText}
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
    />
  );
};

export default TextInput;
