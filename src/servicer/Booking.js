import axios from "axios";

export const bookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:2000/api/booking/getBookDetail"
    );
    console.log(response);
    console.log("data display sucessfully", response.data);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
