"use client";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import Wrapper from "@/app/components/Wrapper";
import { options } from "@/app/components/FilterPanel/constants";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { _createTask } from "@/app/lib/data";
import { useAxios } from "@/app/hooks/use-axios";
import { useRouter } from "next/navigation";
import { convertDate } from "@/app/helpers/helpers";

const AddTask = () => {
  const [newTask, setNewTask] = useState({
    assignedTo: 0,
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });
  const [employees, setEmployees] = useState([]);

  const axios = useAxios();
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTask);
    const response = await axios.post("/api/tasks", newTask);
    router.push("/home");
  };

  return (
    <Wrapper>
      <div className="w-100">
        <form className="w-3/4 m-auto flex flex-col" onSubmit={handleSubmit}>
          <Input
            label="Tytuł"
            onChange={(val) => setNewTask((prev) => ({ ...prev, title: val }))}
            placeholder="Wpisz tytuł"
            type="text"
          />
          <Select
            label="Przypisz do: "
            defaultValue="Wybierz pracownika"
            selectedValue={newTask.assignedTo.toString()}
            options={employees}
            onChange={(val) =>
              setNewTask((prev) => ({ ...prev, assignedTo: parseInt(val) }))
            }
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Opis
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="description"
            placeholder="Opis"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Select
            label="Ustaw priorytet:"
            defaultValue="Ustaw priorytet"
            selectedValue={newTask.priority}
            options={options.priority}
            onChange={(val) =>
              setNewTask((prev) => ({ ...prev, priority: val }))
            }
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={newTask.deadline.split("T")[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTask((prev) => ({
                ...prev,
                deadline: new Date(e.target.value).toISOString(),
              }))
            }
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white mr-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Zapisz
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddTask;
