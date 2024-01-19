"use client";

import { options } from "@/app/components/FilterPanel/constants";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import Wrapper from "@/app/components/Wrapper";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type Status = "toDo" | "inProgress" | "Done";
type Priority = "LOW" | "MEDIUM" | "HIGH";

interface ITask {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline: string;
  createdAt: string;
  assignedToId: number;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  assignedTo: {
    firstName: string;
    lastName: string;
  };
}

const TaskDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState<any>({
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: "",
    createdAt: "",
    assignedToId: 0,
    createdBy: {
      firstName: "",
      lastName: "",
    },
    assignedTo: {
      firstName: "",
      lastName: "",
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/task`, {
          id: id,
        });
        console.log(response.data);
        setTask(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { data } = await axios.get("/api/auth/getUsers");
        const formattedEmployees = data.map(
          (employee: {
            firstName: string;
            lastName: string;
            email: string;
            id: number;
          }) => ({
            label: `${employee.firstName} ${employee.lastName} (${employee.email}))`,
            value: employee.id,
          })
        );

        setEmployees(formattedEmployees);
        console.log(formattedEmployees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getEmployees();
  }, []);

  const updateAssignedTo = (val: any) => {
    setTask((prev: ITask) => ({
      ...prev,
      assignedToId: parseInt(val),
    }));
    const employee = employees.find(
      (employee) => employee.value === parseInt(val)
    );
    setTask((prev: ITask) => ({
      ...prev,
      assignedTo: {
        firstName: employee.label.split(" ")[0],
        lastName: employee.label.split(" ")[1],
      },
    }));
  };

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

  const removeTask = async () => {
    try {
      const response = await axios.delete(`/api/task`, {
        data: {
          id: id,
        },
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

  const handleDeleteButtonClick = () => {
    removeTask();
    router.push("/home");
  };

  return (
    <Wrapper>
      <div className="w-100 mx-auto p-4 bg-white rounded shadow-md">
        <div className="md:flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Task Details</h2>
          <div className={` space-x-4`}>
            <button
              className="bg-red-500 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-red-600 focus:outline-none"
              onClick={handleDeleteButtonClick}
            >
              Usuń
            </button>
            <button
              className="bg-blue-500 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleEditButtonClick}
            >
              {isEdit ? "Zapisz" : "Edytuj"}
            </button>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && isEdit && (
          <form className="flex flex-col">
            <Input
              label="Ustaw tytuł:"
              onChange={(val) =>
                setTask((prev: ITask) => ({ ...prev, title: val }))
              }
              placeholder="Wpisz tytuł"
              defaultValue={task.title}
              type="text"
            />
            <label
              className="text-black mb-2 block text-sm font-medium"
              htmlFor="description"
            >
              Ustaw opis
            </label>
            <textarea
              className="w-full rounded-lg  bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={task.description}
              id="description"
              placeholder="Opis"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTask((prev: ITask) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Select
              label="Ustaw status:"
              defaultValue="Ustaw status:"
              selectedValue={task.status}
              options={options.status}
              onChange={(val) =>
                setTask((prev: ITask) => ({ ...prev, status: val }))
              }
            />
            <Select
              label="Przypisz pracowanika:"
              defaultValue="Przypisz pracowanika"
              selectedValue={task.assignedToId}
              options={employees}
              onChange={(val) => {
                updateAssignedTo(val);
              }}
            />
            <Select
              label="Ustaw priorytet:"
              defaultValue="Ustaw priorytet"
              selectedValue={task.priority}
              options={options.priority}
              onChange={(val) =>
                setTask((prev: ITask) => ({ ...prev, priority: val }))
              }
            />
            <Input
              type="date"
              label="Ustaw deadline:"
              onChange={(val) =>
                setTask((prev: ITask) => ({
                  ...prev,
                  deadline: val,
                }))
              }
              placeholder="Wpisz deadline"
              defaultValue={new Date(task.deadline).toISOString().split("T")[0]}
            />
          </form>
        )}
        {!isLoading && !isEdit && (
          <div>
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <p className="mb-1">Description: {task.description}</p>
            <p className="mb-1">
              Created by: {task.createdBy.firstName} {task.createdBy.lastName}
            </p>
            <p className="mb-1">
              Assigned to: {task.assignedTo.firstName}{" "}
              {task.assignedTo.lastName}
            </p>
            <p className="mb-1">Status: {task.status}</p>
            <p className="mb-1">Priority: {task.priority}</p>
            <p className="mb-1">
              Deadline: {new Date(task.deadline).toLocaleString()}
            </p>
            <p className="mb-1">
              Created at: {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default TaskDetails;
