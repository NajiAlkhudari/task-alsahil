"use client";
import React from "react";
import Modal from "@/components/ui/Modal";

const DeleteTaskModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
      <div className="sm:flex sm:items-start">
        <div className="text-center sm:text-left">
          <h3 className="text-lg leading-6 font-semibold text-gray-900 ">
            Are you sure?
          </h3>
          <div className="mt-1">
            <p className="text-sm text-gray-500 ">
              You are about to delete this task. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-lg px-6 py-3 bg-red-600 text-base font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200 ease-in-out transform hover:scale-105"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-lg px-6 py-3 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm transition duration-200 ease-in-out transform hover:scale-105"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
