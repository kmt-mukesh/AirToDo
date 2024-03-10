import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { STATUS } from "../utils/types";

function CreateTask({ tasks, setTasks, onClose}) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    status: STATUS.todo,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      if(prev==null)
      {
        prev=[]
      }
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    setTask({
      id: "",
      name: "",
      description: "",
      status: STATUS.todo,
    });
    return toast.success("New Task Added Successfully");
  };
  console.log(task);
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-blue-300  bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-2 text-white ">
        <button onClick={onClose} className="place-self-end">
          <X />
        </button>
        <div className="bg-black rounded-xl px-10 py-3 flex flex-col gap-5 items-center  ">
          <h1 className="text-2xl font-extrabold">ADD NEW TASK</h1>
          <form
            className="flex flex-col px-7 p-1 text-black"
            onSubmit={handleSubmit}
          >
            <input
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              type="text"
              placeholder="Enter tittle of task"
              required
              onChange={(e) =>
                setTask({ ...task, id: uuidv4(), name: e.target.value })
              }
              value={task.name}
            />
            <textarea
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              placeholder="Enter Description of task"
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              value={task.description}
            ></textarea>
            <select
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              onChange={(e) => setTask({ ...task, status: e.target.value })}
              value={task.status}
            >
              <option value="todo">ToDo</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
