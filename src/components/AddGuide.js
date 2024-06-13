import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Box } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { postGuide } from "../servicer/guide";

const AddGuide = ({ show, handleClose }) => {
  const validationSchema = Yup.object({
    imageUrl: Yup.string().required("imageurl is required"),
    name: Yup.string().required("name is required"),
    designation: Yup.string().required("designation is required"),
  });
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Guide</Modal.Title>
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
                      imageUrl: null,
                      name: "",
                      designation: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      {
                        console.log("values --- ", values);
                      }
                      try {
                        const response = await postGuide(values);
                        console.log("guide added successfully:", response);
                        toast.success("guide added successfully");
                        handleClose();
                      } catch (error) {
                        toast.error("guide.Please try again later");
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
                            >
                              <Grid item>
                                <label
                                  className="form-label"
                                  htmlFor="customFile"
                                >
                                  Image
                                </label>
                              </Grid>
                              <Grid item>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="customFile"
                                  onChange={(event) => {
                                    formik.setFieldValue(
                                      "imageUrl",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                {formik.touched.imageUrl &&
                                formik.errors.imageUrl ? (
                                  <div>{formik.errors.imageUrl}</div>
                                ) : null}
                              </Grid>
                            </Box>
                            <label
                              htmlFor="name"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Name
                            </label>
                            <Field
                              as={TextField}
                              id="name"
                              name="name"
                              type="text"
                              label="name"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="name" component="div" />
                            <label
                              htmlFor="designation"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Designation
                            </label>
                            <Field
                              as={TextField}
                              id="designation"
                              name="designation"
                              type="text"
                              label="designation"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="designation" component="div" />
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

export default AddGuide;
