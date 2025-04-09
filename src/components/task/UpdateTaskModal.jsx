import React from "react";
import Modal from "../ui/Modal";
import { Form, Formik, Field } from "formik";
import taskSchema from "@/validators/AddTaskValidation"; 
import TextInput from "../ui/TextInput/TextInput";

const UpdateTaskModal = ({ isOpen, onClose, onUpdateTask , initialData }) => {
  const handleSubmit = (values) => {
    onUpdateTask(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Task">
      <Formik
        initialValues={{
          taskName:initialData.taskName || "",
          description:initialData.description || "",
          notes: initialData.notes || "",
        }}
        validationSchema={taskSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="px-12">
            <div className="space-y-4">
              {/* Task Name */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    Task Name
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="taskName"
                      type="text"
                      component={TextInput}
                      placeholder="e.g. Install software"
                    />
                  </div>
                </div>
                {touched.taskName && errors.taskName && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.taskName}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    Description
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="description"
                      type="text"
                      component={TextInput}
                      placeholder="e.g. Install the latest version..."
                    />
                  </div>
                </div>
                {touched.description && errors.description && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    Notes
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="notes"
                      type="text"
                      component={TextInput}
                      placeholder="any additional notes"
                    />
                  </div>
                </div>
                {touched.notes && errors.notes && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-gold text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateTaskModal;
