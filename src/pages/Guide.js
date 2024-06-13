import axios from "axios";
import React, { useState, useEffect } from "react";
import { guideDetail } from "../servicer/guide";
import Button from "react-bootstrap/Button";
import AddGuide from "../components/AddGuide";
import { toast } from "react-toastify";

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/guide/deleteDetail/${id}`
      );

      console.log("Record Deleted:", id);
      console.log(response);

      toast.success("Delete Record Successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Error deleting record");
    }
  };

  const fetchData = async () => {
    try {
      const data = await guideDetail();
      console.log("Received data:", data);
      setGuides(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ display: "flex", margin: "20px" }}
      >
        <i className="bi bi-plus-circle-dotted"></i>
        Add Record
      </Button>
      <AddGuide show={show} handleClose={handleClose} />
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.data?.map((guideItem) => (
              <tr key={guideItem._id}>
                <td>
                  <img
                    src={guideItem.imageUrl}
                    alt="Guide"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{guideItem.name}</td>
                <td>{guideItem.designation}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(guideItem._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Guide;
