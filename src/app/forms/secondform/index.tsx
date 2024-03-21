/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SecondForm() {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-4xl font-bold mb-4">Second Form</h1>
      </div>
      <Formik
        initialValues={{ name: "", age: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="flex flex-col">
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <Field
              name="email"
              type="text"
              className="border border-gray-300 p-2 text-black rounded-md"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="border border-gray-300 p-2 text-black rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col w-full my-4 gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-[195px]"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      <a href="/">
        <button className="bg-white text-black p-2 rounded-md w-[195px]">
          Back
        </button>
      </a>
    </div>
  );
}
