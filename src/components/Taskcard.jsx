import React, { useState } from "react";
import { X } from "lucide-react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";
import EditTask from "./EditTask";

function Taskcard({ bg, tsk, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "taskcard",
    item: { id: tsk.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task deleted!", { icon: "🗑️" });
  };

  const [editModal, setEditModal] = useState(false);

  const handleEdit = () => {
    setEditModal(true);
  };

  return (
    <div
      ref={drag}
      className={`bg-slate-300 p-2 mt-3 mr-0 rounded-md shadow-md
      flex cursor-grab ${isDragging ? "opacity-20" : "opacity-100"} hover:bg-blue-300 transition duration-300`}
    >
      <p className="text-lg">{tsk.name}</p>
      <div className="flex justify-end ml-auto">
        <button
          className="hover:bg-slate-400 text-xm text-black"
          onClick={handleEdit}
        >
          <Pencil />
        </button>
        <button
          className="hover:bg-slate-400 text-xm text-black"
          onClick={() => handleRemove(tsk.id)}
        >
          <X />
        </button>
      </div>
      {editModal && (
        <EditTask
          tasks={tasks}
          id={tsk.id}
          setTasks={setTasks}
          onCloseEdit={() => setEditModal(false)}
        />
      )}
    </div>
  );
}

export default Taskcard;