import React, { useEffect, useState } from "react";
import { userDetail } from "../servicer/userDetail";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import axios from "axios";

const UserDetail = () => {
  const [userdata, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userDetail();
        console.log("Received data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /* -------------------delete record data------------------------- */
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:2000/api/user/register/deleteUser/${id}`)
      .then((response) => {
        console.log("Record Deleted:", id);
        // setUserData((prevData) => ({
        //   ...prevData,
        //   data: prevData.data.filter((user) => user._id !== id),
        // }));
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };
  return (
    <div className="table-responsive container">
      {
        <MDBTable style={{ marginTop: "10px", alignItems: "center" }}>
          <MDBTableHead className="header-table">
            <tr>
              <th scope="col" style={{ color: "white" }}>
                ID
              </th>
              <th scope="col" style={{ color: "white" }}>
                Name
              </th>
              <th scope="col" style={{ color: "white" }}>
                Email
              </th>
              <th scope="col" style={{ color: "white" }}>
                Password
              </th>
              <th scope="col" style={{ color: "white" }}>
                OTP
              </th>
              <th scope="col" style={{ color: "white" }}>
                Action
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {userdata.data?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.OTP}</td>
                <td>
                  <MDBBtn
                    className="me-1"
                    color="danger "
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      }
    </div>
  );
};

export default UserDetail;
