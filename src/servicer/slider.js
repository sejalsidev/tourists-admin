import axios from "axios";

export const sliderDetail = async () => {
  try {
    return await axios.get("http://localhost:2000/api/slider/getDetail");
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postSlider = async (values) => {
  try {
    console.log(values, "valuesvaluesvaluesvaluesvaluesvalues");
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("heading", values.heading);
    formData.append("blog", values.blog);
    if (values.imageUrl) {
      formData.append("imageUrl", values.imageUrl);
      console.log("Image URL:", values.imageUrl);
    }
    console.log("Form Data:", formData);
    return await axios.post(
      `http://localhost:2000/api/slider/insertDetail`,
      formData
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
