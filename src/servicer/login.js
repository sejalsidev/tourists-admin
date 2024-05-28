import axios from "axios";

export const loginData = async (values) => {
  try {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvalues");
    const response = await axios.post(
      "http://localhost:2000/api/admin/loginAdmin",
      {
        email: values.Email,
        password: values.password,
      }
    );
    console.log(response);
    localStorage.setItem("token", response.data.token);

    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
