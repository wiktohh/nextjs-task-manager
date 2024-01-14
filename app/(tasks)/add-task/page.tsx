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
    assignedTo: -1,
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

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
    if (
      !newTask.assignedTo ||
      !newTask.title ||
      !newTask.description ||
      !newTask.priority ||
      !newTask.deadline ||
      newTask.assignedTo === -1
    ) {
      setError("Wypełnij wszystkie pola!");
      return;
    }
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

          <label
            className="text-black mb-2 block text-sm font-medium"
            htmlFor="description"
          >
            Opis
          </label>
          <textarea
            className="w-full rounded-lg  bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
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
          <Select
            label="Przypisz pracowanika:"
            defaultValue="Przypisz pracowanika"
            selectedValue={newTask.assignedTo.toString()}
            options={employees}
            onChange={(val) =>
              setNewTask((prev) => ({ ...prev, assignedTo: parseInt(val) }))
            }
          />
          <Input
            label="Deadline"
            onChange={(val) =>
              setNewTask((prev) => ({
                ...prev,
                deadline: new Date(val).toISOString(),
              }))
            }
            placeholder="Wybierz deadline"
            type="date"
          />

          {error && (
            <div className="w-1/2 mx-auto text-red-500 bg-red-100 border-2 border-red-500 p-2 text-center rounded-md">
              <p>{error}</p>
            </div>
          )}
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
