import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Box } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { postContact } from "../servicer/contact";

const AddContact = ({ show, handleClose }) => {
  const validationSchema = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.number().required("phone is required"),
    message: Yup.string().required("message is required"),
  });
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container justifyContent="center">
            <Paper
              elevation={4}
              style={{
                padding: 20,
                height: "auto",
                marginTop: "10px",
              }}
            >
              <Grid container justifyContent={"center"}>
                <Grid item sx={6}>
                  <Formik
                    initialValues={{
                      firstname: "",
                      lastname: "",
                      email: "",
                      phone: "",
                      message: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      try {
                        const response = await postContact(values);
                        console.log("contact added successfully:", response);
                        toast.success("contact added successfully");
                        handleClose();
                      } catch (error) {
                        toast.error("contact.Please try again later");
                      }
                    }}
                  >
                    {(formik) => (
                      <Form>
                        <Grid
                          container
                          spacing={5}
                          direction="row"
                          alignItems="center"
                          padding="10px"
                        >
                          <Grid item>
                            <Box
                              marginBottom={2}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 2,
                                alignItems: "center",
                              }}
                            ></Box>
                            <label
                              htmlFor="firstname"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Firstname
                            </label>
                            <Field
                              as={TextField}
                              id="firstname"
                              name="firstname"
                              type="text"
                              label="firstname"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="firstname" component="div" />
                            <label
                              htmlFor="lastname"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Lastname
                            </label>
                            <Field
                              as={TextField}
                              id="lastname"
                              name="lastname"
                              type="text"
                              label="lastname"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="lastname" component="div" />
                            <label
                              htmlFor="email"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Email
                            </label>
                            <Field
                              as={TextField}
                              id="email"
                              name="email"
                              type="text"
                              label="email"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="dura" component="div" />
                            <label
                              htmlFor="phone"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Phone
                            </label>
                            <Field
                              as={TextField}
                              id="phone"
                              name="phone"
                              type="number"
                              label="phone"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="phone" component="div" />
                            <label
                              htmlFor="message"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Message
                            </label>
                            <Field
                              as={TextField}
                              id="message"
                              name="message"
                              type="text"
                              label="message"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="message" component="div" />

                            <Button
                              type="submit"
                              name="submit"
                              variant="primary"
                              size="large"
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContact;
