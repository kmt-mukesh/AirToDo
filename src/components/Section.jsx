import React from "react";
import Header from "./Header";
import Taskcard from "./Taskcard";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";

function Section({ status, tasks, setTasks, todos, inProgress, completed,showModal, setShowModal }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "taskcard",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  let text = "To do";
  let len = todos.length;
  let bg = "bg-orange-400";
  let taskstomap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    len = inProgress.length;
    bg = "bg-pink-400";
    taskstomap = inProgress;
  } else if (status === "completed") {
    text = "Done";
    len = completed.length;
    bg = "bg-green-400";
    taskstomap = completed;
  }

  const addItemToSection = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
    });
    toast.success("Moved Task Successfuly")

    console.log(`Task dropped: ${id} in ${status}`);
  };

  return (
    <div
      ref={drop}
      className={`w-80 h-auto `}
    >
      <div className="">
        <Header text={text} bg={bg} count={len} showModal={showModal}
            setShowModal={setShowModal} />
      </div>

      <div className={` min-h-20 rounded-b bg-black p-1  }`}>
        <div className={`${isOver ? "bg-blue-300" : "bg-black"}  p-2 h-96 rounded-b overflow-y-auto`}>
          {taskstomap.length > 0 &&
            taskstomap.map((tsk) => (
              <Taskcard
                key={tsk.id} // Add key prop for each Taskcard
                bg={bg}
                tsk={tsk}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
        </div>
      </div>
     
    </div>
  );
}

export default Section;