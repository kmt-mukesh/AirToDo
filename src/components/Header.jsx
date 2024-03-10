import React from "react";
import { Plus } from 'lucide-react';

function Header({ text, bg, count, showModal, setShowModal }) {
  return (
    <div
      className={`${bg} text-xl  font-bold  flex items-center  h-12 pl-4 rounded-t uppercase text-sm text-black`}
    >
      {text}
      <div className="ml-1 bg-indigo-200 w-7 h-7 text-black rounded-full flex items-left justify-center">
        {count}
      </div>
      <div className="ml-auto flex items-left justify-center hover:bg-slate-400"><button onClick={() => setShowModal(true)}><Plus /></button></div>
    </div>
  );
}

export default Header;
