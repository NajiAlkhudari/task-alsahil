"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
  showWarningToast,
} from "@/utils/ToastNotifications";
import { useStore } from "@/store/userStore";
import Card from "@/components/ui/Card";
import Loading from "./loading";

const AddUserModal = React.lazy(() => import("@/components/user/AddUserModal"));
const UpdateUserModal = React.lazy(() => import("@/components/user/UpdateUserModal"));
const DeleteUserModal = React.lazy(() => import("@/components/user/DeleteUserModal"));

const Page = () => {
  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState(null);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const {
    users,
    loading,
    error,
    getUser,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
  } = useStore();

  useEffect(() => {
    getUser();
  }, []);

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (!activeModal) {
      setUserIdToUpdate(null);
      setUserDataToUpdate(null);
    }
  }, [activeModal]);

  const handleAddUser = async (userData) => {
    try {
      await postUser(userData);
      showSuccessToast("User added successfully!");
      closeModal();
    } catch (err) {
      showErrorToast("Failed to add user. Please try again.");
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      if (!userIdToUpdate) {
        console.error("No UserIdToUpdate provided");
        return;
      }

      await updateUser(userIdToUpdate, updatedData);

      showSuccessToast("user updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorToast(
        `Failed to update user. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!userIdToDelete) return;

      await deleteUser(userIdToDelete);

      showWarningToast("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast(
        `Failed to delete user. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
      setUserIdToDelete(null);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const userData = await getUserById(id);

      if (!userData) {
        console.error("User data not found.");
        return;
      }
      setUserDataToUpdate(userData);
      setUserIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching user data for update:", error);
    }
  };

  if (loading) return <Loading />;


  const columns = [
    { header: "ID", key: "id" },
    { header: "الاسم", key: "name" },
    { header: "اسم المستخدم", key: "userName" },
    { header: "الدور", key: "role" },
    { header: "الاجراء", key: "action" },
  ];

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">جدول الموظفين</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gold text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              موظف جديد
            </button>
          </div>
          <Table
            data={users}
            columns={columns}
            onUpdate={(id) => openModalUpdate(id)}
            onDelete={(id) => {
              setUserIdToDelete(id);
              setActiveModal("delete");
            }}
          />
        </div>
      </Card>
      <React.Suspense>
      {activeModal === "add" && (
        <AddUserModal
          isOpen={true}
          onClose={closeModal}
          onSubmitUser={handleAddUser}
        />
      )}

      {activeModal === "update" && (
        <UpdateUserModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onUpdateUser={handleUpdateUser}
          initialData={userDataToUpdate}
        />
      )}
      {activeModal === "delete" && (
        <DeleteUserModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onDelete={handleConfirmDelete}
        />
      )}
      </React.Suspense>
      <ToastContainer />
    </>
  );
};

export default Page;
