import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative bg-gray-50 dark:bg-darkContent rounded-lg shadow-lg">
        <div className="flex items-center justify-between bg-gray-50 dark:bg-darkContent dark:text-white text-gray-950 p-6 rounded-t-lg">
          <h2 className="text-2xl text-sky-900 font-bold">{title}</h2>
          <button
            type="button"
            className="text-gray-950 bg-gray-100 dark:bg-background rounded-full"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
