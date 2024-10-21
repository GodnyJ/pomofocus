import React, { useState } from "react";
import "./dropdownSelect.css";

export default function DropdownSelect({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
