/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNetworkCheck } from "../../context/Network";
import { createLocalDB } from "../../utils/PouchDb";
import { forms } from "../../utils/formNames";
import { ToastContainer, toast } from "react-toastify";

export default function SecondForm() {
  const { isOnline } = useNetworkCheck();

  const handleSubmit = async (values: any) => {
    try {
      if (isOnline) {
        const apiUrl = forms.secondForm.url;
        const postResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        toast("Data sent to API");
        console.log("Data sent to API:", await postResponse.json());
        return;
      }
      const db = createLocalDB(forms.secondForm.name);
      const response = await db.post(values);
      toast("Data saved locally");
      console.log("Data saved locally:", response);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1 className="text-4xl font-bold mb-4">Second Form</h1>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
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
      <ToastContainer />
    </div>
  );
}
