import { FaArrowRightLong } from "react-icons/fa6";

export interface TaskProps {
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  createdById: number;
  assignedToId: number;
  deadline: string;
}

const Task = (props: TaskProps) => {
  return (
    <div className="w-100 flex flex-col my-4 transition-all hover:scale-105">
      <div className="bg-yellow-100 w-full py-2 text-center">
        <h2 className="text-2xl">{props.title}</h2>
        <div className="flex items-center justify-center text-xl py-2 space-x-2">
          <p>{props.createdById}</p>
          <FaArrowRightLong />
          <p>{props.assignedToId}</p>
        </div>
        <div className="flex justify-between py-2">
          <div className="w-1/3">
            Status: <p className="text-bold">{props.status}</p>
          </div>
          <div className="w-1/3">
            Priority: <p className="text-bold">{props.priority}</p>
          </div>
          <div className="w-1/3">
            Created At:{" "}
            <p className="text-bold">
              {props.createdAt.replace("T", " ").slice(0, -5)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
