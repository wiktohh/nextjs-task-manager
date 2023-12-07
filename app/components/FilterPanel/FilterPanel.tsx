"use client";
import { useState } from "react";
import { options } from "./constants";
import Select from "./Select";

const FilterPanel = () => {
  const [formData, setFormData] = useState({
    status: "",
    priority: "",
  });

  return (
    <div className="bg-gray-400 rounded-md p-8 flex space-x-4 justify-center flex-wrap">
      <Select
        label="Wybierz status"
        defaultValue="Wszystkie"
        selectedValue={formData.status}
        options={options.status}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, status: val }));
        }}
      />
      <Select
        label="Wybierz priorytet"
        defaultValue="Wszystkie"
        selectedValue={formData.priority}
        options={options.priority}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, priority: val }));
        }}
      />
    </div>
  );
};

export default FilterPanel;
