import React from "react";
import Modal from "@/components/ui/Modal";
import TextInputForm from "../ui/TextInput/TextInput";
import { Formik, Form, Field } from "formik";
import userSchema from "@/validators/AddUserValidation";

const UpdateUserModal = ({ isOpen, onClose, onUpdateUser , initialData  }) => {


  const handleSubmit = async (values) => {
    const selectedRoles = values.role;
    const roleSum = selectedRoles.reduce((acc, val) => acc + parseInt(val, 10), 0);

    const updatedUserData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: roleSum,
    };

    await onUpdateUser(updatedUserData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update User">
      <Formik
        initialValues={{
          name:initialData.name || '',
          email: initialData.email || '',
          password: initialData.password || '',
          role: initialData.role || '',
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="px-12">
            <div className="space-y-4">
              {/* اسم المستخدم */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">Name</label>
                  <div className="flex-grow">
                    <Field name="name" type="text" component={TextInputForm} placeholder="mohamad" />
                  </div>
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.name}</div>
                )}
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">Email</label>
                  <div className="flex-grow">
                    <Field name="email" type="email" component={TextInputForm} placeholder="example@gmail.com" />
                  </div>
                </div>
                {touched.email && errors.email && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.email}</div>
                )}
              </div>

              {/* كلمة المرور */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">Password</label>
                  <div className="flex-grow">
                    <Field name="password" type="password" component={TextInputForm} placeholder="........." />
                  </div>
                </div>
                {touched.password && errors.password && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.password}</div>
                )}
              </div>

              {/* الأدوار */}
              <div className="flex flex-col gap-1">
                <div className="md:flex items-start gap-1">
                  <label className="min-w-[100px] text-sm font-medium pt-2">Role</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="role" value="1" className="accent-indigo-600" />
                      Admin
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="role" value="2" className="accent-indigo-600" />
                      User
                    </label>
                  </div>
                </div>
                {touched.role && errors.role && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.role}</div>
                )}
              </div>
            </div>

            {/* أزرار الإجراء */}
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

export default UpdateUserModal;