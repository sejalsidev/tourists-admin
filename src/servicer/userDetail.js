import axios from "axios";

export const userDetail = async () => {
  try {
    const token = localStorage.getItem("token");
    return axios.get("http://localhost:2000/api/user/register/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
        