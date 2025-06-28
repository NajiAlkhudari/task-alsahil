"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Card from "@/components/ui/Card";
import ComboBox from "@/components/ui/ComboBox";
import TextInputDate from "@/components/ui/TextInput/TextInputDate";
import { useClient } from "@/store/clientStore";
import { useTask } from "@/store/taskStore";
import { useStore } from "@/store/userStore";
import { useVisit } from "@/store/visitStore";
import { showSuccessToast, showErrorToast, ToastContainer } from "@/utils/ToastNotifications"

const Page = () => {
  const { clients, getClients } = useClient();
  const { tasks, getTasks } = useTask();
  const { users, getUser } = useStore();
  const { postVisit } = useVisit();

  useEffect(() => {
    getClients();
    getTasks();
    getUser();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const taskDto = values.taskId
      ? [
          {
            taskId: values.taskId,
            taskName:
              tasks.find((t) => t.id === values.taskId)?.taskName ||
              "Unknown Task",
            notes: "",
          },
        ]
      : [];

    const payload = {
      userId: values.userId,
      clientId: values.clientId,
      completionDate: new Date(values.completionDate).toISOString(),
      notes: values.notes,
      amountReceived: values.amountReceived || 0,
      status: values.status,
      priority: values.priority,
      taskDto: taskDto,
    };

    try {
      await postVisit(payload);
      showSuccessToast("تمت إضافة الموعد بنجاح");
      resetForm();
    } catch (error) {
      showErrorToast("حدث خطأ أثناء إضافة الموعد حاول مرة أخرى");
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Card title="المواعيد">
        <Formik
          initialValues={{
            userId: "",
            clientId: "",
            completionDate: "",
            notes: "",
            status: 0,
            priority: 2,
            taskId: "",
            amountReceived: 0,
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="max-w-xl mx-auto px-6 py-8 space-y-6 bg-white rounded-lg shadow-md">
              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-right">
                  الموظف
                </label>
                <Field
                  name="userId"
                  component={ComboBox}
                  options={users.map((user) => ({
                    label: user.name,
                    value: user.id,
                  }))}
                  placeholder="اختر الموظف"
                  className="text-right"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-right">
                  الزبون
                </label>
                <Field
                  name="clientId"
                  component={ComboBox}
                  options={clients.map((client) => ({
                    label: client.name,
                    value: client.id,
                  }))}
                  placeholder="اختر الزبون"
                  className="text-right"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-right">
                  المهمة
                </label>
                <Field
                  name="taskId"
                  component={ComboBox}
                  options={tasks.map((task) => ({
                    label: task.taskName,
                    value: task.id,
                  }))}
                  placeholder="اختر مهمة"
                  className="text-right"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700 text-right">
                  تاريخ الموعد
                </label>
                <Field
                  name="completionDate"
                  type="date"
                  component={TextInputDate}
                  className="border rounded p-2 text-right"
                  placeholder=""
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-3 rounded transition-colors duration-300`}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              </button>
            </Form>
          )}
        </Formik>
      </Card>

      {/* Toast container لازم يكون ظاهر في الصفحة حتى تعرض التنبيهات */}
      <ToastContainer />
    </>
  );
};

export default Page;
