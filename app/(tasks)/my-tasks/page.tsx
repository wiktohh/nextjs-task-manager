"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Task from "@/app/components/Task";
import Wrapper from "@/app/components/Wrapper";
import { useAxios } from "@/app/hooks/use-axios";
import { useEffect, useState } from "react";

type Tab = "created" | "assigned";

const MyTasks = () => {
  const [tab, setTab] = useState<Tab>("created");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const axios = useAxios();

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      try {
        let response;
        if (tab === "created") {
          response = await axios.get("/api/tasks/createdByMe");
        } else {
          response = await axios.get("/api/tasks/assignedToMe");
        }
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTasks();
    setIsLoading(false);
    console.log(tasks);
  }, [tab]);

  return (
    <Wrapper>
      <div className="w-100 flex justify-between">
        <button
          onClick={() => setTab("created")}
          className={`uppercase text-center w-1/2 py-2 ${
            tab === "created" && "border-b-2 border-red-500 "
          }`}
        >
          Stworzone przeze mnie
        </button>
        <button
          onClick={() => setTab("assigned")}
          className={`uppercase text-center w-1/2 py-2 ${
            tab === "assigned" && "border-b-2 border-red-500"
          }`}
        >
          Przypisane do mnie
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        tasks.map((task: any) => (
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

export default MyTasks;
