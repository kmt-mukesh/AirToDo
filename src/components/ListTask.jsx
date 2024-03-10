import React, { useEffect, useState } from "react";
import Section from "./Section";
import { STATUS, STATUSES } from "../utils/types";


function ListTask({ tasks, setTasks, showModal, setShowModal}) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    if (!tasks) return;
    const fTodos = tasks.filter((task) => task.status === STATUS.todo);
    const fInProgress = tasks.filter(
      (task) => task.status === STATUS.inProgress
    );
    const fCompleted = tasks.filter((task) => task.status === STATUS.completed);

    setTodos(fTodos);
    setInProgress(fInProgress);
    setCompleted(fCompleted);
    console.log("all", tasks);
  }, [tasks]);

  return (
    <div className="flex flex-row justify-center items-center gap-20 h-auto">
      {STATUSES.map((st, index) => (
        <Section
          key={index}
          status={st}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
          showModal={showModal}
            setShowModal={setShowModal}
          
        />
        
        
      ))
      }
     
    </div>
  );
}

export default ListTask;
