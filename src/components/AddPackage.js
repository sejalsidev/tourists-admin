import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postPackage, updatePackage } from "../servicer/package";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import dayjs from "dayjs";
const AddPackage = ({
  show,
  handleClose,
  editingPackage,
  setEditingPackage,
  updatedata,
  id,
  refreshTable,
}) => {
  console.log(editingPackage, "----------ibuhiuyn");
  console.log(
    updatedata,
    "updatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedataupdatedata"
  );
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
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("image is required"),
    dest: Yup.string().required("Destination is required"),
    dura: Yup.string().required("Duration is required"),
    desc: Yup.string().required("Description is required"),
    ldesc: Yup.string().required("Long Description is required"),
    day: Yup.string().required("Day is required"),
    mpeople: Yup.number().required("Max People is required"),
    mage: Yup.number().required("Max Age is required"),
    date: Yup.date().required("Date is required"),
    price: Yup.number().required("Price is required"),
  });

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPackage ? "Update Package" : "Add Package"}
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
                      image: null,
                      name:
                        editingPackage && updatedata ? updatedata?.name : "",
                      dest:
                        editingPackage && updatedata
                          ? updatedata.destination
                          : "",
                      dura:
                        editingPackage && updatedata ? updatedata.duration : "",
                      desc:
                        editingPackage && updatedata
                          ? updatedata.description
                          : "",
                      ldesc:
                        editingPackage && updatedata
                          ? updatedata.longDescription
                          : "",
                      day: editingPackage && updatedata ? updatedata.day : "",
                      mpeople:
                        editingPackage && updatedata
                          ? updatedata.maxPeople
                          : "",
                      mage:
                        editingPackage && updatedata ? updatedata.minAge : "",
                      date:
                        editingPackage && updatedata
                          ? dayjs(updatedata.date)
                          : null,
                      price:
                        editingPackage && updatedata ? updatedata.price : "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      console.log(values);

                      try {
                        const response = editingPackage
                          ? await updatePackage(id, values)
                          : await postPackage(values);
                        console.log(
                          "Package added/updated successfully:",
                          response
                        );
                        toast.success(
                          `Package ${
                            editingPackage ? "updated" : "added"
                          } successfully!`
                        );
                        handleClose();
                        refreshTable();
                      } catch (error) {
                        setEditingPackage(false);
                        toast.error(
                          `Error ${
                            editingPackage ? "updating" : "adding"
                          } package. Please try again later.`
                        );
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
                                      "image",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                  <div>{formik.errors.image}</div>
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
                              label="Name"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="name" component="div" />
                            <label
                              htmlFor="dest"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Destination
                            </label>
                            <Field
                              as={TextField}
                              id="dest"
                              name="dest"
                              type="text"
                              label="Destination"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="dest" component="div" />
                            <label
                              htmlFor="dura"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Duration
                            </label>
                            <Field
                              as={TextField}
                              id="dura"
                              name="dura"
                              type="text"
                              label="Duration"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="dura" component="div" />
                            <label
                              htmlFor="desc"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Description
                            </label>
                            <Field
                              as={TextField}
                              id="desc"
                              name="desc"
                              type="text"
                              label="Description"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="desc" component="div" />
                            <label
                              htmlFor="ldesc"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Long Destination
                            </label>
                            <Field
                              as={TextField}
                              id="ldesc"
                              name="ldesc"
                              type="text"
                              label="Long Description"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="ldesc" component="div" />
                            <label
                              htmlFor="day"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Day
                            </label>
                            <Field
                              as={TextField}
                              id="day"
                              name="day"
                              type="text"
                              label="Day"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="day" component="div" />
                            <label
                              htmlFor="mpeople"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Max People
                            </label>
                            <Field
                              as={TextField}
                              id="mpeople"
                              name="mpeople"
                              type="text"
                              label="Max People"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="mpeople" component="div" />
                            <label
                              htmlFor="mage"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Max Age
                            </label>
                            <Field
                              as={TextField}
                              id="mage"
                              name="mage"
                              type="text"
                              label="Max Age"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="mage" component="div" />
                            <label
                              htmlFor="date"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Date Picker
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={formik.values.date}
                                onChange={(date) =>
                                  formik.setFieldValue("date", date)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                            <ErrorMessage name="date" component="div" />
                            <label
                              htmlFor="price"
                              style={{ marginRight: "40px", display: "block" }}
                            >
                              Price
                            </label>
                            <Field
                              as={TextField}
                              id="price"
                              name="price"
                              type="number"
                              label="Price"
                              sx={{ marginBottom: "10px" }}
                            />
                            <ErrorMessage name="price" component="div" />

                            <Button
                              type="submit"
                              name="submit"
                              variant="primary"
                              size="large"
                            >
                              {editingPackage ? "Update" : "Submit"}
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

export default AddPackage;
