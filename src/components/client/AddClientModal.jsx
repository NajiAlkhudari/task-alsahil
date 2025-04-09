import React from "react";
import Modal from "../ui/Modal";
import { Form, Formik , Field } from "formik";
import clientSchema from "@/validators/AddClientValidation";
import TextInput from "../ui/TextInput/TextInput";

const AddClientModal = ({ isOpen, onClose, onSubmitClient }) => {
  const handleSubmit = (values) => {


     onSubmitClient(values); 
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Client">
      <Formik
        initialValues={{
          name: "",
          companyName: "",
          address: "",
          phone: "",
          notes: "",
        }}
        validationSchema={clientSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="px-12">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    Name
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="name"
                      type="text"
                      component={TextInput}
                      placeholder="mohamad"
                    />
                  </div>
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    companyName
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="companyName"
                      type="text"
                      component={TextInput}
                      placeholder="alsahil"
                    />
                  </div>
                </div>
                {touched.companyName && errors.companyName && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.companyName}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    address
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="address"
                      type="text"
                      component={TextInput}
                      placeholder="homs"
                    />
                  </div>
                </div>
                {touched.address && errors.address && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.address}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    phone
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="phone"
                      type="text"
                      component={TextInput}
                      placeholder="0935226173"
                    />
                  </div>
                </div>
                {touched.phone && errors.phone && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">
                    notes
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="notes"
                      type="text"
                      component={TextInput}
                      placeholder="any"
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
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-gold text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add
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

export default AddClientModal;
