"use client";

import AddClientModal from "@/components/client/AddClientModal";
import DeleteClientModal from "@/components/client/DeleteClientModal";
import UpdateClientModal from "@/components/client/updateClientModal";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { useClient } from "@/store/clientStore";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
  ToastContainer,
} from "@/utils/ToastNotifications";
import React, { useEffect, useState } from "react";
import Loading from "./loading";

const Page = () => {
  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [clientDataToUpdate, setClientDataToUpdate] = useState(null);
  const [clientIdToUpdate, setClientIdToUpdate] = useState(null);

  const {
    clients,
    loading,
    error,
    getClients,
    postClient,
    deleteClient,
    getClientById,
    updateClient,
  } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  const closeModal = () => {
    setActiveModal(null);
  };


  useEffect(() => {
    if (!activeModal) {
      setClientIdToUpdate(null);
      setClientDataToUpdate(null);
    }
  }, [activeModal]);
  const handleAddClient = async (clientData) => {
    try {
      await postClient(clientData);
      showSuccessToast("Client added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding client:", error);

      showErrorToast(
        `Failed to add client. Error: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleUpdateClient = async (updatedData) => {
    try {
      if (!clientIdToUpdate) {
        console.error("No agentIdToUpdate provided");
        return;
      }

      await updateClient(clientIdToUpdate, updatedData);

      showSuccessToast("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      showErrorToast(
        `Failed to update client. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!clientIdToDelete) return;

      await deleteClient(clientIdToDelete);

      showWarningToast("Client deleted successfully!");
    } catch (error) {
      console.error("Error deleting client:", error);
      showErrorToast(
        `Failed to delete client. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
      setClientIdToDelete(null);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const clientData = await getClientById(id);

      if (!clientData) {
        console.error("Client data not found.");
        return;
      }
      setClientDataToUpdate(clientData);
      setClientIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching Client data for update:", error);
    }
  };

if(loading) return <Loading />

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "CompanyName", key: "companyName" },
    { header: "Address", key: "address" },
    { header: "Phone", key: "phone" },
    { header: "Action", key: "action" },
  ];
  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Clients Table</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gold text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              Add Client
            </button>
          </div>
        </div>
        <Table
          data={clients}
          columns={columns}
          onUpdate={(id) => openModalUpdate(id)}
          onDelete={(id) => {
            setClientIdToDelete(id);
            setActiveModal("delete");
          }}
        />
      </Card>
      {activeModal === "add" && (
        <AddClientModal
          isOpen={true}
          onClose={closeModal}
          onSubmitClient={handleAddClient}
        />
      )}

      {activeModal === "update" && (
        <UpdateClientModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onUpdateClient={handleUpdateClient}
          initialData={clientDataToUpdate}
        />
      )}

      {activeModal === "delete" && (
        <DeleteClientModal
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
