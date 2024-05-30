import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postDestination, updateDestination } from "../servicer/destination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
const AddDestination = ({
  show,
  handleClose,
  editingDestination,
  setEditingDestination,
  updatedata,
  id,
  refreshTable,
}) => {
  console.log(editingDestination, "----------ibuhiuyn");
  console.log(updatedata, "updated");
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 3,
  });
  const validationSchema = Yup.object({
    imageUrl: Yup.string().required("imageurl is required"),
    state: Yup.string().required("Destination is required"),
    place: Yup.string().required("Duration is required"),
  });

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDestination ? "Update destination" : "Add destination"}
          </Modal.Title>
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
                      state:
                        editingDestination && updatedata
                          ? updatedata?.state
                          : "",
                      place:
                        editingDestination && updatedata
                          ? updatedata.place
                          : "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      console.log(values);

                      try {
                        const response = editingDestination
                          ? await updateDestination(id, values)
                          : await postDestination(values);
                        console.log(
                          "Destination added/updated successfully:",
                          response
                        );
                        toast.success(
                          `Destination ${
                            editingDestination ? "updated" : "added"
                          } successfully!`
                        );
                        handleClose();
                        refreshTable();
                      } catch (error) {
                        setEditingDestination(false);
                        toast.error(
                          `Error ${
                            editingDestination ? "updating" : "adding"
                          } destination. Please try again later.`
                        );
                      }
                    }}
                  >
                    {(formik) => (
                      <Form container direction="column" alignItems="center">
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
                              htmlFor="state"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              State
                            </label>
                            <Field
                              as={TextField}
                              id="state"
                              name="state"
                              type="text"
                              label="State"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="name" component="div" />
                            <label
                              htmlFor="place"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Place
                            </label>
                            <Field
                              as={TextField}
                              id="place"
                              name="place"
                              type="text"
                              label="Place"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="dest" component="div" />
                            <Button
                              type="submit"
                              name="submit"
                              variant="primary"
                              size="large"
                            >
                              {editingDestination ? "Update" : "Submit"}
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

export default AddDestination;
