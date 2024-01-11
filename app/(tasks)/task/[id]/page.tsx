"use client";

import { options } from "@/app/components/FilterPanel/constants";
import Select from "@/app/components/Select";
import Wrapper from "@/app/components/Wrapper";
import axios from "axios";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CLIENT_RENEG_LIMIT } from "tls";

const TaskDetails = () => {
  const [task, setTask] = useState<any>({
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: "",
    createdAt: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/task`, {
          id: id,
        });
        setTask(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const updateTask = async () => {
    try {
      const response = await axios.patch(`/api/task`, {
        id,
        ...task,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButtonClick = () => {
    if (isEdit) {
      console.log(task);
      console.log("essa");
      updateTask();
    }
    setIsEdit((prev) => !prev);
  };

  return (
    <Wrapper>
      <div className="w-100 mx-auto p-4 bg-white rounded shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Task Details</h2>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
            onClick={handleEditButtonClick}
          >
            {isEdit ? "Zapisz" : "Edytuj"}
          </button>
        </div>

        {isEdit ? (
          <form className="flex flex-col">
            <input
              type="text"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={task.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={task.description}
              id="description"
              placeholder="Opis"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <input
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              type="text"
              value={task.status}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTask((prev) => ({ ...prev, status: e.target.value }))
              }
            />
            <Select
              label="Ustaw priorytet:"
              defaultValue="Ustaw priorytet"
              selectedValue={task.priority}
              options={options.priority}
              onChange={(val) =>
                setTask((prev) => ({ ...prev, priority: val }))
              }
            />
            <input
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              type="text"
              value={task.deadline}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTask((prev) => ({ ...prev, deadline: e.target.value }))
              }
            />
            <input
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              type="text"
              value={task.createdAt}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTask((prev) => ({ ...prev, createdAt: e.target.value }))
              }
            />
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="mb-1">{task.description}</p>
            <p className="mb-1">{task.status}</p>
            <p className="mb-1">{task.priority}</p>
            <p className="mb-1">{task.deadline}</p>
            <p className="mb-1">{task.createdAt}</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default TaskDetails;
