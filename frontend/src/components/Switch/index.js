import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

import { Switch } from "./styles";

function InputSwitch({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      getValue: (refs) => {
        const result = inputRef.current.checked;
        return result;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Switch
      defaultChecked={defaultValue}
      type="switch"
      id={name}
      ref={inputRef}
      value={inputRef.current}
      label={label}
    />
  );
}

export default InputSwitch;
