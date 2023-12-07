"use client";
import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import FilterPanel from "../components/FilterPanel/FilterPanel";

const Home12 = () => {
  const [tasks, setTasks] = React.useState([]);
  const [filtrs, setFiltrs] = React.useState({
    status: "",
    priority: "",
    search: "",
  });

  const changeFiltrs = (key: string, value: string) => {
    setFiltrs((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    console.log(filtrs);
  });

  return (
    <Wrapper>
      <FilterPanel changeFiltrs={changeFiltrs} />
      <h2>Home</h2>
    </Wrapper>
  );
};

export default Home12;
