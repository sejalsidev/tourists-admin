import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Box } from "@mui/material";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { postSlider } from "../servicer/slider";

const AddSlider = ({ show, handleClose }) => {
  const validationSchema = Yup.object({
    imageUrl: Yup.string().required("imageurl is required"),
    title: Yup.string().required("title is required"),
    heading: Yup.string().required("heading is required"),
    blog: Yup.string().required("blog is required"),
  });
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Slider</Modal.Title>
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
                      title: "",
                      heading: "",
                      blog: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      try {
                        const response = await postSlider(values);
                        console.log("slider added successfully:", response);
                        toast.success("slider added successfully");
                        handleClose();
                      } catch (error) {
                        toast.error("slider.Please try again later");
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
                              htmlFor="title"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Title
                            </label>
                            <Field
                              as={TextField}
                              id="title"
                              name="title"
                              type="text"
                              label="title"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="title" component="div" />
                            <label
                              htmlFor="heading"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Heading
                            </label>
                            <Field
                              as={TextField}
                              id="heading"
                              name="heading"
                              type="text"
                              label="heading"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="heading" component="div" />
                            <label
                              htmlFor="blog"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Blog
                            </label>
                            <Field
                              as={TextField}
                              id="blog"
                              name="blog"
                              type="text"
                              label="blog"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="blog" component="div" />

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

export default AddSlider;
