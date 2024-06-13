import axios from "axios";

export const guideDetail = async () => {
  try {
    return await axios.get("http://localhost:2000/api/guide/getDetail");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postGuide = async (values) => {
  try {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvalues");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    if (values.imageUrl) {
      formData.append("imageUrl", values.imageUrl);
      console.log("Image URL:", values.imageUrl);
    }
    console.log("Form Data:", formData);
    return await axios.post(
      `http://localhost:2000/api/guide/postDetail`,
      formData
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
