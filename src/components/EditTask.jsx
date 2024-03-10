import React, { useEffect, useRef, useState } from 'react'
import { X } from "lucide-react";
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
function EditTask({tasks,id,setTasks,onCloseEdit}) {
    const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onCloseEdit();
    }
  };
 

  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    
    const specificTask = tasks.find(task => task.id === id);
    
    // Initialize state variables with specific task details
    useEffect(() => {
        setName(specificTask.name);
        setDescription(specificTask.description);
        setStatus(specificTask.status);
    }, [specificTask]);

  const handleSubmit = (e)=>{
    // e.preventDefault();
    // Update specific task in tasks array
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                name: name,
                description: description,
                status: status
            };
        }
        return task;
    });
    // Update state with modified tasks array
    setTasks(updatedTasks);
    toast.success("Task Updated Successfuly")
    onCloseEdit()
  }
  const handleDelete = (id) => {
    const fTasks = tasks.filter((t) => t.id != id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task deleted!", { icon: "🗑️" });
    onCloseEdit();
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-blue-300  bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-2 text-white ">
        <button onClick={onCloseEdit} className="place-self-end">
          <X />
        </button>
        <div className="bg-black rounded-xl px-10 py-3 flex flex-col gap-5 items-center  ">
           
            <h1 className="text-2xl font-extrabold">Edit Task</h1>
            <div> <button  onClick={() => handleDelete(id)} className='place-self-end'>
            <Trash2 />
        </button></div>
         
            
          
          <form
            className="flex flex-col px-7 p-1 text-black"
            onSubmit={handleSubmit}
          >
            <input
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              type="text"
              placeholder="Enter tittle of task"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              
            />
            <textarea
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              placeholder="Enter Description of task"
              onChange={(e) => setDescription(e.target.value)}
                            value={description}
            ></textarea>
            <select
              className=" mb-2 w-full px-20 py-2 text-black border-gray-300 rounded-md"
              onChange={(e) => setStatus(e.target.value)}
                            value={status}
            >
              <option value="todo">ToDo</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTask