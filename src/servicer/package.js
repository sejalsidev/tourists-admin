import axios from "axios";

export const packageDetail = async () => {
  try {
    return await axios.get("http://localhost:2000/api/package/getPackage");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw the error to propagate it
  }
};

export const postPackage = async (values) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("destination", values.dest);
    formData.append("duration", values.dura);
    formData.append("day", values.day);
    formData.append("maxPeople", values.mpeople);
    formData.append("minAge", values.mage);
    formData.append("date", values.date);
    formData.append("price", values.price);
    formData.append("description", values.desc);
    formData.append("longDescription", values.ldesc);
    if (values.image) {
      formData.append("imageUrl", values.image);
      console.log("dsdsdsds1111111", values.image);
    }
    console.log("values", values);

    const response = await axios.post(
      "http://localhost:2000/api/package/addPackage",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error posting package:", error);
    throw error;
  }
};

export const handleUpdate = async (_id, updateData) => {
  try {
    return await axios.put(
      "http://localhost:2000/api/package/updatePackage/${id}",
      updateData
    );
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Throw the error to propagate it
  }
};
