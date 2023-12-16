"use client";
import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import { useQuery } from "react-query";
import { _getTasks } from "../lib/data";
import LoadingSpinner from "../components/LoadingSpinner";
import Task, { TaskProps } from "../components/Task";

const Home = () => {
  const [tasks, setTasks] = React.useState<any>([]);
  const [filtrs, setFiltrs] = React.useState({
    status: "",
    priority: "",
    search: "",
  });

  const filteredTasks = () => {
    return tasks.filter(
      (task: any) =>
        task.status === filtrs.status ||
        task.priority === filtrs.priority ||
        task.title.toLowerCase().includes(filtrs.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filtrs.search.toLowerCase())
    );
  };

  const changeFiltrs = (key: string, value: string) => {
    setFiltrs((prev) => ({ ...prev, [key]: value }));
  };

  const { isLoading } = useQuery({
    queryKey: "getTasks",
    queryFn: _getTasks,
    onSuccess: (data) => {
      setTasks(data);
    },
  });

  useEffect(() => {
    console.log(tasks);
  });

  return (
    <Wrapper>
      <FilterPanel changeFiltrs={changeFiltrs} />
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        tasks &&
        filteredTasks().map((task: any) => (
          <Task
            key={task.id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            createdAt={task.createdAt}
            createdById={task.createdById}
            assignedToId={task.assignedToId}
            deadline={task.deadline}
          />
        ))}
    </Wrapper>
  );
};

export default Home;
