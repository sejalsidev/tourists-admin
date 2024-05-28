import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  name: Yup.string().required("Name is required"),
  destination: Yup.string().required("Destination is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number().required("Duration is required"),
  price: Yup.number().required("Price is required"),
  longDescription: Yup.string().required("Long Description is required"),
  day: Yup.number().required("Day is required"),
  maxPeople: Yup.number().required("Max People is required"),
  minAge: Yup.number().required("Min Age is required"),
  date: Yup.date().required("Date is required"),
});

const initialValues = {
  image: "",
  name: "",
  destination: "",
  description: "",
  duration: "",
  price: "",
  longDescription: "",
  day: "",
  maxPeople: "",
  minAge: "",
  date: "",
};

function PackForm() {
  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div>
      <h1>Your Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Image:</label>
            
            <Field type="text" name="image" />
            <ErrorMessage name="image" />
          </div>
          <div>
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <label>Destination:</label>
            <Field type="text" name="destination" />
            <ErrorMessage name="destination" />
          </div>
          <div>
            <label>Description:</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" />
          </div>
          <div>
            <label>Duration:</label>
            <Field type="text" name="duration" />
            <ErrorMessage name="duration" />
          </div>
          <div>
            <label>Price:</label>
            <Field type="text" name="price" />
            <ErrorMessage name="price" />
          </div>
          <div>
            <label>longDescription:</label>
            <Field type="text" name="longDescription" />
            <ErrorMessage name="longDescription" />
          </div>
          <div>
            <label>Day:</label>
            <Field type="text" name="day" />
            <ErrorMessage name="day" />
          </div>
          <div>
            <label>maxPeople:</label>
            <Field type="text" name="maxPeople" />
            <ErrorMessage name="maxPeople" />
          </div>
          <div>
            <label>minAge:</label>
            <Field type="text" name="minAge" />
            <ErrorMessage name="minAge" />
          </div>
          <div>
            <label>date:</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default PackForm;
