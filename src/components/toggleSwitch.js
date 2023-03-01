import React, { useState } from "react";
import ReactSwitch from "react-switch";

export default function ToggleSwitch() {
  const [checked, setChecked] = useState(true);

  const handleChange = (val) => {
    setChecked(val);
    console.log("Clicked");
  };

  return (
    <div className="app" style={{ textAlign: "center" }}>
      <h4>Toggle Switch to toggle the order</h4>
      <ReactSwitch checked={checked} onChange={handleChange} />
      
    </div>
  );
}
