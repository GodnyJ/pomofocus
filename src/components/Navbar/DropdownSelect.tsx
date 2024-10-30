import React, { useState } from "react";
import "./dropdownSelect.css";

interface DropdownSelectProps{
  options: string[];
}

export default function DropdownSelect({ options }: DropdownSelectProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
