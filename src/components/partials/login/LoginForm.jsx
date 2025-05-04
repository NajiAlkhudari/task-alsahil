"use client";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "../../ui/Button";
import TextInput from "../../ui/TextInput/TextInput";
import { useRouter } from "next/navigation";
import loginSchema from "@/validators/LoginValidation";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
} from "@/utils/ToastNotifications";
import { useAuthStore } from "@/store/authStore";

const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const success = useAuthStore((state) => state.success);
  useEffect(() => {
    if (success) {
      router.push("/dashboard");
      showSuccessToast("Login Success");
    }
    if (error) {
      showErrorToast(`Login Failed: ${error}`);
    }
  }, [error, success, router]);

  return (
    <>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={({ userName, password }) => {
          login(userName, password);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="text-sm text-black">UserName</label>
              <Field
                type="text"
                name="userName"
                placeholder="userName"
                className="input"
                component={TextInput}
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="text-sm text-black">Password</label>
              <Field
                type="password"
                name="password"
                placeholder=".........."
                className="input"
                component={TextInput}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <Button type="submit" className="bg-sky-950">
              {loading ? "loading ..." : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
