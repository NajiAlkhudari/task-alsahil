"use client";
import AddTaskModal from "@/components/task/AddTaskModal";
import DeleteTaskModal from "@/components/task/DeleteTaskModal";
import UpdateTaskModal from "@/components/task/UpdateTaskModal";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { useTask } from "@/store/taskStore";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
  ToastContainer,
} from "@/utils/ToastNotifications";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskDataToUpdate, setTaskDataToUpdate] = useState(null);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);
  const { tasks, loading, error, getTasks, postTask, deleteTask ,getTaskById, updateTask } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  const closeModal = () => {
    setActiveModal(null);
  };

  
    useEffect(() => {
      if (!activeModal) {
        setTaskIdToUpdate(null);
        setTaskDataToUpdate(null);
      }
    }, [activeModal]);

  const handleAddTask = async (taskData) => {
    try {
      await postTask(taskData);
      showSuccessToast("Task added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);

      showErrorToast(
        `Failed to add task. Error: ${error.message || "Unknown error"}`
      );
    }
  };

    const handleUpdateTask = async (updatedData) => {
      try {
        if (!taskIdToUpdate) {
          console.error("No taskIdToUpdate provided");
          return;
        }
  
        await updateTask(taskIdToUpdate, updatedData);
  
        showSuccessToast("task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
        showErrorToast(
          `Failed to update task. Error: ${error.message || "Unknown error"}`
        );
      } finally {
        setActiveModal(null);
      }
    };
  

  const handleConfirmDelete = async () => {
    try {
      if (!taskIdToDelete) return;

      await deleteTask(taskIdToDelete);

      showWarningToast("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      showErrorToast(
        `Failed to delete task. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
      setTaskIdToDelete(null);
    }
  };

  
  const openModalUpdate = async (id) => {
    try {
      const taskData = await getTaskById(id);

      if (!taskData) {
        console.error("User data not found.");
        return;
      }
      setTaskDataToUpdate(taskData);
      setTaskIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching user data for update:", error);
    }
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "TaskName", key: "taskName" },
    { header: "Description", key: "description" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Tasks Table</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gold text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              Add Task
            </button>
          </div>
        </div>
        <Table
          data={tasks}
          columns={columns}
          onUpdate={(id) => openModalUpdate(id)}

          onDelete={(id) => {
            setTaskIdToDelete(id);
            setActiveModal("delete");
          }}
        />
      </Card>
      {activeModal === "add" && (
        <AddTaskModal
          isOpen={true}
          onClose={closeModal}
          onSubmitTask={handleAddTask}
        />
      )}


{activeModal === "update" && (
        <UpdateTaskModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onUpdateTask={handleUpdateTask}
          initialData={taskDataToUpdate}
        />
      )}

      {activeModal === "delete" && (
            <DeleteTaskModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onDelete={handleConfirmDelete}
            />
          )}
      <ToastContainer />
    </>
  );
};

export default Page;
