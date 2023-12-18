"use client";
import { useState } from "react";
import { options } from "./constants";
import Select from "../Select";
import Input from "../Input";

const FilterPanel = ({
  changeFiltrs,
}: {
  changeFiltrs: (key: string, value: string) => void;
}) => {
  const [formData, setFormData] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const handleClickSearchButton = () => {
    changeFiltrs("status", formData.status);
    changeFiltrs("priority", formData.priority);
    changeFiltrs("search", formData.search);
  };

  return (
    <div className="w-100 bg-gray-300 rounded-md p-8 flex flex-col space-y-4 items-center">
      <div className="w-100 flex space-x-8">
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
        <Input
          type="text"
          placeholder="Wyszukaj zadanie"
          label="Wyszukaj zadanie"
          onChange={(val) => {
            setFormData((prev) => ({ ...prev, search: val }));
          }}
        />
      </div>
      <button
        onClick={handleClickSearchButton}
        className="w-1/4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
      >
        Szukaj
      </button>
    </div>
  );
};

export default FilterPanel;
