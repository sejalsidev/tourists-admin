import axios from "axios";

export const contactDetail = async () => {
  try {
    return await axios.get("http://localhost:2000/api/contact/getDetail");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const postContact = async (values) => {
  try {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvalues");
    return await axios.post(`http://localhost:2000/api/contact/postDetail`, {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      message: values.message,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
