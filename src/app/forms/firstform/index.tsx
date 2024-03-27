/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createLocalDB } from "../../utils/PouchDb";
import { toast } from "react-toastify";
import { forms } from "../../utils/formNames";
import { useNetworkCheck } from "../../context/Network";

export default function FirstForm() {
  const { isOnline } = useNetworkCheck();

  const handleSubmit = async (values: any) => {
    try {
      if (isOnline) {
        const apiUrl = forms.firstForm.url;
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
      const db = createLocalDB(forms.firstForm.name);
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
        <h1 className="text-4xl font-bold mb-4">First Form</h1>
      </div>
      <Formik
        initialValues={{ name: "", age: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          age: Yup.number()
            .required("Age is required")
            .positive("Age must be positive")
            .integer("Age must be an integer"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="flex flex-col">
          <div className="flex flex-col my-2">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <Field
              name="name"
              type="text"
              className="border border-gray-300 p-2 text-black rounded-md"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="age" className="text-lg">
              Age
            </label>
            <Field
              name="age"
              type="number"
              className="border border-gray-300 p-2 text-black rounded-md"
            />
            <ErrorMessage name="age" component="div" className="text-red-500" />
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
