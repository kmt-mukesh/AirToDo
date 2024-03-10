import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Navbar from "./components/Navbar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  //localStorage.setItem("tasks", JSON.stringify(tasks));
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  console.log(tasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar></Navbar>
      <div className="bg-black w-screen h-screen flex flex-col items-center  pt-6 gap-7 ">
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add New Task
        </button>
        <div>
        {showModal && (
          <CreateTask
            tasks={tasks}
            setTasks={setTasks}
            onClose={() => setShowModal(false)}
            
          />
        )}
        </div>
        {<ListTask   tasks={tasks} setTasks={setTasks} showModal={showModal}
            setShowModal={setShowModal}/>}
      </div>
    </DndProvider>
  );
}

export default App;
