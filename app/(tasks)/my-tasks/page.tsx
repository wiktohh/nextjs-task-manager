"use client";
import Wrapper from "@/app/components/Wrapper";
import { useState } from "react";

type Tab = "created" | "assigned";

const MyTasks = () => {
  const [tab, setTab] = useState<Tab>("created");
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
    </Wrapper>
  );
};

export default MyTasks;
