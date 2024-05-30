import axios from "axios";
import React, { useState, useEffect } from "react";
import { destinationDetail } from "../servicer/destination";
import Button from "react-bootstrap/Button";
import AddDestination from "../components/AddDestination";
import { toast } from "react-toastify";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [editingDestination, setEditingDestination] = useState(null);
  const [updatedata, setupdatedata] = useState(null);
  const [uId, setUid] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (destinationId, destinationItem) => {
    setupdatedata(destinationItem);
    setEditingDestination(true);
    setUid(destinationId);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/api/destination/deleteDesti/${id}`
      );

      console.log("Record Deleted:", id);
      console.log(response);

      toast.success("Delete Record Successfully");

      // Refresh the list after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Error deleting record");
    }
  };

  const fetchData = async () => {
    try {
      const data = await destinationDetail();
      console.log("Received data:", data);
      setDestinations(data);
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
      <AddDestination
        show={show}
        handleClose={handleClose}
        editingDestination={editingDestination}
        handleEdit={handleEdit}
        updatedata={updatedata}
        id={uId}
      />
      <div className="table-responsive container">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">Image</th>
              <th scope="col">State</th>
              <th scope="col">Place</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.data?.map((destinationItem) => (
              <tr key={destinationItem._id}>
                <td>
                  <img
                    src={destinationItem.imageUrl}
                    alt="Destination"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{destinationItem.state}</td>
                <td>{destinationItem.place}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleEdit(destinationItem._id, destinationItem)
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(destinationItem._id)}
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

export default Destinations;
