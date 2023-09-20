import React, { useState } from "react";

const TextInput = (textInputClassName, placeHolderText) => {
  const [searchString, setSearchString] = useState();
  return (
    <div className={textInputClassName}>
      <input
        type="text"
        placeholder={placeHolderText}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
