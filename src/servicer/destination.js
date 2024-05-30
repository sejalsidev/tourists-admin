import axios from "axios";

export const destinationDetail = async () => {
  try {
    return await axios.get("http://localhost:2000/api/destination/getDesti");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postDestination = async (values) => {
  try {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvalues");
    const formData = new FormData();
    formData.append("state", values.state);
    formData.append("place", values.place);
    if (values.imageUrl) {
      formData.append("imageUrl", values.imageUrl);
      console.log("Image URL:", values.imageUrl);
    }
    console.log("Form Data:", formData);

    // Sending formData directly as the request body
    return await axios.post(
      `http://localhost:2000/api/destination/postDesti`,
      formData
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateDestination = async (id, values) => {
  try {
    console.log(values);
    const formData = new FormData();
    formData.append("state", values.state);
    formData.append("place", values.place);
    if (values.imageUrl) {
      formData.append("imageUrl", values.imageUrl);
      console.log("dsdsdsds1111111", values.imageUrl);
    }
    console.log("values", values);
    return await axios.put(
      `http://localhost:2000/api/destination/updateDesti/${id}`,
      formData
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
